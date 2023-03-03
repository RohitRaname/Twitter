/* eslint-disable camelcase */
const catchAsync = require('../../utils/catchAsync');
const tweetController = require('../tweet/tweetController');
const { get_multiple_news } = require('../news/news.js');
const { get_most_followed_users } = require('../user/userController');

const UserActivity = require('../../Model/user/user_acitivity_model');

// Group by the day a task is due

exports.getHomePage = catchAsync(async (req, res, next) => {

  let result = await Promise.all([
    tweetController.get_recent_tweets_and_user_activity_docs(req),
    get_multiple_news(4, 'business'),
    get_most_followed_users(req.user._id, 2),
  ]);

  const [docs, side_news, follow_users] = result;

  const { recent_tweets, total_circle_users, search_keywords } = docs;

  // bind multiple tweets into group so we can show connnection by joiining a track line
  // recent_tweets = recent_tweets.

  return res.render('pages/home/home.pug', {
    ...req.restrict_user,

    // news
    side_news: side_news,

    // recommend users to follow
    to_follow_users: follow_users,

    // tweets
    tweets: recent_tweets,
    total_circle_users: total_circle_users,
    search_keywords,

    login_user: req.login_user,

    page:"home"
  });
});

exports.render_search_tweets = catchAsync(async (req, res, next) => {
  const user_id = req.user?._id;
  const { search_word } = req.params;

  let visible_tweets;
  const query = tweetController.search_tweets(search_word, 0, 25);

  let search_tweets = req.login_user ? query : await query;

  const user_activity_docs = req.login_user
    ? UserActivity.find({ user_id })
    : [];

  const [tweets, activity_docs] = await Promise.all([
    search_tweets,
    user_activity_docs,
  ]);

  visible_tweets =
    await tweetController.filter_and_set_permission_fields_and_group_tweets(
      activity_docs,
      user_id,
      tweets
    );

  return res.render('pages/search_tweets_page', {
    login_user: req.login_user,

    tweets: visible_tweets,
    ...req.restrict_user,
  });
});
