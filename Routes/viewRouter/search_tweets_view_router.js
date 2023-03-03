/* eslint-disable camelcase */
const express = require('express');
const notification_view_controller = require('../../Controller/view/notification_view_controller');
const notification_view_router = express.Router();

notification_view_router.get(
  '/',
  notification_view_controller.render_notification_page
);

module.exports = notification_view_router;
