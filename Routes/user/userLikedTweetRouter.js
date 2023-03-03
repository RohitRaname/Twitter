/* eslint-disable camelcase */
const express = require('express');
const user_like_tweet_controller = require('../../Controller/user_activity/user_like_tweet_bucket_controller');
const protect_router= require('../identify_and_protect_router/protect_router')
const is_logged_in_router = require('../identify_and_protect_router/is_login_router')
const user_like_tweet_router = express.Router();

user_like_tweet_router.get(
  '/:user_id/:page',is_logged_in_router,
  user_like_tweet_controller.api_get_like_tweets
);

user_like_tweet_router.use(protect_router)

user_like_tweet_router.post(
  '/add/tweet/:tweet_id',
  user_like_tweet_controller.like_tweet
);
user_like_tweet_router.delete(
  '/remove/tweet/:tweet_id',
  user_like_tweet_controller.unlike_tweet
);


module.exports = user_like_tweet_router;
