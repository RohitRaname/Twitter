/* eslint-disable camelcase */
const mongoose = require('mongoose');

const catchAsync = require('../../utils/catchAsync');
const user_activity = require('../../Model/user/user_acitivity_model');
const bucket_controller = require('../bucket_controller');
const AppError = require('../../utils/AppError');
const sendReq = require('../../utils/sendJSON');
const { readable_time } = require('../../utils/helperFunction');
const try_catch = require('../../utils/tryCatchBlock');
const notification_controller = require('../user/user_notification_controller');
const tweet_controller = require('../tweet/tweetController');

exports.add_tweet_id_to_user_posted_tweets = try_catch(
  async (user_id, tweet_obj) => {
    // 1.add tweet_id to user bookmark

    let result;

    const add_tweetid_to_user_postedtweets =
      bucket_controller.add_doc_to_bucket(
        user_activity,
        'user_id',
        user_id,
        'posted_tweet_id_arr',
        { _id: tweet_obj._id },
        true,
        user_id,
        'posted_tweets_count'
      );

    // if retweet or quote_tweet
    const add_tweetid_to_user_retweet_arr =
      tweet_obj.tweet_type === 'retweet' || tweet_obj.tweet_type === 'quote'
        ? bucket_controller.add_doc_to_bucket(
            user_activity,
            'user_id',
            user_id,
            'retweet_quotetweet_parent_id_arr',
            {
              _id:
                tweet_obj.tweet_type === 'retweet'
                  ? tweet_obj.retweet_parent_id
                  : tweet_obj.quote_tweet_parent_id,
            },
            false
          )
        : undefined;

    // i need the tweet whole obj with all fields

    const notifiy_user_about_the_tweet =
      notification_controller.send_notification_to_notified_users(user_id, {
        _id: tweet_obj._id,
        type: 'tweet-create',
        user: { _id: user_id, ...tweet_obj.user_details },
        text: tweet_obj.text,
      });

    await Promise.all([
      add_tweetid_to_user_postedtweets,
      add_tweetid_to_user_retweet_arr,
      notifiy_user_about_the_tweet,
    ]);

    return result;
    //   return next(new AppError('tweet not added to user posted tweet', 500));
    //
    // return sendReq(res, 200, 'tweet added to user like tweets', { result });
  }
);
exports.remove_tweet_id_from_user_posted_tweets = try_catch(
  async (user_id, tweet_id, tweet_type) => {
    // 1.add tweet_id to user bookmark

    const remove_tweetid_from_user_postedtweets =
      bucket_controller.remove_doc_from_bucket(
        user_activity,
        'user_id',
        user_id,
        'posted_tweet_id_arr',
        tweet_id,
        true,
        user_id,
        'posted_tweets_count'
      );
    const remove_tweetid_from_user_retweet_quotetweet_arr =
      bucket_controller.remove_doc_from_bucket(
        user_activity,
        'user_id',
        user_id,
        'retweet_quotetweet_parent_id_arr',
        tweet_id,
        false
      );

    const delete_tweet_from_tweets_db = tweet_controller.delete_tweet(
      user_id,
      tweet_id,
      tweet_type
    );

    await Promise.all([
      remove_tweetid_from_user_postedtweets,
      remove_tweetid_from_user_retweet_quotetweet_arr,
      delete_tweet_from_tweets_db,
    ]);
  }
);

// exports.doc_exist_in_user_activities = (
//   activity_docs,
//   activity_arr_field,
//   activity_arr_doc_id
// ) =>
//   activity_docs.some((doc) =>
//     doc[activity_arr_field].some((el) => el._id.equals(activity_arr_doc_id))
//   );

// exports.filter_visible_tweets_and_set_user_interaction_field_in_tweets =
//   try_catch((user_activity_docs, tweet, cur_user) => {
//     // 1.check cur_user can see the tweet  and if cur_user cant we dont need the tweet (that's why return)
//     // point => if(target audience is circle then reply audience circle only)
//     // 2.check cur_user can reply to tweet
//     // 3.check cur_user is following  tweet user

//     const cur_user_id = cur_user._id;

//     const {
//       target_audience,
//       audience_can_reply,
//       user_id: tweet_user_id,
//       _id: tweet_id,
//       blocked_user_id_arr,
//       mute_user_id_arr,
//       circle_id_arr,
//     } = tweet;

//     // if cur user block tweet
//     if (
//       this.doc_exist_in_user_activities(
//         user_activity_docs,
//         'block_tweet_id_arr',
//         tweet_id
//       )
//     )
//       return;

