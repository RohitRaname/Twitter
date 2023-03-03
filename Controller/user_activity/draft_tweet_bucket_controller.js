/* eslint-disable camelcase */
const catchAsync = require('../../utils/catchAsync');
const user_activity = require('../../Model/user/user_acitivity_model');
const bucket_controller = require('../bucket_controller');
const AppError = require('../../utils/AppError');
const sendReq = require('../../utils/sendJSON');
const try_catch = require('../../utils/tryCatchBlock');

exports.add_tweet_to_draft_bucket = try_catch(async (user_id, draft_tweet) => {
  // 1.add tweet_id to user bookmark

  let result;

  result = await bucket_controller.add_doc_to_bucket(
    user_activity,
    'user_id',
    user_id,
    'draft_tweets',
    draft_tweet,
    false
  );

  return result;
  //   return next(new AppError('tweet not added to user posted tweet', 500));
  //
  // return sendReq(res, 200, 'tweet added to user like tweets', { result });
});

exports.remove_tweet_from_draft_bucket = try_catch(
  async (user_id, tweet_id) => {
    // 1.add tweet_id to user bookmark

    let result;

    result = await bucket_controller.remove_doc_from_bucket(
      user_activity,
      'user_id',
      user_id,
      'draft_tweets',
      tweet_id,
      false
    );
    // if (!result) return next(new AppError('tweet not bookmarked', 500));
    return result;
    // return sendReq(res, 200, 'follow user', { result });
  }
);

exports.get_all_draft_tweets = try_catch(async (user_id) => {
  const docs = await bucket_controller.get_bucket_arr_field_all_docs(
    user_activity,
    'user_id',
    user_id,
    'draft_tweets'
  );

  return docs;
});

exports.api_get_all_docs = catchAsync(async (req, res, next) => {
  const draft_tweet = await this.get_all_draft_tweets(req.user._id);
  return sendReq(res, 200, 'draft tweets', draft_tweet);
});

exports.api_add_tweet_to_draft_bucket = catchAsync(async (req, res, next) => {
  const draft_tweets = await this.add_tweet_to_draft_bucket(
    req.user._id,
    req.params.tweet_id
  );
  if (!draft_tweets)
    return next(new AppError('tweet no added to draft tweets', 500));
  return sendReq(res, 200, 'draft tweets added ', draft_tweets);
});

exports.api_remove_tweet_from_draft_bucket = catchAsync(
  async (req, res, next) => {
    const draft_tweets = await this.remove_tweet_from_draft_bucket(
      req.user._id,
      req.params.tweet_id
    );
    if (!draft_tweets)
      return next(new AppError('draft tweet not removed', 500));
    return sendReq(res, 200, 'draft tweets removed', draft_tweets);
  }
);

exports.get_draft_doc = try_catch(

  async (user_id, tweet_id) =>
    await bucket_controller.get_bucket_embedded_doc(
      user_activity,
      'user_id',
      user_id,
      'draft_tweets',
      tweet_id
    )
);

exports.update_draft_doc = try_catch(async(user_id,tweet_id,update_tweet_obj)=>{
  await bucket_controller.update_bucket_doc(    user_activity,
    "user_id",
    user_id,
    "draft-tweets",
    tweet_id,
    update_tweet_obj
    )
})


exports.api_get_doc = catchAsync(async (req, res, next) => {
  const doc = await this.get_draft_doc(req.user._id, req.params.tweet_id);
  return sendReq(res, 200, 'doc', doc);
});
