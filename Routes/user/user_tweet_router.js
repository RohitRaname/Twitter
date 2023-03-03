/* eslint-disable camelcase */
const express = require('express');
const user_tweet_controller = require('../../Controller/user_activity/user_posted_tweet_bucket_controller');
const protect_router = require('../identify_and_protect_router/protect_router');
const is_logged_in_router = require('../identify_and_protect_router/is_login_router');
const user_tweet_router = express.Router();

user_tweet_router.get(
  '/:view_user_id/:page',
  is_logged_in_router,
  user_tweet_controller.api_get_visible_tweets
);

// pinned tweet

user_tweet_router.use(protect_router);
user_tweet_router.post(
  '/add/:tweet_id',
  user_tweet_controller.api_add_tweet_id_to_user_tweets
);
user_tweet_router.delete(
  '/remove/:tweet_id/:tweet_type',
  user_tweet_controller.api_remove_tweet_id_from_user_tweets
);

user_tweet_router.post(
  '/pin/add/:tweet_id',
  user_tweet_controller.api_pinned_tweet
);
user_tweet_router.delete(
  '/pin/remove/:tweet_id',
  user_tweet_controller.api_unpinned_tweet
);

module.exports = user_tweet_router;
