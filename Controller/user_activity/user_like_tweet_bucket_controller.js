/* eslint-disable camelcase */
const user_activity = require('../../Model/user/user_acitivity_model');
const Tweet = require('../../Model/tweet/tweetModel');

const AppError = require('../../utils/AppError');
const sendReq = require('../../utils/sendJSON');
const try_catch = require('../../utils/tryCatchBlock');
const catchAsync = require('../../utils/catchAsync');

const tweet_controller = require('../tweet/tweetController');
const bucket_controller = require('../bucket_controller');
const tweet_like_by_bucket_controller = require('../tweet/tweet_like_by_bucket_controller');
const notification_controller = require('../user/user_notification_controller');

exports.add_tweet_id_to_user_like_tweets = try_catch(
  async (cur_user, tweet_id) => {
    const add_tweet_to_liked_tweets = bucket_controller.add_doc_to_bucket(
      user_activity,
      'user_id',
      cur_user._id,
      'like_tweet_id_arr',
      { _id: tweet_id },
      true,
      cur_user._id,
      'liked_tweets_count'
    );

    // find tweet user id
    const tweet = await Tweet.findOne({ _id: tweet_id }).exec();

    let notify_liked_tweet_user;


    if (tweet.user_id.toString() !== cur_user._id.toString()) {
      // send like notification to user which tweet get liked
      const like_notification = {
        _id: tweet._id,
        type: 'like-tweet',
        user: {
          _id: cur_user._id,
          avatar: cur_user.avatar,
          name: cur_user.name,
          profilePic: cur_user.profilePic,
        },
        text: tweet.text,
      };


      notify_liked_tweet_user = notification_controller.create_notification(
        tweet.user_id,
        like_notification
      );
    }

    await Promise.all([add_tweet_to_liked_tweets, notify_liked_tweet_user]);
  }
);

exports.remove_tweet_id_from_user_like_tweets = try_catch(
  async (user_id, tweet_id) =>
    await bucket_controller.remove_doc_from_bucket(
      user_activity,
      'user_id',
      user_id,
      'like_tweet_id_arr',
      tweet_id,
      true,
      user_id,
      'liked_tweets_count'
    )
);

exports.get_like_tweets = try_catch(
  async (login_user, user_id, page = 0, limit) => {
    let user_activity_on_tweets;
    if (login_user) {
      const result = await Promise.all([
        bucket_controller.get_bucket_ref_latest_doc(
          user_activity,
          'tweets',
          limit,
          page,
          'user_id',
          user_id,
          'like_tweet_id_arr',
          {}
        ),
        user_activity.find({ user_id: user_id }),
      ]);

      const [tweets, user_activity_docs] = result;

      user_activity_on_tweets = tweets.map((tweet) =>
        tweet_controller.filter_visible_tweets_and_set_user_interaction_field_in_tweets(
          user_activity_docs,
          tweet,
          user_id
        )
      );

      user_activity_on_tweets = await Promise.all(user_activity_on_tweets);
    } else {
      user_activity_on_tweets = bucket_controller.get_bucket_ref_latest_doc(
        user_activity,
        'tweets',
        limit,
        page,
        'user_id',
        user_id,
        'like_tweet_id_arr',
        {}
      );
    }

    return user_activity_on_tweets;
  }
);

exports.api_get_like_tweets = catchAsync(async (req, res, next) => {
  const like_tweets = await this.get_like_tweets(
    req.login_user,
    req.params.user_id,
    req.params.page,
    25
  );

  return sendReq(res, 200, 'liked_tweets', like_tweets);
});

exports.like_tweet = catchAsync(async (req, res, next) => {
  const { tweet_id } = req.params;
  const user_id = req.user._id;

  let result;

  // 1.add user_id(liked) to tweet_liked_bucket
  result = await tweet_like_by_bucket_controller.add_user_to_tweet_liked_by(
    req.user,
    tweet_id
  );

  if (!result) return next(new AppError('you already liked the tweet', 400));

  // 2.increase tweet like count (so tweet know which user liked it)
  await tweet_controller.update_tweet_like_count(tweet_id, 1);

  // 3.add tweet_id to user_like_tweets_bucket and update user total likes
  await this.add_tweet_id_to_user_like_tweets(req.user, tweet_id);

  return sendReq(res, 200, 'tweet like', result);
});
exports.unlike_tweet = catchAsync(async (req, res, next) => {
  let result;
  const { tweet_id } = req.params;
  const user_id = req.user._id;

  // 1.add user_id(liked) to tweet_liked_bucket
  result =
    await tweet_like_by_bucket_controller.remove_user_from_tweet_liked_by(
      req.user._id,
      tweet_id
    );

  if (!result) return next(new AppError('you already dislike the tweet ', 400));

  // 2.increase tweet like count (so tweet know which user liked it)
  await tweet_controller.update_tweet_like_count(tweet_id, -1);

  // 3.add tweet_id to user_like_tweets_bucket
  await this.remove_tweet_id_from_user_like_tweets(user_id, tweet_id);

  return sendReq(res, 200, 'tweet like removed', result);
});
