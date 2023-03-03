/* eslint-disable camelcase */
const express = require('express');
const notification_controller = require('../../Controller/user_activity/user_notification_controller');

const notification_router = express.Router();

notification_router.post(
  '/me/from/:notification_from_user_id',
  notification_controller.api_add_notification_user
);
notification_router.delete(
  '/me/from/:notification_from_user_id',
  notification_controller.api_remove_notification_user
);

module.exports = notification_router;
