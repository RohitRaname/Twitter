/* eslint-disable camelcase */
const express = require('express');
const circle_controller = require('../../Controller/user_activity/circle_bucket_controller');
const protect_router= require('../identify_and_protect_router/protect_router')
const is_logged_in_router = require('../identify_and_protect_router/is_login_router')
const circle_router = express.Router();

circle_router.get('/my-circle/page/:page/limit/:limit', is_logged_in_router,circle_controller.api_get_circle_users);

circle_router.get('/recommend-circle/:name/page/:page/limit/:limit',is_logged_in_router,circle_controller.get_recommend_users)

circle_router.use(protect_router)
circle_router.post('/add/user/:user_id', circle_controller.add_user_to_circle);
circle_router.delete(
  '/remove/user/:user_id',
  circle_controller.remove_user_from_circle
);
// circle_router.get(
//   '/user/:user_id/page/:page',
//   circle_controller.api_get_bookmark_tweets
// );

module.exports = circle_router;
