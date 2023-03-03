/* eslint-disable camelcase */
const catchAsync = require('../../utils/catchAsync');
const user_activity = require('../../Model/user/user_acitivity_model');
const bucket_controller = require('../bucket_controller');
const AppError = require('../../utils/AppError');
const sendReq = require('../../utils/sendJSON');
const try_catch = require('../../utils/tryCatchBlock');

exports.add_tweet_to_schedule_bucket = try_catch(
  async (user_id, schedule_tweet) => {
    // 1.add tweet_id to user bookmark

    let result;

    result = await bucket_controller.add_doc_to_bucket(
      user_activity,
      'user_id',
      user_id,
      'schedule_tweets',
      schedule_tweet,
      false
    );

    return result;
    //   return next(new AppError('tweet not added to user posted tweet', 500));
    //
    // return sendReq(res, 200, 'tweet added to user like tweets', { result });
  }
);

exports.remove_tweet_from_schedule_bucket = try_catch(
  async (user_id, tweet_id) => {
    // 1.add tweet_id to user bookmark

    let result;

    result = await bucket_controller.remove_doc_from_bucket(
      user_activity,
      'user_id',
      user_id,
      'schedule_tweets',
      tweet_id,
      false
    );
    // if (!result) return next(new AppError('tweet not bookmarked', 500));
    return result;
    // return sendReq(res, 200, 'follow user', { result });
  }
);

exports.get_all_schedule_tweets = try_catch(async (user_id) => {
  const res = await bucket_controller.get_bucket_arr_field_all_docs(
    user_activity,
    'user_id',
    user_id,
    'schedule_tweets'
  );

  return res;
});

exports.api_get_all_schedule_tweets = catchAsync(async (req, res, next) => {
  const schedule_tweet = await this.get_all_schedule_tweets(req.user._id);
  return sendReq(res, 200, 'schedule tweets', schedule_tweet);
});

exports.api_add_tweet_to_schedule_bucket = catchAsync(
  async (req, res, next) => {
    const schedule_tweets = await this.add_tweet_to_schedule_bucket(
      req.user._id,
      req.params.tweet_id
    );
    if (!schedule_tweets)
      return next(new AppError('tweet no added to schedule tweets', 500));
    return sendReq(res, 200, 'schedule tweets added ', schedule_tweets);
  }
);

exports.api_remove_tweet_from_schedule_bucket = catchAsync(
  async (req, res, next) => {
    const schedule_tweets = await this.remove_tweet_id_from_schedule_tweets(
      req.user._id,
      req.params.tweet_id
    );
    if (!schedule_tweets)
      return next(new AppError('schedule tweet not removed', 500));
    return sendReq(res, 200, 'schedule tweets removed', schedule_tweets);
  }
);

exports.get_schedule_doc = try_catch(
  async (user_id, tweet_id) =>
    await bucket_controller.get_bucket_embedded_doc(
      user_activity,
      'user_id',
      user_id,
      'schedule_tweets',
      tweet_id
    )
);

exports.update_schedule_doc = try_catch(
  async (user_id, tweet_id, update_tweet_obj) => {
    await bucket_controller.update_bucket_doc(
      user_activity,
      'user_id',
      user_id,
      'schedule-tweets',
      tweet_id,
      update_tweet_obj
    );
  }
);

exports.api_get_doc = catchAsync(async (req, res, next) => {
  const doc = await this.get_schedule_doc(req.user._id, req.params.tweet_id);
  return sendReq(res, 200, 'doc', doc);
});
