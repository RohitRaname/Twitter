/* eslint-disable camelcase */
const express = require('express');
const tweet_like_by_bucket_controller = require('../../Controller/tweet/tweet_like_by_bucket_controller');
const protect_router = require('../identify_and_protect_router/protect_router');
const is_logged_in_router = require('../identify_and_protect_router/is_login_router');

const tweet_liked_by_router = express.Router({ mergeParams: true });

tweet_liked_by_router.post(
  '/add/user/:user_id',
  protect_router,
  tweet_like_by_bucket_controller.api_add_user_to_tweet_liked_by
);
tweet_liked_by_router.delete(
  '/remove/user/:user_id',
  protect_router,
  tweet_like_by_bucket_controller.api_remove_user_from_tweet_liked_by
);

tweet_liked_by_router.get(
  '/',
  is_logged_in_router,
  tweet_like_by_bucket_controller.api_get_tweet_liked_by_users
);

module.exports = tweet_liked_by_router;
