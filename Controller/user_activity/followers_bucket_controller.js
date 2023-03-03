/* eslint-disable camelcase */
const catchAsync = require('../../utils/catchAsync');
const user_activity = require('../../Model/user/user_acitivity_model');
const bucket_controller = require('../bucket_controller');
const AppError = require('../../utils/AppError');
const sendReq = require('../../utils/sendJSON');
const try_catch = require('../../utils/tryCatchBlock');

exports.get_followers = try_catch(async (user_id, page, limit) => {
  const followers = await bucket_controller.get_bucket_embedded_latest_doc(
    user_activity,
    limit,
    page,
    'user_id',
    user_id,
    'followers',
    {}
  );

  console.log('followers',followers)

  const set_following_property_in_followers_users =
    await bucket_controller.given_doc_arr_exist_in_bucket(
      user_activity,
      'user_id',
      user_id,
      'following',
      followers,
      'follow_by_cur_user'
    );

  return set_following_property_in_followers_users;
});

exports.check_first_user_follower_second_user = try_catch(
  async (first_user, second_user) =>
    await bucket_controller.check_doc_already_exist_in_bucket(
      user_activity,
      'user_id',
      first_user,
      'followers',
      second_user
    )
);

exports.api_get_followers = catchAsync(async (req, res, next) => {
  const followers = await this.get_followers(
    req.params.user_id,
    req.params.page,
    req.params.limit
  );
  return sendReq(res, 200, 'folowers', followers);
});
