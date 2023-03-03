/* eslint-disable camelcase */
const express = require('express');

const user_controller = require('../../Controller/user/userController');
// controller -----------------------
const refreshTokenController = require('../../Controller/refreshTokenController');
const helper_controller = require('../../Controller/helper_controller');

const protect_router = express.Router();

protect_router.use(
  refreshTokenController.protect,
  refreshTokenController.addTokenIfNeeded,
  user_controller.set_restrict_user,
  helper_controller.set_side_news_or_to_follow_users_in_req
);

module.exports =protect_router;