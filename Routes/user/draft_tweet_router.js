/* eslint-disable camelcase */
const express = require('express');
const draft_tweet_controller = require('../../Controller/user_activity/draft_tweet_bucket_controller');

const draft_tweet_router = express.Router();

draft_tweet_router.post(
  '/add/tweet/:tweet_id',
  draft_tweet_controller.api_add_tweet_to_draft_bucket
);
draft_tweet_router.delete(
  '/remove/tweet/:tweet_id',
  draft_tweet_controller.api_remove_tweet_from_draft_bucket
);
draft_tweet_router.get('/:tweet_id', draft_tweet_controller.api_get_doc);
draft_tweet_router.get('/', draft_tweet_controller.api_get_all_docs);

module.exports = draft_tweet_router;
