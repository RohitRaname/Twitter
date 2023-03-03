/* eslint-disable camelcase */
const express = require('express');
const user_profile_controller = require('../../Controller/view/user_profile_view_controller');
const user_profile_router = express.Router();
const helper_controller = require('../../Controller/helper_controller');

user_profile_router.get(
  '/:avatar',

  user_profile_controller.render_user_profile
);

// // circle
// user_profile_router.get(
//   '/circle/my-circle',
//   circle_view_controller.render_my_circle
// );

// user_profile_router.get(
//   '/circle/recommend-circle',
//   circle_view_controller.render_recommend_circle
// );

module.exports = user_profile_router;
