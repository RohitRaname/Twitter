/* eslint-disable camelcase */
const { default: mongoose } = require('mongoose');
const { get_most_followed_users } = require('../user/userController');
const user_activity = require('../../Model/user/user_acitivity_model');
const catchAsync = require('../../utils/catchAsync');

// suggest user that i can follow
exports.render_connect_people_page = catchAsync(async (req, res, next) => {
  const results = await Promise.all([
    get_most_followed_users(req.user._id, 25),
    req.side_news,
  ]);


  const [suggested_users_to_follow, side_news] = results;
  return res.render('pages/connect_people_page', {
    ...req.restrict_user,

    // news
    side_news: side_news,

    // recommend users to follow
    follow_users: suggested_users_to_follow,
    login_user: req.login_user,

  });
});
