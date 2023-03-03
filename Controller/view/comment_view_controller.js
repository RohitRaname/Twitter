/* eslint-disable camelcase */
const catchAsync = require('../../utils/catchAsync');
const comment_controller = require('../comment_controller');
const tweet_controller = require('../tweet/tweetController');
const UserActivity = require('../../Model/user/user_acitivity_model');
const user_comment_controller = require('../user_activity/user_comment_bucket_controller');

exports.get_tweet_comments_page = catchAsync(async (req, res, next) => {
  const { tweet_id, gallery_mode } = req.params;

  let [tweet, comments, side_news, to_follow_users] = await Promise.all([
    tweet_controller.return_get_tweet(tweet_id),
    comment_controller.get_tweet_comments(tweet_id, 0, 25),
    req.side_news,
    req.to_follow_users,
  ]);

  if (req.login_user) {
    const user_id = req.user._id;
    const cur_user_activity_docs = await UserActivity.find({ user_id });

    const [tweet_with_user_interaction, comments_with_user_interaction] =
      await Promise.all([
        tweet_controller.filter_visible_tweets_and_set_user_interaction_field_in_tweets(
          cur_user_activity_docs,
          tweet,
          user_id
        ),
        user_comment_controller.set_cur_user_interaction_with_given_comments(
          cur_user_activity_docs,
          comments
        ),
      ]);

    tweet = tweet_with_user_interaction;
    comments = comments_with_user_interaction;
  }

  console.log(tweet);
  // get tweets_comments

  res.render('pages/comment/comment.pug', {
    login_user: req.login_user,
    gallery_mode: gallery_mode,
    page: 'comment',
    page_type: 'tweet_and_comments',

    tweet: tweet,
    comments: comments,
    side_news: side_news,
    to_follow_users: to_follow_users,
    ...req.restrict_user,
  });
});

exports.get_comment_replies_page = catchAsync(async (req, res, next) => {
  const { comment_id, page, gallery_mode } = req.params;

  const comment = comment_controller.get_comment(comment_id);
  const replies = comment_controller.get_comment_replies(
    comment_id,
    page || 0,
    25
  );

  const result = await Promise.all([
    comment,
    replies,
    req.side_news,
    req.to_follow_users,
  ]);

  return res.render('pages/comment/comment.pug', {
    login_user: req.login_user,
    gallery_mode: gallery_mode,
    page: 'comment',
    page_type: 'comment_and_replies',

    comment: result[0],
    comments: result[1],
    side_news: result[2],
    to_follow_users: result[3],
    ...req.restrict_user,
  });
});
