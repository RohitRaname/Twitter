/* eslint-disable no-restricted-syntax */
/* eslint-disable camelcase */
const notification_model = require('../../Model/user/notification');
const try_catch = require('../../utils/tryCatchBlock');
const catchAsync = require('../../utils/catchAsync');
const bucket_controller = require('../bucket_controller');
const sendReq = require('../../utils/sendJSON');

// thought this, i get all notification users which need to be notified
const user_notification_controller = require('../user_activity/user_notification_controller');

// send notification to the user which own the tweet  or followed by someone
exports.create_notification = try_catch(async (user_id, doc) => {
  await bucket_controller.add_doc_to_bucket(
    notification_model,
    'user_id',
    user_id,
    'notifications',
    doc,
    false
  );
});

exports.send_notification_to_notified_users = try_catch(
  async (user_id, doc) => {
    const get_all_notification_users =
      await user_notification_controller.get_all_notify_users(user_id);

    const send_notification = [];
    for (const user of get_all_notification_users) {
      const notify_user = bucket_controller.add_doc_to_bucket(
        notification_model,
        'user_id',
        user._id,
        'notifications',
        doc,
        false
      );

      send_notification.push(notify_user);
    }

    await Promise.all(send_notification);
  }
);

exports.remove_user_from_circle = try_catch(
  async (bucket_user_id, notify_user_id) =>
    await bucket_controller.remove_doc_from_bucket(
      notification_model,
      'user_id',
      bucket_user_id,
      'notifications',
      notify_user_id,
      false
    )
);

exports.get_notifications = try_catch(
  async (user_id, page = 0, limit) =>
    await bucket_controller.get_bucket_embedded_latest_doc(
      notification_model,
      limit,
      page,
      'user_id',
      user_id,
      'notifications',
      {}
    )
);

exports.api_get_notifications = catchAsync(async (req, res, next) => {
  const { page, limit } = req.params;
  const circle_users = await this.get_notifications(req.user._id, page, limit);
  return sendReq(res, 200, 'circle users', circle_users);
});
