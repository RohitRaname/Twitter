/* eslint-disable camelcase */
const express = require('express');
const other_view_controller = require('../../Controller/view/other_view_controller');
const other_view_router = express.Router();
const helper_controller = require('../../Controller/helper_controller')

other_view_router.get(
  '/connect-people',
  other_view_controller.render_connect_people_page
);


module.exports = other_view_router;
