/* eslint-disable camelcase */
const express = require('express');
const follower_controller = require('../../Controller/user_activity/followers_bucket_controller');
const protect_router= require('../identify_and_protect_router/protect_router')
const is_logged_in_router = require('../identify_and_protect_router/is_login_router')
const followingRouter = express.Router();

followingRouter.get('/:user_id/page/:page/limit/:limit', is_logged_in_router,follower_controller.api_get_followers);

module.exports = followingRouter;
