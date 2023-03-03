
/* eslint-disable camelcase */
const express = require('express');

// router
const userRouter = require('./userRouter');
const circle_router = require('./circle_router');
const follow_router = require('./follow_router');
const follower_router = require('./follower_router');
const user_like_tweet_router = require('./userLikedTweetRouter');
const bookmark_tweet_router = require('./bookmark_tweet_router');
const user_tweet_router = require('./user_tweet_router');
const user_mute_router = require('./user_mute_router');
const user_block_router = require('./user_block_router');
const user_draft_tweet_router = require('./draft_tweet_router');
const user_schedule_tweet_router = require('./schedule_tweet_router');
const block_tweet_router = require('./block_tweet_router');
const user_comment_router = require('./user_comment_router');
const search_keywords_router = require('./search_keyword_router');

const protect_router = require('../identify_and_protect_router/protect_router');

// bucket to add notification user or remove
const notification_router = require('./notification_router');

const userBaseRouter = express.Router();
// User Router

// api/v1/users/:user_id/following
// api/v1/users/:user_id/followers
// api/v1/users/:user_id/tweets

userBaseRouter.use('/following', follow_router);
userBaseRouter.use('/followers', follower_router);
userBaseRouter.use('/circle', circle_router);

// user tweet bucket carry user tweet id
userBaseRouter.use('/tweets', user_tweet_router);
// add liked tweet id to user bucket
userBaseRouter.use('/like-tweets', user_like_tweet_router);
userBaseRouter.use('/comments', user_comment_router);

// add delete , get previous search keywords
userBaseRouter.use('/search-keywords', search_keywords_router);

userBaseRouter.use('/mute-user', protect_router, user_mute_router);
userBaseRouter.use('/bookmark-tweets', protect_router, bookmark_tweet_router);
userBaseRouter.use('/block-user', protect_router, user_block_router);
userBaseRouter.use('/draft-tweets', protect_router, user_draft_tweet_router);
userBaseRouter.use(
  '/schedule-tweets',
  protect_router,
  user_schedule_tweet_router
);
userBaseRouter.use('/notifications', protect_router, notification_router);
userBaseRouter.use('/block-tweet', protect_router, block_tweet_router);
userBaseRouter.use('/', userRouter);

module.exports = userBaseRouter;
