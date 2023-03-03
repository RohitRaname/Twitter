/* eslint-disable camelcase */
const express = require('express');
const news_controller = require('../Controller/news/news');
const news_router = express.Router();
const is_logged_in_router = require('./identify_and_protect_router/is_login_router');


news_router.get(
  '/:category/:page/:limit',
  is_logged_in_router,
  news_controller.api_get_multiple_news
);

module.exports = news_router;
