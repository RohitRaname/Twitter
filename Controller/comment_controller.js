/* eslint-disable prefer-const */
/* eslint-disable one-var */
/* eslint-disable camelcase */
const mongoose = require('mongoose');
const sharp = require('sharp');

const Comment = require('../Model/tweet/tweet_comment_model');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const sendReq = require('../utils/sendJSON');
const user_comment_bucket_controller = require('./user_activity/user_comment_bucket_controller');
const try_catch = require('../utils/tryCatchBlock');
const { format_time } = require('../utils/helperFunction');

const {
  add_tweet_id_to_user_posted_tweets,
} = require('./user_activity/user_posted_tweet_bucket_controller');
const TweetModel = require('../Model/tweet/tweetModel');
const tweet_controller = require('./tweet/tweetController');

const tweet_schedule_controller = require('./tweet/tweet_schedule_controller');
const user_schedule_tweet_bucket_controller = require('./user_activity/schedule_tweet_bucket_controller');
const user_draft_tweet_bucket_controller = require('./user_activity/draft_tweet_bucket_controller');

// comment => refer to top level tweet comments
// reply => refer to tweet comment reply

exports.resizeImages = async (req, res, next) => {
  if (!req.files) return next();

  const upload_imgs = [];
  // eslint-disable-next-line no-restricted-syntax
  for await (const file of req.files) {
    const filename = `comment_img-${req.user.id}-${Date.now()}.jpeg`;

    sharp(file.buffer)
      .resize(1280, 720)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/comments/${filename}`);

    upload_imgs.push(filename);
  }

  req.body.upload_imgs = upload_imgs;

  next();
};

const form_comment_obj = (cur_user, tweet_id, comment_obj) => {
  const comment_format = {
    tweet_id: tweet_id,
    author: {
      _id: cur_user.id,
      name: cur_user.name,
      avatar: cur_user.avatar,
      profilePic: cur_user.profilePic,
    },

    text: comment_obj.text,

    // posted tweet user avatar
    reply_to: comment_obj.reply_to,
    upload_imgs: comment_obj.upload_imgs,

    parent_id: comment_obj.parent_id,
    ts: new Date(),
    schedule_post_time: comment_obj.schedule_post_time,
  };

  return comment_format;
};

// text comment
exports.create_comment = try_catch(async (cur_user, comment_pass, next) => {
  // 1.check parent exist of comment and if exist then increase its child comment count
  // 1.5.increase tweet comment count (if comment top parent el)
  // 2.save comment
  // 3.save comment in user_comment_bucket

  let result, comment, parent_comment;
  const comment_obj = comment_pass;

  let { tweet_id, comment_tweet_user_id } = comment_pass;

  comment = form_comment_obj(cur_user, tweet_id, comment_obj);

  const { parent_id } = comment;

  if (parent_id) {
    parent_comment = await Comment.findOne({ _id: parent_id }).exec();
    comment.level = Number(parent_comment.level) + 1;
    comment.ancestors_id = [...parent_comment.ancestors_id, parent_comment._id];
  }

  // 2.save comment
  const comment_doc = await Comment.create({
    ...comment,
  });

  if (!comment_doc) return next(new AppError('comment not created', 500));

  // 1.check parent exist of comment and if exist then increase its child comment count
  if (parent_id) {
    // comment.reply_to = comment.detail.reply_to.push({
    //   avatar: parent_comment.avatar,
    // });

    if (parent_comment) {
      if (parent_comment.child_comments_count === 0) {
        await Comment.findOneAndUpdate(
          { _id: parent_id },
          {
            $inc: { child_comments_count: 1 },

            $set: {
              reply: comment_doc,
            },
          }
        ).exec();
      } else
        await Promise.all([
          Comment.findOneAndUpdate(
            { $or: [{ _id: parent_id }] },
            {
              $inc: { child_comments_count: 1 },
            }
          ).exec(),
          Comment.findOneAndUpdate(
            { $or: [{ 'reply._id': parent_id }] },
            {
              $inc: { 'reply.child_comments_count': 1 },
            }
          ).exec(),
        ]);
    }
  }

  // 1.5.increase tweet comment count (if comment top parent el)
  if (!parent_id) {
    await tweet_controller.update_comment_count_in_tweet(comment.tweet_id, 1);
  }

  // 3.save comment in user_comment_bucket
  result =
    await user_comment_bucket_controller.add_comment_to_user_comment_bucket(
      cur_user,
      comment_doc,
      tweet_id,
      comment_tweet_user_id
    );
  return comment_doc;
});

// draft or schedule comment
exports.create_draft_or_schedule_comment = catchAsync(
  async (req, res, next) => {
    // 1.here we take care of draft and schedule tweet comment
    // 2.comment on tweet is taken care by comment router

    const { tweet_id } = req.params;

    const user_id = req.user._id;
    const { tweet_type } = req.body;
    let doc = req.body;

    const comment = {
      // comment details
      text: doc.text,
      upload_imgs: doc.upload_imgs,
      tweet_type: doc.tweet_type,
      reply_to:
        typeof doc.posted_tweet_reply_to === 'string'
          ? [doc.posted_tweet_reply_to, doc.posted_tweet_user_avatar]
          : [...doc.posted_tweet_reply_to, doc.posted_tweet_user_avatar],
      schedule_post_time: doc.schedule_post_time,
      posted_tweet: {
        _id: tweet_id,

        user: {
          name: doc.posted_tweet_user_name,
          avatar: doc.posted_tweet_user_avatar,
          profilePic: doc.posted_tweet_user_profilePic,
        },
      },

      // // posted tweet in which we comment
      // posted_tweet: {
      //   _id: doc.posted_tweet__id,
      //   text: doc.posted_tweet_text,
      //   upload_imgs: doc?.posted_tweet_upload_imgs,
      //   ts: doc.posted_tweet_ts,
      //   reply_to: doc.posted_tweet_reply_to,

      //   user: {
      //     name: doc.posted_tweet_user_name,
      //     avatar: doc.posted_tweet_user_avatar,
      //     profilePic: doc.posted_tweet_user_profilePic,
      //   },
      // },
    };

    if (tweet_type === 'draft-comment') {
      await user_draft_tweet_bucket_controller.add_tweet_to_draft_bucket(
        user_id,
        comment
      );
    }

    if (tweet_type === 'schedule-comment') {
      const { _id } =
        await user_schedule_tweet_bucket_controller.add_tweet_to_schedule_bucket(
          user_id,
          comment
        );

      await tweet_schedule_controller.schedule_tweet(user_id, {
        _id: _id,
        schedule_post_time: doc.schedule_post_time,
        user_id: user_id,
        type: tweet_type,
      });
    }

    return sendReq(res, 200, 'comment created', doc);
  }
);

exports.api_create_comment = catchAsync(async (req, res, next) => {
  console.log(req.body);
  if (!req.body.tweet_id) req.body.tweet_id = req.params.tweet_id;

  const comment = await this.create_comment(req.user, req.body, next);
  return sendReq(res, 200, 'comment reply posted', comment);
});

exports.api_update_comment = try_catch(
  async (tweet_id, comment_id, comment) => {
    const { text, ts, upload_imgs } = comment;

    await Comment.findOneAndUpdate(
      { tweet_id: tweet_id, _id: comment_id },
      {
        $set: {
          'detail.text': text,
          'detail.upload_imgs': upload_imgs,
          ts: ts,
        },
      }
    ).exec();
  }
);

// delete comment and its replies
exports.api_delete_comment = catchAsync(async (req, res, next) => {
  // 1.check parent exist of comment
  // 2.if exist then decrease its child comment count
  // 2.5. remove comment child comments
  // 3.remove comment from user_comment_bucket
  // 4.remove current comment

  let result;
  const { comment_id, parent_id } = req.params;

  // 1.check parent exist of comment
  const parent_comment = await Comment.findOne({ _id: parent_id });

  // 2.if exist then decrease its child comment count
  if (parent_comment) {
    await Comment.findOneAndUpdate(
      { _id: parent_id },
      { $inc: { child_comments_count: -1 } }
    );
  }

  // 2.5. remove comment child comments
  const delete_comments = await Comment.updateMany(
    { $or: [{ _id: comment_id }, { ancestors_id: { $in: comment_id } }] },
    {
      $set: {
        active: false,
      },
    },
    { new: true }
  );

  const tweet_id = delete_comments[0].tweet_id;

  const delete_comments_id_arr = delete_comments.map((el) => el._id);

  // 3.remove comment and its reply  in user_comment_bucket
  const remove_user_comment_from_user_comment_arr =
    await user_comment_bucket_controller.remove_multiple_comment_from_user_comment_bucket(
      req.user._id,
      delete_comments_id_arr,
      tweet_id
    );

  // 4.remove comment
  // result = await Comment.findOneAndUpdate(
  //   { _id: comment_id },
  //   { $set: { active: false } }
  // );
  // if (!result) return next(new AppError('comment not  deleted', 500));

  return sendReq(res, 200, 'comment deleted', result);
});

// get tweet top level(level 1 comments)
exports.get_tweet_comments = try_catch(async (tweet_id, page, limit) => {
  let docs = await Comment.aggregate([
    {
      $match: {
        tweet_id: mongoose.Types.ObjectId(tweet_id),
        level: 1,
        active: true,
      },
    },

    { $sort: { ts: -1 } },

    { $skip: limit * page },

    { $limit: limit },
  ]).exec();

  // format time in human readable format easily
  // docs = docs.map((doc) => {

  //   if (Number(doc.child_comments_count) > 0)
  //     doc.reply.ts_format = format_time(doc.reply.ts_format);
  //   return doc;
  // });

  return docs;
});

// get tweet comment reply (level 2)
exports.get_comment_replies = try_catch(
  async (comment_id, page, limit) =>
    await Comment.aggregate([
      {
        $match: {
          // we also need the level
          parent_id: mongoose.Types.ObjectId(comment_id),
        },
      },

      { $sort: { ts: -1 } },

      { $skip: limit * page },

      { $limit: limit },
    ]).exec()
);

exports.get_comment = try_catch(
  async (comment_id) => await Comment.findOne({ _id: comment_id }).exec()
);

// stats mean => [like,bookmark]
// value mean => [1,-1]
const update_comment_stats = try_catch(
  async (user_id, comment_id, field, value) => {
    const promise_update_comment = Comment.findOneAndUpdate(
      { _id: comment_id },
      {
        $inc: { [`metadata.${field}_count`]: value },
      },
      { new: true }
    );

    let update_user_comment_activity_arr;

    if (field === 'like')
      update_user_comment_activity_arr =
        user_comment_bucket_controller.add_or_remove_comment_to_user_like_comment_arr(
          user_id,
          comment_id,
          value
        );

    if (field === 'bookmark')
      update_user_comment_activity_arr =
        user_comment_bucket_controller.add_or_remove_comment_to_user_bookmark_comment_arr(
          user_id,
          comment_id,
          value
        );

    const result = await Promise.all([
      promise_update_comment,
      update_user_comment_activity_arr,
    ]);

    const update_comment = result[0];

    if (update_comment.parent_id)
      await Comment.findOneAndUpdate(
        { _id: update_comment.parent_id },
        {
          $inc: { [`reply.metadata.${field}_count`]: value },
        }
      );
  }
);

exports.like_comment = catchAsync(async (req, res, next) => {
  const { comment_id } = req.params;
  const user_id = req.user._id;
  await update_comment_stats(user_id, comment_id, 'like', 1);
  return sendReq(res, 200);
});
exports.unlike_comment = catchAsync(async (req, res, next) => {
  const { comment_id } = req.params;
  const user_id = req.user._id;
  await update_comment_stats(user_id, comment_id, 'like', -1);
  return sendReq(res, 200);
});
exports.bookmark_comment = catchAsync(async (req, res, next) => {
  const { comment_id } = req.params;
  await update_comment_stats(req.user._id, comment_id, 'bookmark', 1);
  return sendReq(res, 200);
});
exports.unbookmark_comment = catchAsync(async (req, res, next) => {
  const { comment_id } = req.params;
  await update_comment_stats(req.user._id, comment_id, 'bookmark', -1);
  return sendReq(res, 200);
});

exports.api_get_tweet_comments = catchAsync(async (req, res, next) => {
  const { tweet_id, page, limit } = req.params;
  if (!tweet_id || !page || !limit) return sendReq(res, 200);
  const comment_replies = await this.get_tweet_comments(
    tweet_id,
    Number(page),
    Number(limit)
  );
  return sendReq(res, 200, 'comment replies', comment_replies);
});

exports.api_get_comment_replies = catchAsync(async (req, res, next) => {
  const { comment_id, page, limit } = req.params;
  const comment_replies = await this.get_comment_replies(
    comment_id,
    Number(page),
    Number(limit)
  );
  return sendReq(res, 200, 'comment replies', comment_replies);
});

// exports.api_create_top_level_comment = catchAsync(async (req, res, next) => {
//   // 1.create comment
//   // 2.save comment id in user bucket
//   // 3.update tweet comment count

//   // 1.create comment
//   const comment = reform_comment_obj(req.body);
//   const comment_doc = await Comment.create(comment)

//   // 2.save comment id in user bucket
//  await user_comment_bucket_controller.add_comment_id_to_user_comment_bucket(
//       req.user._id,
//       comment_doc._id
//     );

//   // 3.update tweet comment count
//   await update_comment_count_in_tweet(comment_doc.tweet_id,1)

//    return sendReq(res,200,'top level comment posted',comment_doc)

// });
