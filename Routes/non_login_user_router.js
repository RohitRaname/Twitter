/* eslint-disable camelcase */
const express = require('express');
const non_login_user_controller = require('../Controller/non_user_controller');
const non_login_user_router = express.Router();
const helper_controller = require('../Controller/helper_controller')

non_login_user_router.get(
  '/users/search/:search_word/:limit',
  helper_controller.set_side_news_or_to_follow_users_in_req,
  non_login_user_controller.api_search_users
);

module.exports = non_login_user_router;
