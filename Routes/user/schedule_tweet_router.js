/* eslint-disable camelcase */
const express = require('express');
const schedule_tweet_controller = require('../../Controller/user_activity/schedule_tweet_bucket_controller');

const schedule_tweet_router = express.Router();

schedule_tweet_router.post(
  '/add/tweet/:tweet_id',
  schedule_tweet_controller.api_add_tweet_to_schedule_bucket
);
schedule_tweet_router.delete(
  '/remove/tweet/:tweet_id',
  schedule_tweet_controller.api_remove_tweet_from_schedule_bucket
);
schedule_tweet_router.get('/:tweet_id', schedule_tweet_controller.api_get_doc);
schedule_tweet_router.get('/', schedule_tweet_controller.api_get_all_schedule_tweets);


module.exports  = schedule_tweet_router;