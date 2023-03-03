/* eslint-disable camelcase */
const express = require('express');
const user_block_controller = require('../../Controller/user_activity/block_user_controller');

const user_block_router = express.Router();

user_block_router.post('/add/:user_id', user_block_controller.block_user);
user_block_router.delete(
  '/remove/:user_id',
  user_block_controller.unblock_user
);
user_block_router.get(
  '/page/:page',
  user_block_controller.api_get_blocked_users
);

// user_block_router.get(
//   '/user/:user_id/page/:page',
//   user_block_controller.api_get_bookmark_tweets
// );

module.exports = user_block_router;
