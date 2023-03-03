/* eslint-disable camelcase */
const express = require('express');

const user_controller = require('../../Controller/user/userController');
// controller -----------------------
const refreshTokenController = require('../../Controller/refreshTokenController');
const helper_controller = require('../../Controller/helper_controller');

const is_logged_in_router = express.Router();

is_logged_in_router.use(
  refreshTokenController.isLoggedIn,
  refreshTokenController.addTokenIfNeeded,
  user_controller.set_restrict_user,
  helper_controller.set_side_news_or_to_follow_users_in_req
);

module.exports =is_logged_in_router;