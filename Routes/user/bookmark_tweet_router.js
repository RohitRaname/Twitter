/* eslint-disable camelcase */
const express = require('express');
const bookmark_tweet_controller = require('../../Controller/user_activity/bookmark_tweet_bucket_controller');


const bookmark_tweet_router = express.Router();

bookmark_tweet_router.post(
  '/add/tweet/:tweet_id',
  bookmark_tweet_controller.bookmark_tweet
);
bookmark_tweet_router.delete(
  '/remove/tweet/:tweet_id',
  bookmark_tweet_controller.unbookmark_tweet
);
bookmark_tweet_router.delete(
  '/remove-all',
  bookmark_tweet_controller.api_remove_all_bookmarks
);

bookmark_tweet_router.get(
  '/page/:page',
  bookmark_tweet_controller.api_get_bookmark_tweets
);

module.exports = bookmark_tweet_router;
