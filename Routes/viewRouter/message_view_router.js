/* eslint-disable camelcase */
const express = require('express');
const message_view_controller = require('../../Controller/view/message_view_controller');

const message_view_router = express.Router();

message_view_router.get('/', message_view_controller.render_preview_page);
message_view_router.get(
  '/chat/:chat_id',
  message_view_controller.render_chat_message
);

module.exports = message_view_router;
