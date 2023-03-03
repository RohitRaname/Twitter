/* eslint-disable camelcase */
const catchAsync = require('../../utils/catchAsync');
const user_activity = require('../../Model/user/user_acitivity_model');
const bucket_controller = require('../bucket_controller');
const AppError = require('../../utils/AppError');
const sendReq = require('../../utils/sendJSON');
const try_catch = require('../../utils/tryCatchBlock');

exports.block_tweet = try_catch(async (user_id, tweet_id) => {
  // 1.add tweet_id to user bookmark

  let result;

  result = await bucket_controller.add_doc_to_bucket(
    user_activity,
    'user_id',
    user_id,
    'block_tweet_id_arr',
    { _id: tweet_id },
    false
  );

  return result;
  //   return next(new AppError('tweet not added to user posted tweet', 500));
  //
  // return sendReq(res, 200, 'tweet added to user like tweets', { result });
});
exports.unblock_tweet = try_catch(async (user_id, tweet_id) => {
  // 1.add tweet_id to user bookmark

  let result;

  result = await bucket_controller.remove_doc_from_bucket(
    user_activity,
    'user_id',
    user_id,
    'block_tweet_id_arr',
    tweet_id,
    false
  );
  // if (!result) return next(new AppError('tweet not bookmarked', 500));
  return result;
  // return sendReq(res, 200, 'follow user', { result });
});

exports.get_user_blocked_tweet = try_catch(
  async (user_id, page = 0, limit) =>
    await bucket_controller.get_bucket_ref_latest_doc(
      user_activity,
      'tweets',
      limit,
      page,
      'user_id',
      user_id,
      'block_tweet_id_arr',
      {}
    )
);

exports.api_get_user_blocked_tweets = catchAsync(async (req, res, next) => {
  const user_tweets = await this.get_user_blocked_tweet(
    req.user._id,
    req.params.page,
    25
  );
  return sendReq(res, 200, 'user tweets', user_tweets);
});
exports.api_block_tweet = catchAsync(async (req, res, next) => {
  const user_tweets = await this.block_tweet(req.user._id, req.params.tweet_id);
  if (!user_tweets)
    return next(new AppError('tweet no added to user tweets', 500));
  return sendReq(res, 200, 'user tweets added ', user_tweets);
});
exports.api_unblock_tweet = catchAsync(async (req, res, next) => {
  const user_tweets = await this.unblock_tweet(
    req.user._id,
    req.params.tweet_id
  );
  if (!user_tweets)
    return next(new AppError('tweet no removed from user tweets', 500));
  return sendReq(res, 200, 'user tweets removed', user_tweets);
});
