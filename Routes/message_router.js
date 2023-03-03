/* eslint-disable camelcase */
const express = require('express');
const chat_controller = require('../Controller/message/chat_controller');
const refresh_controller = require('../Controller/refreshTokenController');
const user_controller = require('../Controller/user/userController');
const protect_router = require('./identify_and_protect_router/protect_router');
const is_logged_in_router = require('./identify_and_protect_router/is_login_router');

const multer = require('../utils/multer');

const message_router = express.Router();

message_router.use(
protect_router
);

message_router.post(
  '/initiate-chat',
  chat_controller.api_create_chat_connection_bw_users
);

message_router.post(
  '/:chat_id',
  multer.single_field_with_multiple_imgs('upload_img', 1),
  chat_controller.resizeImages,
  chat_controller.api_send_message
);

// from now on i will make route more explainable

// chat/:chat_id/message/:message_id
message_router.patch(
  '/:chat_id/:message_id',
  chat_controller.api_update_chat_message
);
message_router.patch(
  '/chat/:chat_id/all-messages',
  chat_controller.api_update_all_chat_messages
);

message_router.delete(
  '/chat/:chat_id',
  chat_controller.api_delete_chat_connection
);
message_router.delete(
  '/chat/:chat_id/message/:message_id',
  chat_controller.api_delete_chat_message
);

message_router.get(
  '/me/search-future-chat-users/:name/:limit',
  chat_controller.api_search_future_chat_users
);
// chat/:chat_id/page/:page/limit/:limit
// chat_bw users
message_router.get(
  '/:chat_id/:page/:limit',
  user_controller.set_restrict_user,
  chat_controller.api_get_chats_bw_users
);

// search/user/:user_id/text/:text/limit/:limit
message_router.get(
  '/search/:user_id/:text/:limit',
  chat_controller.api_search_chat_messages
);

// /pin/chat/:chat_id/value/:value
message_router.patch(
  '/pin/chat-id/:chat_id/value/:value',
  chat_controller.api_pin_unpin_chat
);

message_router.patch(
  '/mute/chat-id/:chat_id/value/:value',
  chat_controller.api_mute_unmute_chat
);
message_router.patch(
  '/mute/chat-id/:chat_id/value/:value',
  chat_controller.api_delete_chat_message
);

// update message

//

module.exports = message_router;