//     if (
//       target_audience === 'circle' &&
//       circle_id_arr &&
//       circle_id_arr.length > 0 &&
//       circle_id_arr.some((id) => id.equals(cur_user_id))
//     )
//       return;

//     // check if tweet is liked by user
//     tweet.like_by_cur_user = this.doc_exist_in_user_activities(
//       user_activity_docs,
//       'like_tweet_id_arr',
//       tweet_id
//     );

//     // check if tweet is bookmark by user
//     tweet.bookmark_by_cur_user = this.doc_exist_in_user_activities(
//       user_activity_docs,
//       'bookmark_tweet_id_arr',
//       tweet_id
//     );
//     tweet.follow_by_cur_user = this.doc_exist_in_user_activities(
//       user_activity_docs,
//       'following',
//       tweet_user_id
//     );

//     if (audience_can_reply === 'everyone') tweet.cur_user_can_reply = true;
//     else if (
//       audience_can_reply === 'circle' &&
//       circle_id_arr &&
//       circle_id_arr.some((id) => id.equals(cur_user_id))
//     )
//       tweet.cur_user_can_reply = true;
//     else if (audience_can_reply === 'following')
//       tweet.cur_user_can_reply = tweet.follow_by_cur_user;
//     else tweet.cur_user_can_reply = false;

//     tweet.cur_user_mute = cur_user.muted_users.some(
//       (id) => id === tweet.user_id.toString()
//     );

//     return tweet;
//   });

exports.get_user_tweets = try_catch(
  async (user_id, page = 0, limit) =>
    await bucket_controller.get_bucket_ref_latest_doc(
      user_activity,
      'tweets',
      limit,
      page,
      'user_id',
      user_id,
      'posted_tweet_id_arr',
      {}
    )
);

// return error if no tweet is left
exports.get_25_tweets = try_catch(async (user_id, page) => {
  const results = await Promise.all([this.get_user_tweets(user_id, page, 25)]);
  if (results[0].length === 0) return 'no-docs-left';
  return results[0];
});

exports.groupBy_multiple_or_single_tweets = (arr, keyGetter) => {
  const out = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const item of arr) {
    const key = keyGetter(item);
    if (!out[key]) out[key] = [];
    out[key].push(item);
  }
  return out;
};

// advanced filter , show only one those tweets to cur user which are visible to cur_user
exports.get_visible_tweets = try_catch(
  async (
    cur_user,
    cur_user_activity_docs,
    view_user_id,
    page,
    limit,
    view_user_pinned_tweetid_arr
  ) => {
    // view_user_id => user stared by cur user

    const cur_user_id = cur_user && cur_user._id;

    let visible_tweets = [];
    let only_tweet_with_upload_imgs = [];

    // making req to db until we get 25 tweets
    while ((await visible_tweets.length) < limit) {
      const more_tweets = await this.get_25_tweets(view_user_id, page);
      page = Number(page) + 1;
      if (more_tweets === 'no-docs-left') break;
      // eslint-disable-next-line no-restricted-syntax
      for (const tweet of more_tweets) {
        const tweet_promise =
          tweet_controller.filter_visible_tweets_and_set_user_interaction_field_in_tweets(
            cur_user_activity_docs,
            tweet,
            cur_user_id
          );

        visible_tweets.push(tweet_promise);
      }

      visible_tweets = await Promise.all(visible_tweets);
    }

    visible_tweets = visible_tweets.filter((visible_tweet) => visible_tweet);

    // adding ts_format prop
    visible_tweets = visible_tweets.map((el) => {
      el.ts_format = readable_time(el.ts);
      return el;
    });

    // posted_tweets that are not pinned
    visible_tweets = visible_tweets.filter((tweet) => {
      if (view_user_pinned_tweetid_arr.length === 0) return tweet;

      if (
        view_user_pinned_tweetid_arr.length > 0 &&
        view_user_pinned_tweetid_arr.some((el) => el === tweet._id.toString())
      )
        return false;

      return tweet;
    });

    visible_tweets = visible_tweets.sort(
      (a, b) => new Date(b.ts) - new Date(a.ts)
    );

    visible_tweets = this.groupBy_multiple_or_single_tweets(
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
    };

    // return visible_tweets;
  }
);

