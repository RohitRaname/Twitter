/* eslint-disable camelcase */
const try_catch = require('../utils/tryCatchBlock');
const user_controller = require('./user/userController');
const sendReq = require('../utils/sendJSON');
const { readable_time } = require('../utils/helperFunction');
const {get_25_tweets,groupBy_multiple_or_single_tweets} = require('./user_activity/user_posted_tweet_bucket_controller');
exports.api_search_users = try_catch(async (req, res) => {
  const { limit, search_word } = req.params;
  const search_user_docs = await user_controller.return_search_users(
    search_word,
    limit
  );
  return sendReq(res, 200, 'search_users', search_user_docs);
});

exports.get_user_profile_data = try_catch(
  async (profile_user_id, page, profile_user_pinned_tweetid_arr) => {
    // profile_user_id => user stared by cur user

    let visible_tweets = [];
    let only_tweet_with_upload_imgs = [];

    visible_tweets = await get_25_tweets(profile_user_id, page);

    visible_tweets = await Promise.all(visible_tweets);

    visible_tweets = visible_tweets.filter((visible_tweet) => visible_tweet);

    // adding ts_format prop
    visible_tweets = visible_tweets.map((el) => {
      el.ts_format = readable_time(el.ts);
      return el;
    });

    // for user profile sidebar img (we get imgs from tweets)
    only_tweet_with_upload_imgs = visible_tweets
      .filter((tweet) => tweet.upload_imgs.length > 0)
      .map((tweet) => ({
        _id: tweet._id,
        upload_imgs: tweet.upload_imgs,
      }));

    const only_tweet_with_upload_imgs_arr = [];
    only_tweet_with_upload_imgs.forEach((tweet) => {
      const imgs = tweet.upload_imgs;
      if (!imgs.length > 0) return;
      imgs.forEach((img) => {
        only_tweet_with_upload_imgs_arr.push({
          _id: tweet._id,
          upload_imgs: img,
        });
      });
    });

    // posted_tweets that are not pinned
    visible_tweets = visible_tweets.filter((tweet) => {
      if (profile_user_pinned_tweetid_arr.length === 0) return tweet;

      if (
        profile_user_pinned_tweetid_arr.length > 0 &&
        profile_user_pinned_tweetid_arr.some(
          (el) => el === tweet._id.toString()
        )
      )
        return false;

      return tweet;
    });

    visible_tweets = visible_tweets.sort(
      (a, b) => new Date(b.ts) - new Date(a.ts)
    );

    visible_tweets = groupBy_multiple_or_single_tweets(
      visible_tweets,
      (item) =>
        `${item.user_id}-${new Date(item.ts).getDay()}-${new Date(
          item.ts
        ).getHours()}-${new Date(item.ts).getMinutes()}-${new Date(
          item.ts
        ).getSeconds()}`
    );

    return {
      tweets: visible_tweets || [],
      page: page || 0,
      only_tweet_with_upload_imgs_arr: only_tweet_with_upload_imgs_arr || [],
    };

    // return visible_tweets;
  }
);
