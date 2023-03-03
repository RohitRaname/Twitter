/* eslint-disable camelcase */
const TweetLikes = require('../../Model/tweet/tweet_like_by_model');
const AppError = require('../../utils/AppError');
const try_catch = require('../../utils/tryCatchBlock');
const bucket_controller = require('../bucket_controller');
// const userLikeController = require('../userInteraction/userLikedTweetController');
const sendReq = require('../../utils/sendJSON');
const catchAsync = require('../../utils/catchAsync');

exports.add_user_to_tweet_liked_by = try_catch(async (user, tweet_id) => {
  // 1.add tweet_id to user bookmark

  let result;

  return await bucket_controller.add_doc_to_bucket(
    TweetLikes,
    'tweet_id',
    tweet_id,
    'users',
    user,
    false
  );
});

exports.remove_user_from_tweet_liked_by = try_catch(
  async (user_id, tweet_id) => {
    // 1.add tweet_id to user bookmark

    let result;

    result = await bucket_controller.remove_doc_from_bucket(
      TweetLikes,
      'tweet_id',
      tweet_id,
      'users',
      user_id,
      false
    );
    return result;
  }
);

exports.get_tweet_liked_by_users = try_catch(
  async (tweet_id, page = 0, limit) =>
    await bucket_controller.get_bucket_embedded_latest_doc(
      TweetLikes,
      25,
      page,
      'tweet_id',
      tweet_id,
      'users',
      {}
    )
);

exports.api_add_user_to_tweet_liked_by = try_catch(async (req, res, next) => {
  const result = await this.add_user_to_tweet_liked_by(
    req.user,
    req.params.tweet_id
  );

  if (!result)
    return next(new AppError('user not added to tweet liked user', 500));

  return sendReq(res, 200, 'used added to tweet liked users', result);
});
exports.api_remove_user_from_tweet_liked_by = try_catch(
  async (req, res, next) => {
    const result = await this.remove_user_from_tweet_liked_by(
      req.user._id,
      req.params.tweet_id
    );
    if (!result)
      return next(new AppError('user not removed to tweet liked user', 500));

    return sendReq(res, 200, 'used removed to tweet liked users', result);
  }
);

exports.api_get_tweet_liked_by_users = catchAsync(async (req, res, next) => {
  let result = await this.get_tweet_liked_by_users(
    req.params.tweet_id,
    req.params.page,
    25
  );

  return sendReq(res, 200, 'tweet liked user', result);
});
