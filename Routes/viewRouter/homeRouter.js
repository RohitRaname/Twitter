const express = require('express');
const homeViewController = require('../../Controller/view/tweet_view_controller');
const refreshTokenController = require('../../Controller/refreshTokenController');

const homeRouter = express.Router();

homeRouter.get(
  '/',
  homeViewController.getHomePage
);

module.exports = homeRouter;
