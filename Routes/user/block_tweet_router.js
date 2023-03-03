/* eslint-disable camelcase */
const express = require('express');
const block_tweet_controller = require('../../Controller/user_activity/block_tweet_controller');

const block_tweet_router = express.Router();

block_tweet_router.post(
  '/add/:tweet_id',
  block_tweet_controller.api_block_tweet
);
block_tweet_router.delete(
  '/remove/:tweet_id',
  block_tweet_controller.api_unblock_tweet
);
block_tweet_router.get('/', block_tweet_controller.api_get_user_blocked_tweets);

module.exports = block_tweet_router;
