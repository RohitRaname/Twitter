/* eslint-disable camelcase */
const express = require('express');
const non_login_user_view_controller = require('../../Controller/view/non_login_user_view_controller');

const non_login_user_view_router = express.Router();

non_login_user_view_router.get(
  '/explore/:category',
  non_login_user_view_controller.render_home_page
);
non_login_user_view_router.get(
  '/explore/:category/:search_word',
  non_login_user_view_controller.render_click_news
);

non_login_user_view_router.get(
  '/users/:avatar',
  non_login_user_view_controller.render_user_profile
);

module.exports = non_login_user_view_router;
