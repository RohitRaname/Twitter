/* eslint-disable camelcase */
const express = require('express');
const news_views_controller = require('../../Controller/view/news_view_controller');

const news_view_router = express.Router();

news_view_router.get(
  '/explore/:category',
  news_views_controller.render_explore_news
);
news_view_router.get(
  '/explore/:category/:search_word',

  news_views_controller.render_search_news
);
// news_view_router.get('/:index', news_views_controller.render_news_page);

module.exports = news_view_router;