exports.get_tweet_with_upload_imgs = try_catch(async (user_id) => {
  // for user profile sidebar img (we get imgs from tweets)
  const tweet_with_upload_imgs = await mongoose
    .model('tweet')
    .find({ user_id: user_id, $expr: { $gt: [{ $size: '$upload_imgs' }, 0] } }).limit(15).sort({ts:-1});

    console.log(tweet_with_upload_imgs)

  const only_tweet_with_upload_imgs_arr = [];
  tweet_with_upload_imgs.forEach((tweet) => {
    const imgs = tweet.upload_imgs;
    imgs.forEach((img) => {
      only_tweet_with_upload_imgs_arr.push({
        _id: tweet._id,
        upload_imgs: img,
      });
    });
  });

  return only_tweet_with_upload_imgs_arr;
});

exports.api_get_user_tweets = catchAsync(async (req, res, next) => {
  const user_tweets = await this.get_user_tweets(
    req.user._id,
    req.params.page,
    25
  );
  return sendReq(res, 200, 'user tweets', user_tweets);
});
exports.api_get_visible_tweets = catchAsync(async (req, res, next) => {
  const { view_user_id, page, limit } = req.params;
  const user_tweets = await this.get_visible_tweets(
    req.user,
    view_user_id,
    page,
    25
  );
  return sendReq(res, 200, 'user tweets', user_tweets);
});

exports.pinned_tweet = try_catch(async (user_id, tweet_id) => {
  const pin_tweet = mongoose
    .model('tweet')
    .findOneAndUpdate({ _id: tweet_id }, { $set: { pinned: true } });

  // const add_tweet_id_to_pinned_tweet = bucket_controller.add_doc_to_bucket(
  //   user_activity,
  //   'user_id',
  //   user_id,
  //   'pinned_tweet_id_arr',
  //   { _id: tweet_id },
  //   false
  // );

  const add_tweetid_to_user_pinnned_tweets = mongoose
    .model('user')
    .findOneAndUpdate(
      { _id: user_id },
      { $addToSet: { pinned_tweet_id_arr: [tweet_id] } }
    );

  await Promise.all([pin_tweet, add_tweetid_to_user_pinnned_tweets]);
});

exports.unpinned_tweet = try_catch(async (user_id, tweet_id) => {
  const unpin_tweet = mongoose
    .model('tweet')
    .findOneAndUpdate({ _id: tweet_id }, { $set: { pinned: false } });

  // const remove_tweet_id_to_pinned_tweet =
  //   bucket_controller.remove_doc_from_bucket(
  //     user_activity,
  //     'user_id',
  //     user_id,
  //     'pinned_tweet_id_arr',
  //     tweet_id,
  //     false
  //   );

  const remove_tweetid_from_user_pinnned_tweets = mongoose
    .model('user')
    .findOneAndUpdate(
      { _id: user_id },
      { $pull: { pinned_tweet_id_arr: tweet_id } }
    );

  await Promise.all([unpin_tweet, remove_tweetid_from_user_pinnned_tweets]);
});

exports.get_pinned_tweets = try_catch(
  async (pinned_tweet_id_arr) =>
    await mongoose.model('tweet').find({ _id: { $in: pinned_tweet_id_arr } })
);

exports.api_add_tweet_id_to_user_tweets = catchAsync(async (req, res, next) => {
  const user_tweets = await this.add_tweet_id_to_user_posted_tweets(
    req.user._id,
    req.params.tweet_id
  );
  if (!user_tweets)
    return next(new AppError('tweet no added to user tweets', 500));
  return sendReq(res, 200, 'user tweets added ', user_tweets);
});

// user remove its posted_tweet
exports.api_remove_tweet_id_from_user_tweets = catchAsync(
  async (req, res, next) => {
    const user_id = req.user._id;
    const { tweet_id, tweet_type } = req.params;
    const delete_tweet_from_user_tweets =
      await this.remove_tweet_id_from_user_posted_tweets(
        user_id,
        tweet_id,
        tweet_type
      );
    return sendReq(res, 200, 'user tweet removed');
  }
);

exports.api_pinned_tweet = try_catch(async (req, res) => {
  const { tweet_id } = req.params;
  const user_id = req.user._id;
  await this.pinned_tweet(user_id, tweet_id);
  return sendReq(res, 200, 'pinned tweet');
});
exports.api_unpinned_tweet = try_catch(async (req, res) => {
  const { tweet_id } = req.params;
  const user_id = req.user._id;
  await this.unpinned_tweet(user_id, tweet_id);
  return sendReq(res, 200, 'pinned tweet');
});

exports.api_get_pinned_tweets = try_catch(async (req, res) => {
  const { page, limit } = req.params;
  const user_id = req.user._id;
  const pinned_tweets = await this.get_pinned_tweets(user_id, page, limit);
  return sendReq(res, 200, 'pinned tweets', pinned_tweets);
});
