/* eslint-disable camelcase */
const mongoose = require('mongoose');
const catchAsync = require('../../utils/catchAsync');
const user_activity = require('../../Model/user/user_acitivity_model');
const bucket_controller = require('../bucket_controller');
const AppError = require('../../utils/AppError');
const sendReq = require('../../utils/sendJSON');
const try_catch = require('../../utils/tryCatchBlock');

exports.mute_user = catchAsync(async (req, res, next) => {
  // 1.add tweet_id to user bookmark

  let result;
  const { user_id: add_to_circle_id } = req.params;
  const { add_user: to_be_add_user } = req.body;

  const add_muteuser_to_user_bucket = bucket_controller.add_doc_to_bucket(
    user_activity,
    'user_id',
    req.user._id,
    'muted_user_id_arr',
    to_be_add_user,
    false
  );

  const add_muteuser_to_user_arr = mongoose
    .model('user')
    .findOneAndUpdate(
      { _id: req.user._id },
      { $push: { muted_user_id_arr: to_be_add_user._id } }
    );

  await Promise.all([add_muteuser_to_user_arr, add_muteuser_to_user_bucket]);

  return sendReq(res, 200, 'user muted', result);
});
exports.unmute_user = catchAsync(async (req, res, next) => {
  // 1.add tweet_id to user bookmark

  let result;
  const { user_id } = req.params;

  const remove_user_from_bucket = bucket_controller.remove_doc_from_bucket(
    user_activity,
    'user_id',
    req.user._id,
    'muted_user_id_arr',
    user_id,
    false
  );

  const remove_user_from_user_doc = mongoose
    .model('user')
    .findOneAndUpdate(
      { _id: req.user._id },
      { $pull: { muted_user_id_arr: user_id } }
    );

  await Promise.all([remove_user_from_bucket, remove_user_from_user_doc]);

  return sendReq(res, 200, 'user unmuted', result);
});

exports.get_muted_users = try_catch(
  async (user_id, page = 0, limit) =>
    await bucket_controller.get_bucket_embedded_latest_doc(
      user_activity,
      limit,
      page,
      'user_id',
      user_id,
      'muted',
      {}
    )
);

exports.api_get_muted_users = catchAsync(async (req, res, next) => {
  const muted_users = await this.get_muted_users(
    req.user._id,
    req.params.page,
    12
  );
  return sendReq(res, 200, 'circle users', muted_users);
});
