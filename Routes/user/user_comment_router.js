/* eslint-disable camelcase */
const express = require('express');
const user_comment_controller = require('../../Controller/user_activity/user_comment_bucket_controller');
const protect_router = require('../identify_and_protect_router/protect_router');
const is_logged_in_router = require('../identify_and_protect_router/is_login_router');


const user_comment_router = express.Router();

user_comment_router.get(
  '/user/:view_user_id/:page/:limit',
  is_logged_in_router,
  user_comment_controller.api_get_view_user_comments_and_modified_with_cur_user_interaction
);

// user_comment_router.post('/bookmark/:comment_id',)
// user_comment_router.post('/unbookmark/:comment_id')
// user_comment_router.post('/like/:comment_id')
// user_comment_router.post('/unlike/:comment_id')

module.exports = user_comment_router;
