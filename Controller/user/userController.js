/* eslint-disable camelcase */
const sharp = require('sharp');
const multer = require('multer');
const User = require('../../Model/user/userModel');
const sendReq = require('../../utils/sendJSON');
const factory = require('../handleFactory');
const AppError = require('../../utils/AppError');
const catchAsync = require('../../utils/catchAsync');
const try_catch = require('../../utils/tryCatchBlock');

const {
  given_users_not_follow_given_user,
} = require('../user_activity/follow_bucket_controller');

// CONTROLLER
// const followController = require('../userInteraction/followController');
// const followerController = require('../userInteraction/followerController');

exports.setUserId = (req, res, next) => {
  req.params.id = req.user._id;
  next();
};

const set_needed_user_fields = (user) => {
  const {
    _id,
    avatar,
    cover_pic,
    profilePic,
    name,
    bio,
    location,
    website_link,
    birthDate,
  } = user;
  return {
    _id,
    avatar,
    cover_pic,
    profilePic,
    name,
    bio,
    location,
    website_link,
    birthDate,
  };
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // this person is loggin => weknow who it is
  // req.user get populated with user impformation

  // valid fields if password and email related will be done in auth
  const {
    name,
    bio,
    location,
    website,
    birthDate,
    profilePic,
    cover_pic,
    avatar,
    customization,
  } = req.body;

  const user = await User.findOneAndUpdate(
    { $or: [{ _id: req.user.id }, { email: req.body.email }] },
    {
      name,
      bio,
      location,
      website,
      birthDate,
      profilePic,
      cover_pic,
      avatar,
      customization,
    },
    { runValidators: true, new: true }
  );

  return sendReq(
    res,
    200,
    'Updated Successfully',
    set_needed_user_fields(user)
  );
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  // find user
  const user = await User.findById(req.user.id).exec();
  if (!user) return next(new AppError('User does not eixst'), 400);
  // set active false

  user.active = false;
  await user.save({ validateBeforeSave: false }).exec();
  res.redirect('/api/v1/auth/logout');
});

exports.findUserbyNameOrEmail = catchAsync(async (req, res, next) => {
  const { nameOrEmail } = req.body;

  const user = await User.findOne({
    $or: [{ name: nameOrEmail }, { email: nameOrEmail }],
  });
  if (!user) return next(new AppError('User does not exist', 404));

  req.user = user;
  next();
});
exports.findUserbyEmail = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({
    email,
  });
  if (!user) return next(new AppError('User with Email does not exist', 404));

  req.user = user;
  next();
});

//////////////////////////////////////////////////////////
//// TWEET
//////////////////////////////////////////////////////////

//////////////////////////////////////////////
// store temporary in memory
// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/users');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   },
// });

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) cb(null, true);
  else cb(new AppError('Not an image! Please upload only images', 400), false);
};

const upload = multer({
  storage: multerStorage,
  filter: multerFilter,
});

exports.uploadUserPhotoOrCoverPic = upload.fields([
  { name: 'profilePic', maxCount: 1 },
  { name: 'cover_pic', maxCount: 1 },
]);

