/* eslint-disable camelcase */
const UserActivity = require('../../Model/user/user_acitivity_model');
const try_catch = require('../../utils/tryCatchBlock');
const catchAsync = require('../../utils/catchAsync');
const bucket_controller = require('../bucket_controller');
const sendReq = require('../../utils/sendJSON');

// send notification to the user which own the tweet  or followed by someone
exports.add_notify_user = try_catch(async (notification_from,notification_to_id) => {
  const add_send_notification_user_id = bucket_controller.add_doc_to_bucket(
    UserActivity,
    'user_id',
    notification_from._id,
    'send_notification_to_user_id_arr',
    { _id: notification_to_id },
    false
  );
  const add_get_notification_user_id = bucket_controller.add_doc_to_bucket(
    UserActivity,
    'user_id',
    notification_to_id,
    'get_notification_from_users',
    notification_from,
    false
  );

  await Promise.all([
    add_send_notification_user_id,
    add_get_notification_user_id,
  ]);
});

exports.remove_notifiy_user = try_catch(
  async (notification_from_id,notification_to_id) => {
    const remove_send_notification_user_id =
      bucket_controller.remove_doc_from_bucket(
        UserActivity,
        'user_id',
        notification_from_id,
        'send_notification_to_user_id_arr',
        notification_to_id,
        false
      );
    const remove_get_notification_user_id = bucket_controller.remove_doc_from_bucket(
      UserActivity,
      'user_id',
      notification_to_id,
      'get_notification_from_users',
      notification_from_id,
      false
    );
    await Promise.all([
      remove_send_notification_user_id,
      remove_get_notification_user_id,
    ]);
  }
);

exports.get_all_notify_users = try_catch(
  async (user_id) =>
    await bucket_controller.get_bucket_arr_field_all_docs(
      UserActivity,
      'user_id',
      user_id,
      'get_notification_from_users',
      {}
    )
);
exports.api_add_notification_user = try_catch(async (req, res) => {
  await this.add_notify_user(req.body,req.user._id);
  return sendReq(res, 200);
});
exports.api_remove_notification_user = try_catch(async (req, res) => {
  await this.remove_notifiy_user(req.params.notification_from_user_id,req.user._id);
  return sendReq(res, 200);
});

exports.api_get_all_notify_users = catchAsync(async (req, res, next) => {
  const circle_users = await this.create_notification(req.user._id);
  return sendReq(res, 200, 'circle users', circle_users);
});
