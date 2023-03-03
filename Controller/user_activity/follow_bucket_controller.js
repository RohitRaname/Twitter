/* eslint-disable camelcase */
const catchAsync = require('../../utils/catchAsync');
const user_activity = require('../../Model/user/user_acitivity_model');
const AppError = require('../../utils/AppError');
const sendReq = require('../../utils/sendJSON');
const try_catch = require('../../utils/tryCatchBlock');

// controller
const bucket_controller = require('../bucket_controller');
const notification_controller = require('../user/user_notification_controller');

exports.follow_user = catchAsync(async (req, res, next) => {
  // 1.cur_user_id following add follow_user obj
  // 2.follow_user_id's followers arr add cur_user obj

  let result;
  const { user_id: follow_user_id } = req.params;
  const { add_user: follow_user_obj } = req.body;

  const cur_user_obj = {
    _id: req.user._id,
    name: req.user.name,
    avatar: req.user.avatar,
    bio: req.user.bio,
    profilePic: req.user.profilePic,
  };

  // 1.cur_user_id following's arr add follow_user obj
  const add_following = bucket_controller.add_doc_to_bucket(
    user_activity,
    'user_id',
    cur_user_obj._id,
    'following',
    follow_user_obj,
    true,
    cur_user_obj._id,
    'following_count'
  );

  // 2.follow_user_id's followers arr add cur_user obj
  const add_followers = bucket_controller.add_doc_to_bucket(
    user_activity,
    'user_id',
    follow_user_id,
    'followers',
    cur_user_obj,
    true,
    follow_user_id,
    'followers_count'
  );

  let new_follower_notification;
  if (cur_user_obj._id.toString() !== follow_user_obj._id.toString()) {
    // 3.following user get notification of new follower
    new_follower_notification = notification_controller.create_notification(
      follow_user_obj._id,
      {
        _id: cur_user_obj._id,
        type: 'follow',
        user: cur_user_obj,
      }
    );
  }

  await Promise.all([add_following, add_followers, new_follower_notification]);

  return sendReq(res, 200, 'follow user', { result });
});
exports.unfollow_user = catchAsync(async (req, res, next) => {
  // 1.cur_user_id following add follow_user obj
  // 2.follow_user_id's followers arr add cur_user obj

  let result;
  const { user_id: follow_user_id } = req.params;

  const cur_user_id = req.user._id;

  // 2.follow_user_id's followers arr add cur_user obj
  result = await bucket_controller.remove_doc_from_bucket(
    user_activity,
    'user_id',
    follow_user_id,
    'followers',
    cur_user_id,
    true,
    follow_user_id,
    'followers_count'
  );

  // 1.cur_user_id following's arr add follow_user obj
  result = await bucket_controller.remove_doc_from_bucket(
    user_activity,
    'user_id',
    cur_user_id,
    'following',
    follow_user_id,
    true,
    cur_user_id,
    'following_count'
  );
  if (!result) return next(new AppError('user not followed', 500));

  return sendReq(res, 200, 'unfollow user', { result });
});

exports.get_following_users = try_catch(async (user_id, page = 0) => {
  const following = await bucket_controller.get_bucket_embedded_latest_doc(
    user_activity,
    12,
    page,
    'user_id',
    user_id,
    'following',
    {}
  );

  console.log('following', following);

  return following;
});
exports.get_followers = try_catch(async (login_user, user_id, page, limit) => {
  const followers = await bucket_controller.get_bucket_embedded_latest_doc(
    user_activity,
    limit,
    page,
    'user_id',
    user_id,
    'followers',
    {}
  );

  const set_following_property_in_following_users = login_user
    ? await bucket_controller.given_doc_arr_exist_in_bucket(
        user_activity,
        'user_id',
        user_id,
        'following',
        followers,
        'follow_by_cur_user'
      )
    : followers.map((el) => {
        el.follow_by_cur_user = false;
        return el;
      });

  return set_following_property_in_following_users;
});

exports.check_first_user_follow_second_user = try_catch(
  async (first_user, second_user) =>
    await bucket_controller.check_doc_already_exist_in_bucket(
      user_activity,
      'user_id',
      first_user,
      'following',
      second_user
    )
);

exports.given_users_not_follow_given_user = try_catch(
  async (user_id, users) => {
    const users_doc = await bucket_controller.given_doc_arr_exist_in_bucket(
      user_activity,
      'user_id',
      user_id,
      'following',
      users,
      'follow_by_cur_user'
    );

    return users_doc.filter((user) => !user.follow_by_cur_user);
  }
);

// api --------------------------------------------------------------
exports.api_get_following_users = catchAsync(async (req, res, next) => {
  const following_users = await this.get_following_users(
    req.params.user_id,
    req.params.page
  );
  return sendReq(res, 200, 'folowers', following_users);
});
exports.api_get_followers = catchAsync(async (req, res, next) => {
  const { page, limit } = req.params;

  
  const followers = await this.get_followers(
    req.login_user,
    req.params.user_id,
    page,
    limit
  );
  return sendReq(res, 200, 'folowers', followers);
});
