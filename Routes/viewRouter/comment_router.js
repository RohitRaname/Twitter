/* eslint-disable camelcase */
const express = require('express');
const commentViewController = require('../../Controller/view/comment_view_controller');
const refreshTokenController = require('../../Controller/refreshTokenController');
const helper_controller= require('../../Controller/helper_controller')

const commentRouter = express.Router();

commentRouter.get(
  '/:comment_id/replies/:gallery_mode',
  helper_controller.set_side_news_or_to_follow_users_in_req,
  commentViewController.get_comment_replies_page
);

module.exports = commentRouter;
