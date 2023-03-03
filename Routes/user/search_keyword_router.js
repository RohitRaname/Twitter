/* eslint-disable camelcase */
const express = require('express');
const base_activity_controller = require('../../Controller/user_activity/base_activity_controller');
const protect_router = require('../identify_and_protect_router/protect_router');
const is_logged_in_router = require('../identify_and_protect_router/is_login_router');
const search_keyword_router = express.Router();

// return keywords previous search
search_keyword_router.get(
  '/page/:page/limit/:limit',
  is_logged_in_router,
  base_activity_controller.api_get_embedded_docs('search_keywords')
);

search_keyword_router.use(protect_router);

search_keyword_router.post(
  '/add',
  base_activity_controller.api_add_doc('search_keywords')
);
search_keyword_router.delete(
  '/remove/:id',
  base_activity_controller.api_remove_doc('search_keywords')
);
search_keyword_router.delete(
  '/remove-all/',
  base_activity_controller.api_remove_all_docs('search_keywords')
);

module.exports = search_keyword_router;
