/* eslint-disable camelcase */
const catchAsync = require('../utils/catchAsync');
const user_controller = require('./user/userController');
const news_controller = require('./news/news');

exports.set_side_news_or_to_follow_users_in_req = catchAsync(
  async (req, res, next) => {
    req.side_news = news_controller.get_multiple_news(4, 'business');
    req.to_follow_users = user_controller.get_most_followed_users(
      (req.user && req.user._id) || false,
      2,
      req.login_user
    );
    next();
  }
);
