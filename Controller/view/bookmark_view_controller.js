/* eslint-disable no-restricted-syntax */
/* eslint-disable camelcase */
const catchAsync = require('../../utils/catchAsync');
const bookmark_tweet_controller = require('../user_activity/bookmark_tweet_bucket_controller');
const {
  filter_and_set_permission_fields_and_group_tweets,
} = require('../tweet/tweetController');
const UserActivity = require('../../Model/user/user_acitivity_model');

// Group by the day a task is due

exports.render_bookmark_page = catchAsync(async (req, res, next) => {
  let visible_tweets = [];
  const user_id = req.user._id;

  const get_bookmark_docs = bookmark_tweet_controller.get_bookmarked_tweets(
    user_id,
    25,
    0
  );
  const get_user_activity_docs = UserActivity.find({ user_id: user_id });

  const [tweets, activity_docs, side_news, to_follow_users] = await Promise.all(
    [
      get_bookmark_docs,
      get_user_activity_docs,
      req.side_news,
      req.to_follow_users,
    ]
  );

  visible_tweets = await filter_and_set_permission_fields_and_group_tweets(
    activity_docs,
    user_id,
    tweets
  );

  // bind multiple tweets into group so we can show connnection by joiining a track line
  // recent_tweets = recent_tweets.

  return res.render('pages/bookmark_page', {
    ...req.restrict_user,
    side_news,
    to_follow_users,
    // tweets
    tweets: visible_tweets,

    login_user: req.login_user,
  });
});
