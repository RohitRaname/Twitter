/* eslint-disable camelcase */
const express = require('express');
const comment_view_controller = require('../../Controller/view/comment_view_controller');
const tweet_view_controller = require('../../Controller/view/tweet_view_controller');
const user_controller = require('../../Controller/user/userController');

const tweet_router = express.Router();

tweet_router.get(
  '/:tweet_id/comments/:gallery_mode',
  comment_view_controller.get_tweet_comments_page
);

tweet_router.get(
  '/search/:search_word',
  tweet_view_controller.render_search_tweets
);

// tweet_router.get('/unsent/draft', unsent_tweet_controller.render_draft_tweets);

// tweet_router.get(
//   '/unsent/schedule',
//   unsent_tweet_controller.render_draft_schedule_tweets
// );

module.exports = tweet_router;

// tweet_view_router
