/* eslint-disable camelcase */
const express = require('express');
const bookmark_view_controller = require('../../Controller/view/bookmark_view_controller');
const helper_controller = require('../../Controller/helper_controller');


const bookmark_view_router = express.Router();

bookmark_view_router.get(
  '/',

  bookmark_view_controller.render_bookmark_page
);


module.exports = bookmark_view_router;