const save_img = try_catch(async (file, dimension, filename) => {
  await sharp(file.buffer)
    .resize(...dimension)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${filename}`);
});

exports.resizeImages = async (req, res, next) => {
  if (!req.files) return next();

  const img_promise = [];

  const { cover_pic, profilePic } = req.files;

  if (cover_pic) {
    const filename = `user-${req.user.id}-${Date.now()}.jpeg`;
    req.body.cover_pic = filename;

    img_promise.push(save_img(cover_pic[0], [1200, 1080], filename));
  }
  if (profilePic) {
    const filename = `user-${req.user.id}-${Date.now()}.jpeg`;
    req.body.profilePic = filename;

    img_promise.push(save_img(profilePic[0], [600, 600], filename));
  }

  if (img_promise.length > 0) await Promise.all(img_promise);

  // req.body.profilePic = filename;

  next();
};

//////////////////////////////////////////////////////
// BY ADMIN
exports.createUser = factory.createOne(User);
exports.updateUser = factory.updateOne(User);
exports.updateAllUser = factory.getAll(User);
exports.deleteUser = factory.deleteOne(User);
exports.getUser = factory.getOne(User);
exports.getAllUser = factory.getAll(User);

/////////////////////////////////////////////////////
// Releated tweets
exports.add_tweetId_to_user_recent_tweets = try_catch(
  async (user_id, tweet_id, detail_obj_arr) => {
    await User.findOneAndUpdate(
      { _id: user_id },
      {
        $push: {
          recent_tweets_id: {
            $each: [{ _id: tweet_id }],
            $sort: -1,
            $slice: 25,
          },
        },
      },
      { upsert: true }
    ).exec();
  }
);

exports.return_search_users = try_catch(
  async (name, limit, me_id = '') =>
    await User.aggregate([
      {
        $search: {
          compound: {
            must: { equals: { path: 'active', value: true } },
            should: [
              {
                autocomplete: {
                  path: 'name',
                  query: name,
                  fuzzy: { prefixLength: 1 },
                },
              },
              {
                text: {
                  path: 'name',
                  query: name,
                  score: { boost: { value: 2 } },
                },
              },
            ],
            minimumShouldMatch: 1,
          },
          returnStoredSource: true,
        },
      },

      {
        $match: {
          _id: { $ne: me_id },
        },
      },

      { $limit: Number(limit) || 12 },
    ])
);

// search for circle and to search users
exports.search_users = try_catch(async (req, res, next) => {
  // can be one letter due to user is searching
  const { name, limit } = req.params;
  if (!name) return sendReq(res, 200, []);
  const users = await this.return_search_users(
    name,
    limit,
    req.user && req.user._id
  );

  return sendReq(res, 200, 'searched_user', users);
});

exports.get_restrict_user = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ _id: req.params.user_id });
  if (!user) return next(new AppError('User not found', 400));

  const {
    name,
    avatar,
    following_count,
    followers_count,
    bio,
    profilePic,
    _id,
  } = user;

  const restrict_user_field = {
    name,
    avatar,
    following_count,
    followers_count,
    bio,
    profilePic,
    _id,
  };

  return sendReq(res, 200, 'restrict user fields doc', restrict_user_field);
});

exports.update_user_tweet_count = try_catch(async (user_id, value) => {
  // value => 1 or -1
  await User.findOneAndUpdate(
    { _id: user_id },
    { $inc: { posted_tweets_count: value } }
  );
});

exports.update_user_tweet_count_and_liked_tweet_count = try_catch(
  async (user_id, value) => {
    await User.findOneAndUpdate(
      { _id: user_id },
      {
        $inc: {
          posted_tweets_count: value,
          liked_tweets_count: value,
        },
      }
    );
  }
);

exports.add_block_user = try_catch(async (user_id, block_user_id) => {
  await User.findOneAndUpdate(
    { _id: user_id },
    { $addToSet: { blocked_user_id_arr: block_user_id } }
  ).exec();
});
exports.remove_block_user = try_catch(async (user_id, block_user_id) => {
  await User.findOneAndUpdate(
    { _id: user_id },
    { $pull: { blocked_user_id_arr: block_user_id } }
  ).exec();
});

exports.get_most_followed_users = try_catch(
  async (user_id, limit, login_user = true, page = 0) => {
    const query = user_id ? { _id: { $ne: user_id } } : null;
    const top_users = await User.find(query, {
      profilePic: 1,
      name: 1,
      avatar: 1,
    })
      .sort({ followers_count: -1 })
      .skip(Number(page) * 12)
      .limit(25)
      .exec();

    if (!login_user) return top_users.slice(0, 2);

    const top_users_not_follow_given_user =
      await given_users_not_follow_given_user(user_id, top_users);

    return top_users_not_follow_given_user.slice(0, limit);
  }
);

exports.api_get_most_followed_users = catchAsync(async (req, res) => {
  const { page, limit } = req.params;
  const users = await this.get_most_followed_users(
    req.user._id,
    limit,
    true,
    page
  );
  return sendReq(res, 200, 'to follow usesr', users);
});

exports.set_restrict_user = (req, res, next) => {
  if (!req.login_user) return next();
  req.restrict_user = {
    cur_user: {
      _id: req.user._id,
      name: req.user.name,
      avatar: req.user.avatar,
      profilePic: req.user.profilePic,
    },
    cur_user_customization: req.user.customization,
    cur_user_other_accounts: req.user.other_accounts,
  };

  req.user_details = {};

  next();
};

// message
exports.handle_user_chat_id_arr = try_catch(
  async (user_id, chat_id, field, value) => {
    const query = value
      ? { $addToSet: { [field]: chat_id } }
      : { $pull: { [field]: chat_id } };

    await User.findOneAndUpdate({ _id: user_id }, query, { new: true });
  }
);
exports.handle_user_multiple_chat_id_arr = try_catch(
  async (user_id, multiple_field_query) => {
    const query = multiple_field_query;

    await User.findOneAndUpdate({ _id: user_id }, query, { new: true });
  }
);
