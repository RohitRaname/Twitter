/* eslint-disable camelcase */

const tweet_like_by = require('./tweet_liked_by_router');
const multer = require('../../utils/multer');

const refreshTokenController = require('../../Controller/refreshTokenController');
const tweetController = require('../../Controller/tweet/tweetController');

const comment_router = require('../comment_router');
const tweetRouter = require('express').Router();

const protect_router = require('../identify_and_protect_router/protect_router');
const is_logged_in_router = require('../identify_and_protect_router/is_login_router');


// get recent tweet for any user
tweetRouter.get('/recent/page/:page',is_logged_in_router, tweetController.admin_get_recent_tweets);

tweetRouter.use('/:tweet_id/comments', comment_router);

// get recent tweet for given user
tweetRouter.get(
  '/recent/user/:user_id/page/page',
  is_logged_in_router,
  tweetController.get_user_tweets
);

tweetRouter.use(protect_router)

// CREATE TWEET ---------------------------------------
tweetRouter.post(
  '/text',
  multer.single_field_with_multiple_imgs('upload_imgs', 4),
  tweetController.resizeImages,
  tweetController.form_basic_tweet_doc,
  tweetController.delete_unsent_tweet_if_posted,
  tweetController.create_text_tweet
);

tweetRouter.post(
  '/quote',
  multer.single_field_with_multiple_imgs('upload_imgs', 4),
  tweetController.resizeImages,
  tweetController.form_basic_tweet_doc,
  tweetController.delete_unsent_tweet_if_posted,
  tweetController.create_quote_tweet
);
tweetRouter.post(
  '/retweet/:tweet_id',
  tweetController.form_basic_tweet_doc,
  tweetController.create_retweet
);

tweetRouter.patch(
  '/unsent-tweet/:tweet_id',
  multer.single_field_with_multiple_imgs('upload_imgs', 4),
  tweetController.resizeImages,
  tweetController.update_unsent_tweet
);

// get tweets

// get users liked given tweet
// tweetRouter.get('/:tweet_id/page/:page',tweetLikeController.admin_get_users_which_liked_given_tweet)

tweetRouter.use('/:tweet_id/like-by', tweet_like_by);

tweetRouter.delete(
  '/:tweet_id/type/:tweet_type/',
  tweetController.api_delete_tweet
);

tweetRouter
  .route('/:id')
  .get(tweetController.get_tweet)

  .patch(tweetController.update_tweet);

tweetRouter
  .route('/')
  .get(tweetController.get_allTweets)
  .patch(tweetController.update_allTweets)
  .delete(tweetController.delete_allTweets);

module.exports = tweetRouter;
