/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-syntax */
/* eslint-disable camelcase */
const mongoose = require('mongoose');
const TweetSchedule = require('../../Model/tweet/tweet_schedule_model');
const user_schedule_tweet_bucket_controller = require('./../user_activity/schedule_tweet_bucket_controller');
const try_catch = require('../../utils/tryCatchBlock');
const Tweet = require('../../Model/tweet/tweetModel');

const { create_comment } = require('../comment_controller');

exports.schedule_tweet = try_catch(async (user_id, tweet) => {
  const schedule_tweet = {
    _id: tweet._id,
    post_at: tweet.schedule_post_time,
    user_id: user_id,
    type: tweet.type,
  };
  return await TweetSchedule.create(schedule_tweet);
});

exports.delete_schedule_tweet = try_catch(async (tweet_id) => {
  await Tweet.findOneAndDelete({ _id: tweet_id });
});

exports.update_schedule_tweet = try_catch(
  async (tweet_id, schedule_post_time) =>
    await Tweet.findOneAndUpdate(
      { _id: tweet_id },
      {
        $set: {
          post_at: schedule_post_time,
        },
      }
    )
);

const retire_schedule_tweet = try_catch(async (doc_rec) => {
  // 1.update saved tweet in tweet collection (schedule=>post)
  // 2.delete schedule tweet from user bucket
  // 3.delete tweet from schedule transaction collection

  const { _id, user_id } = doc_rec;
  let { type } = doc_rec;
  let next, doc;


  // const user_tweet_doc = await UserActivity.findOne({user_id:})

  // 1.actually post the tweet
  const schedule_doc =
    await user_schedule_tweet_bucket_controller.get_schedule_doc(user_id, _id);


  if (type === 'schedule-text') type = 'text';
  else if (type === 'schedule-quote') type = 'quote';
  if (type === 'schedule-comment') type = 'comment';

  schedule_doc.schedule_post_time = undefined;
  schedule_doc.ts = new Date();
  schedule_doc._id = undefined;
  const user = await mongoose.model('user').findOne({ _id: user_id }).exec();

  if (type === 'text' || type === 'quote') {
    schedule_doc.user_id = user_id;
    schedule_doc.tweet_type = type;
    schedule_doc.user_details = user;
    schedule_doc.blocked_user_id_arr = user.blocked_user_id_arr;
    schedule_doc.muted_user_id_arr = user.muted_user_id_arr;
    schedule_doc.circle_user_id_arr = user.circle_user_id_arr;

    doc = await Tweet.create(schedule_doc);
  }

  if (type === 'comment') {
    schedule_doc.tweet_id = schedule_doc.posted_tweet._id;
    schedule_doc.posted_tweet = undefined;
    doc = await create_comment(user, schedule_doc, next);
  }


  // 2.delete schedule tweet from user bucket
  await user_schedule_tweet_bucket_controller.remove_tweet_from_schedule_bucket(
    user_id,
    _id
  );

  // 3.delete tweet from schedule transaction collection
  await TweetSchedule.findOneAndDelete({ _id });
});

exports.cleanup_schedule_tweets = try_catch((period = 3600 * 1000) => {
  setInterval(async () => {
    const schedule_tweets = await TweetSchedule.find({});
    const retire_tweets_arr = [];
    for (const tweet of schedule_tweets) {
      const { post_at } = tweet;
      const schedule_expire = +new Date() > +new Date(post_at);
      if (schedule_expire) {
        const retire_tweet = retire_schedule_tweet(tweet);
        retire_tweets_arr.push(retire_tweet);
      }
    }
    await Promise.all(retire_tweets_arr);
  }, period);
});
