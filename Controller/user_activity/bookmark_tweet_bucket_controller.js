/* eslint-disable camelcase */
const catchAsync = require('../../utils/catchAsync');
const user_activity = require('../../Model/user/user_acitivity_model');
const bucket_controller = require('../bucket_controller');
const AppError = require('../../utils/AppError');
const sendReq = require('../../utils/sendJSON');
const try_catch = require('../../utils/tryCatchBlock');

exports.bookmark_tweet = catchAsync(async (req, res, next) => {
  // 1.add tweet_id to user bookmark

  let result;
  const { tweet_id } = req.params;

  result = await bucket_controller.add_doc_to_bucket(
    user_activity,
    'user_id',
    req.user._id,
    'bookmark_tweet_id_arr',
    { _id: tweet_id },
    false
  );
  if (!result) return next(new AppError('tweet  already bookmarked', 500));

  return sendReq(res, 200, 'follow user', { result });
});
exports.unbookmark_tweet = catchAsync(async (req, res, next) => {
  // 1.add tweet_id to user bookmark

  let result;
  const { tweet_id } = req.params;

  result = await bucket_controller.remove_doc_from_bucket(
    user_activity,
    'user_id',
    req.user._id,
    'bookmark_tweet_id_arr',
    tweet_id,
    false
  );
  if (!result) return next(new AppError('tweet already  unbookmarked', 500));

  return sendReq(res, 200, 'follow user', { result });
});

exports.get_bookmarked_tweets = try_catch(
  async (user_id,limit, page = 0) =>
    await bucket_controller.get_bucket_ref_latest_doc(
      user_activity,
      'tweets',
      limit,
      page,
      'user_id',
      user_id,
      'bookmark_tweet_id_arr',
      {}
    )
);
exports.remove_all_bookmarks = try_catch(
  async (user_id) =>
    await bucket_controller.remove_bucket_arr_all_docs(
      user_activity,
      "user_id",
      user_id,
      'bookmark_tweet_id_arr',
      false
    )
);

exports.api_get_bookmark_tweets = catchAsync(async (req, res, next) => {
  const bookmark_users = await this.get_bookmarked_tweets(
    req.user._id,
    req.params.limit,
    req.params.page
  );
  return sendReq(res, 200, 'bookmarked_tweets', bookmark_users);
});

exports.api_remove_all_bookmarks = catchAsync(async (req, res, next) => {
 await this.remove_all_bookmarks(req.user._id)
  return sendReq(res, 200);
});