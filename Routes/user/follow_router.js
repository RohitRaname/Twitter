/* eslint-disable camelcase */
const express = require('express');
const followingController = require('../../Controller/user_activity/follow_bucket_controller');
const protect_router= require('../identify_and_protect_router/protect_router')
const is_logged_in_router = require('../identify_and_protect_router/is_login_router')

const followingRouter = express.Router();

followingRouter.get(
  '/:user_id/page/:page/limit/:limit',
  is_logged_in_router,
  followingController.api_get_following_users
);

followingRouter.use(protect_router)

followingRouter.post('/follow/:user_id',followingController.follow_user);
followingRouter.delete('/unfollow/:user_id',followingController.unfollow_user);

// cur user

// other user

module.exports = followingRouter;
