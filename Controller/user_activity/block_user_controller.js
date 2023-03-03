/* eslint-disable camelcase */
const catchAsync = require('../../utils/catchAsync');
const user_activity = require('../../Model/user/user_acitivity_model');
const bucket_controller = require('../bucket_controller');
const AppError = require('../../utils/AppError');
const sendReq = require('../../utils/sendJSON');
const try_catch = require('../../utils/tryCatchBlock');
const user_controller = require('../user/userController');

exports.block_user = catchAsync(async (req, res, next) => {
  // 1.add tweet_id to user bookmark

  let result;
  const { user_id: add_to_circle_id } = req.params;
  const { add_user: to_be_add_user } = req.body;

  await Promise.all([
    user_controller.add_block_user(req.user._id, to_be_add_user._id),
    bucket_controller.add_doc_to_bucket(
      user_activity,
      'user_id',
      req.user._id,
      'blocked_user_id_arr',
      to_be_add_user,
      false
    ),
  ]);

  return sendReq(res, 200, 'user added to circle', result);
});
exports.unblock_user = catchAsync(async (req, res, next) => {
  // 1.add tweet_id to user bookmark

  let result;
  const { user_id } = req.params;

  console.log(user_id)

  result = bucket_controller.remove_doc_from_bucket(
    user_activity,
    'user_id',
    req.user._id,
    'blocked_user_id_arr',
    user_id,
    false
  );

  await Promise.all([
    user_controller.remove_block_user(req.user._id, user_id),
    result,
  ]);

  // if (!result) return next(new AppError('user not blocked', 500));

  return sendReq(res, 200, 'user blocked', result);
});

exports.get_blocked_users = try_catch(
  async (user_id, page = 0, limit) =>
    await bucket_controller.get_bucket_embedded_latest_doc(
      user_activity,
      limit,
      page,
      'user_id',
      user_id,
      'blocked_user_id_arr',
      {}
    )
);

exports.api_get_blocked_users = catchAsync(async (req, res, next) => {
  const blocked_users = await this.get_blocked_users(
    req.user._id,
    req.params.page,
    12
  );
  return sendReq(res, 200, 'blocked users', blocked_users);
});
