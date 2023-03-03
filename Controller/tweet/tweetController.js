const { unlink } = require('fs/promises');
const path = require('path');
const mongoose = require('mongoose');
/* eslint-disable camelcase */
const sharp = require('sharp');
const catchAsync = require('../../utils/catchAsync');
const try_catch = require('../../utils/tryCatchBlock');
const AppError = require('../../utils/AppError');
const sendReq = require('../../utils/sendJSON');
const { produce } = require('immer');
const { format_time, readable_time } = require('../../utils/helperFunction');

// Model
const Tweet = require('../../Model/tweet/tweetModel');
const TweetLikes = require('../../Model/tweet/tweet_like_by_model');
const UserActivity = require('../../Model/user/user_acitivity_model');

// Controller
const Factory = require('../handleFactory');
const userController = require('../user/userController');
const userTweetBucketController = require('../user_activity/user_posted_tweet_bucket_controller');
const tweet_schedule_controller = require('./tweet_schedule_controller');
const user_schedule_tweet_bucket_controller = require('../user_activity/schedule_tweet_bucket_controller');
const user_draft_tweet_bucket_controller = require('../user_activity/draft_tweet_bucket_controller');

exports.skip_multer_on_already_existing_img = (req, res, next) => {
  const upload_imgs = req.body;
  if (!upload_imgs) return;

  if (typeof upload_imgs[0] === 'string') req.skip_multer = true;
};

// fs related
exports.resizeImages = async (req, res, next) => {
  if (!req.files) return next();

  let file_path, file_name_start;
  if (
    ['text', 'quote', 'retweet'].find((type) =>
      req.body.tweet_type.includes(type)
    )
  ) {
    file_name_start = 'tweet';
    file_path = 'tweets';
  } else {
    file_path = 'comments';
    file_name_start = 'comment';
  }

  const upload_imgs = [];
  // eslint-disable-next-line no-restricted-syntax
  for await (const file of req.files) {
    const filename = `${file_name_start}-${req.user.id}-${
      Date.now() + Math.random(1000) * 100
    }.jpeg`;

    sharp(file.buffer)
      .resize(1280, 720)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/${file_path}/${filename}`);

    upload_imgs.push(filename);
  }

  req.body.upload_imgs = upload_imgs;

  next();
};

const delete_upload_img = try_catch(async (upload_imgs) => {
  const file_path = path.join(__dirname, '..', '..', 'public/img/tweets');

  // eslint-disable-next-line no-restricted-syntax
  for await (const img of upload_imgs) {
    try {
      unlink(`${file_path}/${img}`);
    } catch (error) {
      console.error('there was an error:', error.message);
    }
  }
});
///////////////////////////////////////////////////////////

// i should change it to atlas search tomorrow
const find_tweet_exist_by_text = async (text) => {
  const agg = await Tweet.aggregate([
    {
      $search: {
        phrase: {
          path: 'text',
          query: text,
        },

        returnStoredSource: true,
      },
    },
  ]);

  return agg.length > 0;
};

const add_tweetId_to_user_posted_tweet_bucket_and_update_user_tweet_count =
  try_catch(async (user_id, tweet_obj) => {
    // 2- save tweet id in user posted_tweet tweet id bucket
    const add_tweet_to_user_tweets =
      userTweetBucketController.add_tweet_id_to_user_posted_tweets(
        user_id,
        tweet_obj
      );
    // 2.5 increase user tweet_count only if is not draft or schedule
    const update_user_tweet_count = userController.update_user_tweet_count(
      user_id,
      1
    );

    await Promise.all([add_tweet_to_user_tweets, update_user_tweet_count]);

    // 3- save tweet id in user recent tweets id
    // await userController.add_tweetId_to_user_recent_tweets(user_id, tweet_id);
  });

exports.form_basic_tweet_doc = try_catch(
  async (req, res, next, return_tweet = false) => {
    // 1- check if same tweet text already exist and  save in tweet_collection

    const tweet_doc = req.body;
    const {
      _id: tweet_id,
      text,
      tweet_type,
      upload_imgs,
      multiple_tweets,
      post,

      set_draft_upload_img,
    } = tweet_doc;

    const cur_user = req.user;

    // not letting compare text for multiple tweets
    if (
      !multiple_tweets &&
      text &&
      (await find_tweet_exist_by_text(text.trim()))
    ) {
      // deleting upload img posted by same text(tweet is not saved)
      if (upload_imgs && upload_imgs.length !== 0) {
        await delete_upload_img(upload_imgs);
      }
      return next(new AppError('Whoops! You already said that.', 400));
    }

    const { _id: user_id, avatar, name, profilePic } = cur_user;

    const tweet = produce({}, (draft) => {
      // -- setting some properties

      draft._id = new mongoose.Types.ObjectId();
      draft.text = tweet_doc.text;
      draft.tweet_type = tweet_doc.tweet_type;
      draft.target_audience = tweet_doc.target_audience;
      draft.audience_can_reply = tweet_doc.audience_can_reply;
      draft.schedule_post_time = tweet_doc.schedule_post_time;
      draft.blocked_user_id_arr = cur_user.blocked_user_id_arr;
      draft.muted_user_id_arr = cur_user.muted_user_id_arr;
      draft.circle_user_id_arr = cur_user.circle_user_id_arr;

      // these image are already saved and we do this because they are simple url and multer is removing arr img
      if (set_draft_upload_img) draft.upload_imgs = set_draft_upload_img;
      else draft.upload_imgs = tweet_doc.upload_imgs;

      draft.ts = new Date().toISOString();
      draft.user_id = user_id;

      draft.user_details = {
        avatar,
        name,
        profilePic,
      };
    });

    req.tweet = tweet;
    if (return_tweet) return tweet;

    next();
  }
);

// unsent_tweet => draft or schedule tweet when it is being created so we  need to remove the the tweet so we can post it
exports.delete_unsent_tweet_if_posted = try_catch(async (req, res, next) => {
  const { tweet_previous_type, tweet_id } = req.body;

  if (!tweet_previous_type || !tweet_id) return next();

  const type = tweet_previous_type.includes('draft') ? 'draft' : 'schedule';

  if (type === 'draft') {
    await user_draft_tweet_bucket_controller.remove_tweet_from_draft_bucket(
      req.user._id,
      tweet_id
    );
  } else {
    await user_schedule_tweet_bucket_controller.remove_tweet_from_schedule_bucket(
      req.user._id,
      tweet_id
    );

    await tweet_schedule_controller.delete_schedule_tweet(tweet_id);
  }

  next();
});

// if draft tweetor schedule is updated and saved then we update,
// if not we create unsent tweet
exports.update_unsent_tweet = catchAsync(async (req, res, next) => {
  const { tweet_id } = req.params;
  const { tweet_type, tweet_previous_type } = req.body;

  if (!tweet_type || !tweet_id) return next();

  const type = tweet_type.includes('draft') ? 'draft' : 'schedule';

  const { text, upload_imgs, schedule_post_time } = req.body;
  const user_id = req.user._id;

  let doc;

  if (type === 'draft') {
    if (tweet_previous_type.includes('draft'))
      doc = await user_draft_tweet_bucket_controller.update_draft_doc(
        user_id,
        tweet_id,
        { text, upload_imgs }
      );
    else {
      let tweet = await user_schedule_tweet_bucket_controller.get_schedule_doc(
        user_id,
        tweet_id
      );

      delete tweet._id;
      if (text) tweet.text = text;
      if (upload_imgs.length > 0) tweet.upload_imgs = upload_imgs;
      tweet.tweet_type = tweet_type;

      tweet =
        await user_draft_tweet_bucket_controller.add_tweet_to_draft_bucket(
          user_id,
          tweet
        );

      await user_schedule_tweet_bucket_controller.remove_tweet_from_schedule_bucket(
        user_id,
        tweet_id
      );

      await tweet_schedule_controller.delete_schedule_tweet(tweet_id);
    }
  }

  if (type === 'schedule') {
    if (tweet_previous_type.includes('schedule')) {
      doc = await user_schedule_tweet_bucket_controller.update_schedule_doc(
        user_id,
        tweet_id,
        { text, upload_imgs, schedule_post_time }
      );

      await tweet_schedule_controller.update_schedule_tweet(
        tweet_id,
        schedule_post_time
      );
    } else {
      let tweet = await user_draft_tweet_bucket_controller.get_draft_doc(
        user_id,
        tweet_id
      );

      delete tweet._id;
      if (text) tweet.text = text;
      if (upload_imgs.length > 0) tweet.upload_imgs = upload_imgs;
      tweet.tweet_type = tweet_type;

      tweet =
        await user_schedule_tweet_bucket_controller.add_tweet_to_schedule_bucket(
          user_id,
          tweet
        );

      await user_draft_tweet_bucket_controller.remove_tweet_from_draft_bucket(
        user_id,
        tweet_id
      );

      await tweet_schedule_controller.schedule_tweet({
        _id: tweet._id,
        post_at: tweet.schedule_post_time,
        user_id: user_id,
        type: tweet.tweet_type,
      });
    }
  }
  return sendReq(res, 200, `${type} unsent tweet is updated`);
});

// promise consume forcefully
exports.create_text_tweet = try_catch(
  async (req, res, next, return_tweet = false) => {
    // text we will create it right away and save it

    const user_id = req.user._id;
    const tweet_doc_from_body = req.body;
    const { tweet_type } = req.body;

    let doc;

    // tweet created can be a draft or schedule tweet which is now posted
    if (tweet_type === 'text') {
      const { _id } = req.tweet;
      const create_tweet = Tweet.create(req.tweet);
      // const { _id } = doc;
      const add_tweet_and_update_count =
        add_tweetId_to_user_posted_tweet_bucket_and_update_user_tweet_count(
          user_id,
          req.tweet
        );

      const result = await Promise.all([
        create_tweet,
        add_tweet_and_update_count,
      ]);

      doc = result[0];
    } else if (tweet_type === 'draft-text') {
      doc = await user_draft_tweet_bucket_controller.add_tweet_to_draft_bucket(
        user_id,
        tweet_doc_from_body
      );
    } else if (tweet_type === 'schedule-text') {
      const add_tweet_to_user_schedule_tweet =
        user_schedule_tweet_bucket_controller.add_tweet_to_schedule_bucket(
          user_id,
          req.tweet
        );

      const add_schedule_to_schedule_cleaner =
        tweet_schedule_controller.schedule_tweet(user_id, {
          _id: req.tweet._id,
          schedule_post_time: req.tweet.schedule_post_time,
          user_id: user_id,
          type: tweet_type,
        });

      await Promise.all([
        add_tweet_to_user_schedule_tweet,
        add_schedule_to_schedule_cleaner,
      ]);
    }

    if (return_tweet) return return_tweet;

    return sendReq(res, 200, 'text tweet created', doc);
  }
);

exports.create_quote_tweet = catchAsync(async (req, res, next) => {
  // text we will create it right away and save it

  let doc = req.body;
  // const { tweet_type } = req.body;

  let tweet = req.tweet;

  const { tweet_type } = req.tweet;

  // set the parent_id_arr of current quote tweet(from which tweet is being quote)

  const quote_doc = await Tweet.findOne({ _id: doc.posted_tweet__id });

  // posted tweet in which we comment
  const quote_tweet = {
    _id: quote_doc._id,
    text: quote_doc.text,
    upload_imgs: quote_doc.upload_imgs,
    ts: quote_doc.ts,

    user: {
      name: quote_doc.user_details.name,
      avatar: quote_doc.user_details.avatar,
      profilePic: quote_doc.user_details.profilePic,
    },
  };

  // adding current tweet id to quote parent arr6
  const quote_parent_id_arr = [
    ...quote_doc.quote_tweet_parent_id_arr,
    quote_doc._id,
  ];

  const user_id = req.user._id;

  tweet = produce(tweet, (draft) => {
    draft.posted_tweet = quote_tweet;
    draft.quote_tweet_parent_id_arr = quote_parent_id_arr;
  });

  if (tweet_type === 'quote') {
    const { _id } = req.tweet;
    const create_tweet = Tweet.create(tweet);

    const add_tweet_and_update_count =
      add_tweetId_to_user_posted_tweet_bucket_and_update_user_tweet_count(
        user_id,
        req.tweet
      );

    const update_retweet_quote_count = this.update_retweet_count(
      quote_doc._id,
      1
    );

    const result = await Promise.all([
      create_tweet,
      add_tweet_and_update_count,
      update_retweet_quote_count,
    ]);

    tweet = result[0];
  } else if (tweet_type === 'draft-quote') {
    doc = await user_draft_tweet_bucket_controller.add_tweet_to_draft_bucket(
      user_id,
      tweet
    );
  } else if (tweet_type === 'schedule-quote') {
    const add_tweet_to_user_schedule_tweet =
      user_schedule_tweet_bucket_controller.add_tweet_to_schedule_bucket(
        user_id,
        req.tweet
      );

    const add_schedule_to_schedule_cleaner =
      tweet_schedule_controller.schedule_tweet(user_id, {
        _id: req.tweet._id,
        schedule_post_time: tweet.schedule_post_time,
        user_id: user_id,
        type: tweet_type,
      });

    await Promise.all([
      add_tweet_to_user_schedule_tweet,
      add_schedule_to_schedule_cleaner,
    ]);
  }

  return sendReq(res, 200, 'text tweet created', tweet);
});

exports.create_retweet = catchAsync(async (req, res, next) => {
  // 1.retweet create
  // 2.update tweet (which we retweet) count (+1)
  // 3.add tweet to user tweet and increase user tweet count

  let tweet;
  const { tweet_id: parent_tweet_id } = req.params;
  const { user } = req;

  const user_id = req.user._id;
  const tweet_doc = await Tweet.findOne({ _id: parent_tweet_id });

  const doc = {};

  const generate_tweet_id = mongoose.Types.ObjectId();
  const retweet_parent_id_arr =
    tweet_doc.retweet_parent_id_arr &&
    tweet_doc.retweet_parent_id_arr.length > 0
      ? [...tweet_doc.retweet_parent_id_arr]
      : [];
  retweet_parent_id_arr.push(parent_tweet_id);

  doc.tweet_type = 'retweet';
  doc.retweet_parent_id = parent_tweet_id;
  doc.retweet_parent_id_arr = retweet_parent_id_arr;
  doc.ts = new Date();
  doc.text = tweet_doc.text;

  doc.posted_tweet = {};
  doc.posted_tweet.ts = tweet_doc.ts;
  doc._id = generate_tweet_id;

  doc.metadata = {};

  doc.user_id = user_id;
  doc.user_details = {
    name: req.user.name,
    avatar: req.user.avatar,
    profilePic: req.user.profilePic,
  };

  doc.blocked_user_id_arr = user.blocked_user_id_arr;
  doc.muted_user_id_arr = user.muted_user_id_arr;
  doc.circle_user_id_arr = user.circle_user_id_arr;

  // for faster reads we will embed the data (10m x 2=20m , 6000*1=6000)

  // 1.retweet create
  const create_retweet = Tweet.insertMany([doc]);

  // if (!tweet) return next(new AppError('retweet not created'));

  // 2.update tweet (which we retweet) count (+1)
  const update_retweet_count = this.update_retweet_count(parent_tweet_id, 1);

  // 3.add tweet to user tweet and increase user tweet count
  const add_tweet =
    add_tweetId_to_user_posted_tweet_bucket_and_update_user_tweet_count(
      user_id,
      doc
    );

  const result = await Promise.all([
    create_retweet,
    update_retweet_count,
    add_tweet,
  ]);

  tweet = result[0];

  return sendReq(res, 200, 'tweet retweet', tweet);
});

exports.delete_tweet = try_catch(async (user_id, tweet_id, tweet_type) => {
  // 1.make tweet active false so user when see tweet this tweet will be filter by {active:false}

  if (tweet_type.includes('schedule')) {
    await tweet_schedule_controller.delete_schedule_tweet(tweet_id);
    await user_schedule_tweet_bucket_controller.remove_tweet_from_schedule_bucket(
      user_id,
      tweet_id
    );

    return;
  }

  if (tweet_type.includes('draft')) {
    await user_draft_tweet_bucket_controller.remove_tweet_from_draft_bucket(
      user_id,
      tweet_id
    );

    return;
  }

  // when we remove a tweet
  // we remove tweet
  // people who liked the tweet
  // people who quote it
  // people who retweet it
  // they all need to be deleted (active:false)

  // tweet active false

  // unactive current tweet_id
  const get_unactive_tweet =
    tweet_type === 'undo-retweet'
      ? Tweet.findOne({ retweet_parent_id: tweet_id })
      : Tweet.findOneAndUpdate(
          { _id: tweet_id },
          {
            $set: { active: false },
          },
          { new: true }
        );

  let get_child_tweets;
  // find child quote or retweet
  if (tweet_type === 'retweet' || tweet_type === 'undo-retweet')
    get_child_tweets = Tweet.find({
      retweet_parent_id_arr: tweet_id,
    });

  if (tweet_type === 'quote')
    get_child_tweets = Tweet.find({
      quote_tweet_parent_id_arr: tweet_id,
    });

  const [unactive_tweet, child_tweets] = await Promise.all([
    get_unactive_tweet,
    get_child_tweets,
  ]);

  // decrease user tweet count
  const child_tweet_user_id_arr = child_tweets.map((el) => el.user_id);
  child_tweet_user_id_arr.push(user_id);

  // update current tweet parent tweet_count if they are quote or retweet
  let delete_child_tweets, update_retweet_count;

  if (tweet_type === 'quote') {
    delete_child_tweets = Tweet.updateMany(
      // parent_id_arr el tweet_id ke equal he ya arr me tweet_id he
      { quote_tweet_parent_id_arr: tweet_id },
      { $set: { active: false } }
    );
    update_retweet_count = this.update_retweet_count(
      unactive_tweet.quote_tweet_parent_id,
      -1
    );
  }

  if (tweet_type === 'retweet' || tweet_type === 'undo-retweet') {
    delete_child_tweets = Tweet.updateMany(
      { retweet_parent_id_arr: tweet_id },
      { $set: { active: false } }
    );

    update_retweet_count = this.update_retweet_count(
      unactive_tweet.retweet_parent_id,
      -1
    );
  }

  // setting child tweet user tweet count
  const update_child_tweet_user = Promise.all(
    child_tweet_user_id_arr.map((el) =>
      userController.update_user_tweet_count_and_liked_tweet_count(el._id, -1)
    )
  );

  await Promise.all([
    delete_child_tweets,
    update_retweet_count,
    update_child_tweet_user,
  ]);
  // decrease tweet retweet count
});

exports.undo_retweet = try_catch(async (req, res, next) => {
  const { tweet_id: parent_tweet_id } = req.params;
  const user_id = req.user._id;
  const get_tweet = Tweet.findOne({ _id: parent_tweet_id });

  // delete child tweets
  const get_child_tweets = Tweet.find({
    retweet_parent_id_arr: { $in: parent_tweet_id },
  });

  const [tweet, child_tweets] = await Promise.all([
    get_tweet,
    get_child_tweets,
  ]);

  // decrease user tweet count
  const child_tweet_user_id_arr = child_tweets.map((el) => el.user_id);
  child_tweet_user_id_arr.push(user_id);

  const set_child_tweet_unactive = Tweet.updateMany(
    { retweet_parent_id_arr: { $in: parent_tweet_id } },
    { $set: { active: false } }
  );
  const update_retweet_count = this.update_retweet_count(
    tweet.retweet_parent_id,
    -1
  );

  // setting child tweet user tweet count
  const update_child_tweet_user = Promise.all(
    child_tweet_user_id_arr.map((el) =>
      userController.update_user_tweet_count_and_liked_tweet_count(el._id, -1)
    )
  );

  await Promise.all([
    set_child_tweet_unactive,
    update_retweet_count,
    update_child_tweet_user,
  ]);
});

exports.api_delete_tweet = catchAsync(async (req, res, next) => {
  const { tweet_id, tweet_type } = req.params;
  const delete_tweet = await this.delete_tweet(
    req.user._id,
    tweet_id,
    tweet_type
  );

  return sendReq(res, 200, 'tweet deleted successfully');
});

const reset = async () => {
  await Tweet.deleteMany({});
  await TweetLikes.deleteMany({});
  await UserLikedTweet.deleteMany({});
  await UserTweetBucket.deleteMany({});
};

exports.doc_exist_in_user_activities = (
  activity_docs,
  activity_arr_field,
  activity_arr_doc_id
) =>
  activity_docs.some(
    (doc) =>
      doc &&
      doc[activity_arr_field] &&
      doc[activity_arr_field].length > 0 &&
      doc[activity_arr_field].some(
        (el) => el._id && el._id.equals(activity_arr_doc_id)
      )
  );

exports.filter_visible_tweets_and_set_user_interaction_field_in_tweets =
  try_catch((user_activity_docs, tweet, cur_user_id, cur_user) => {
    // 1.check cur_user can see the tweet  and if cur_user cant we dont need the tweet (that's why return)
    // point => if(target audience is circle then reply audience circle only)
    // 2.check cur_user can reply to tweet
    // 3.check cur_user is following  tweet user

    if (user_activity_docs.length === 0) return tweet;

    const {
      target_audience,
      audience_can_reply,
      user_id: tweet_user_id,
      _id: tweet_id,
      blocked_user_id_arr,
      muted_user_id_arr,
      circle_user_id_arr,
    } = tweet;

    // cur_user block tweet user
    if (
      this.doc_exist_in_user_activities(
        user_activity_docs,
        'blocked_user_id_arr',
        tweet_user_id
      )
    )
      return;

    // tweet user block the cur user
    if (
      blocked_user_id_arr &&
      blocked_user_id_arr.length > 0 &&
      blocked_user_id_arr.some((id) => id.equals(cur_user_id))
    )
      return;

    // if cur user block tweet
    if (
      this.doc_exist_in_user_activities(
        user_activity_docs,
        'block_tweet_id_arr',
        tweet_id
      )
    )
      return;

    if (
      target_audience === 'circle' &&
      circle_user_id_arr &&
      circle_user_id_arr.length > 0 &&
      circle_user_id_arr.some((id) => id.equals(cur_user_id))
    )
      return;

    // set tweet readble time
    // tweet.ts_format = readable_time(tweet.ts);
    // if (tweet.posted_tweet.ts)
    //   tweet.posted_tweet.ts = readable_time(tweet.posted_tweet.ts);

    // check if tweet is liked by user
    tweet.like_by_cur_user = this.doc_exist_in_user_activities(
      user_activity_docs,
      'like_tweet_id_arr',
      tweet_id
    );

    // check if tweet is bookmark by user
    tweet.bookmark_by_cur_user = this.doc_exist_in_user_activities(
      user_activity_docs,
      'bookmark_tweet_id_arr',
      tweet_id
    );

    tweet.comment_by_cur_user = this.doc_exist_in_user_activities(
      user_activity_docs,
      'comment_tweet_id_arr',
      tweet_id
    );
    tweet.retweet_quotetweet_by_cur_user = this.doc_exist_in_user_activities(
      user_activity_docs,
      'retweet_quotetweet_parent_id_arr',
      tweet_id
    );
    tweet.follow_by_cur_user = this.doc_exist_in_user_activities(
      user_activity_docs,
      'following',
      tweet_user_id
    );

    if (
      !(
        muted_user_id_arr &&
        muted_user_id_arr.length &&
        muted_user_id_arr.some((mute_id) => mute_id !== cur_user_id.toString())
      )
    ) {
      if (audience_can_reply === 'everyone') tweet.cur_user_can_reply = true;
      else if (
        audience_can_reply === 'circle' &&
        circle_user_id_arr &&
        circle_user_id_arr.some((id) => id.equals(cur_user_id))
      )
        tweet.cur_user_can_reply = true;
      else if (audience_can_reply === 'following')
        tweet.cur_user_can_reply = tweet.follow_by_cur_user;
    } else tweet.cur_user_can_reply = false;

    // cur user mute arr include
    tweet.mute_by_cur_user = this.doc_exist_in_user_activities(
      user_activity_docs,
      'muted_user_id_arr',
      tweet_user_id
    );

    // overwriting for cur_user case
    if (cur_user_id.toString() === tweet_user_id.toString()) {
      tweet.mute_by_cur_user = false;
      tweet.cur_user_can_reply = true;
    }

    return tweet;
  });

const get_recent_tweets_step2 = try_catch(
  async (
    req,
    skip_tweets,
    call_timing,
    previous_tweets,
    user_activity_docs
  ) => {
    // 1.get real 25 tweets, the user is elligible to see
    // 1.1 if we get previous tweets due to insufficient tweets return msg=> insufficient tweets
    // 2.find tweet target audience in which cur_user is a target (if not the dont let user see that tweet)
    // 3.check user is follower of the tweet user

    const { page } = req.params;
    const cur_user_id = req.user._id;
    // tweets which user can see
    let valid_tweets = [];

    // 1.get real 25 tweets, the user is elligible to see
    const find_tweets = await Tweet.find({
      active: true,
      ts: { $lt: call_timing },
    })
      .sort({ ts: -1 })
      .skip(Number(page) * Number(skip_tweets))
      .limit(25);

    if (find_tweets.length === 0) return 'insufficient-tweets';

    // 1.1 if we get previous tweets due to insufficient tweets return msg=> insufficient tweets
    if (previous_tweets.length !== 0) {
      const same_tweet_come_again = previous_tweets.some((prev_el) =>
        find_tweets.some((cur_el) => cur_el._id.equals(prev_el._id))
      );
      if (same_tweet_come_again) return 'insufficient-tweets';
    }

    // 2.find tweet target audience  include cur_user (if not the dont let user see that tweet)
    // eslint-disable-next-line no-restricted-syntax
    for (const tweet of find_tweets) {
      valid_tweets.push(
        this.filter_visible_tweets_and_set_user_interaction_field_in_tweets(
          user_activity_docs,
          tweet,
          cur_user_id,
          req.user
        )
      );
    }

    valid_tweets = await Promise.all(valid_tweets);
    valid_tweets = valid_tweets.filter((el) => el);

    // eslint-disable-next-line no-restricted-syntax

    return { valid_tweets, previous_tweets: find_tweets };
  }
);

const get_recent_tweet_step1 = async (
  req,
  limit,
  call_timing,
  recent_tweets,
  previous_tweets_arr,
  detail_obj,
  user_activity_docs
) => {
  const get_tweets = await get_recent_tweets_step2(
    req,
    25,
    call_timing,
    previous_tweets_arr,
    user_activity_docs
  );

  if (get_tweets === 'insufficient-tweets') {
    detail_obj.end_while_loop = true;
    return false;
  }

  const { valid_tweets, previous_tweets } = get_tweets;

  // we only want 25 tweets
  valid_tweets.forEach((tweet, i) => {
    detail_obj.count += i + 1;
    if (Number(detail_obj.count) === 25) return false;
    recent_tweets.push(tweet);
  });

  previous_tweets_arr = previous_tweets;

  if (Number(detail_obj.count) < 25) {
    req.query.page = Number(req.query.page) + 1;
    return await get_recent_tweet_step1(
      req,
      limit,
      call_timing,
      recent_tweets,
      previous_tweets_arr,
      detail_obj,
      user_activity_docs
    );
  }
};
const get_user_activity_docs = (user_activity_docs, field, limit) => {
  let arr = [];

  user_activity_docs.forEach((el) => arr.push(...el[field]));
  return arr.slice(0, limit).reverse();
};

exports.groupBy_multiple_or_single_tweets = (arr, keyGetter) => {
  const out = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const item of arr) {
    const key = keyGetter(item);

    // if (!item.multiple_tweets) {
    //   out[key] = item;
    //   return;
    // }

    if (!out[key]) out[key] = [];
    out[key].push(item);
  }
  return out;
};

// did all above mechanism in one functions
exports.filter_and_set_permission_fields_and_group_tweets = try_catch(
  async (user_activity_docs, user_id, tweets) => {
    let visible_tweets = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const tweet of tweets) {
      const tweet_promise =
        this.filter_visible_tweets_and_set_user_interaction_field_in_tweets(
          user_activity_docs,
          tweet,
          user_id
        );

      visible_tweets.push(tweet_promise);
    }
    visible_tweets = await Promise.all(visible_tweets);
    visible_tweets = visible_tweets.filter((visible_tweet) => visible_tweet);

    visible_tweets = visible_tweets.map((el) => {
      el.ts_format = format_time(el.ts);
      return el;
    });

    visible_tweets = this.groupBy_multiple_or_single_tweets(
      visible_tweets,
      (item) =>
        `${item.user_id}-${new Date(item.ts).getDay()}-${new Date(
          item.ts
        ).getHours()}-${new Date(item.ts).getMinutes()}-${new Date(
          item.ts
        ).getSeconds()}`
    );

    return visible_tweets;
  }
);

// req pass => page and cur_user_id
exports.get_recent_tweets_and_user_activity_docs = try_catch(async (req) => {
  // return tweet according to page
  // 0.we need to 25 recent 25 tweets but due to target audience condition tweets decrease for cur_user to see so if tweets dont reach 25 tweets we need to get another 25 tweets batch(same as before tweet group timing as tweet can get duplicate)
  // 1.promise.all make process faster due to paralled we can get new

  // no_no_tweets = 25;
  const call_timing = new Date();
  req.params.page = req.params.page ? req.params.page : 0;

  // object reference passs(mutation)
  let recent_tweets = [];
  let detail_obj = { count: 0, end_while_loop: false };
  let previous_tweets_arr = [];

  let tweets_while_promise = [];

  const cur_user_activity_docs = await UserActivity.find({
    user_id: req.user._id,
  });

  // mutation => recent_tweets,previous_tweets_arr,detail_obj
  tweets_while_promise = [
    get_recent_tweet_step1(
      req,
      25,
      call_timing,
      recent_tweets,
      previous_tweets_arr,
      detail_obj,
      cur_user_activity_docs
    ),
  ];

  // this is the power of promise.all
  await Promise.all(tweets_while_promise);

  recent_tweets = this.groupBy_multiple_or_single_tweets(
    recent_tweets,
    (item) =>
      `${item.user_id}-${new Date(item.ts).getDay()}-${new Date(
        item.ts
      ).getHours()}-${new Date(item.ts).getMinutes()}-${new Date(
        item.ts
      ).getSeconds()}`
  );

  const total_circle_users = cur_user_activity_docs.reduce((count, arr) => {
    count += arr['circle'].length;
    return count;
  }, 0);

  const search_keywords = get_user_activity_docs(
    cur_user_activity_docs,
    'search_keywords',
    20
  );

  return {
    recent_tweets: recent_tweets || [],
    total_circle_users: total_circle_users,
    search_keywords: search_keywords,
  };
});

exports.get_user_tweets = catchAsync(async (req, res, next) => {
  // get latest user tweet bucket
  const { user_id } = req.params;

  const user_latest_tweets =
    await userTweetBucketController.get_user_latest_tweets(user_id);
  return sendReq(res, 200, {
    total: user_latest_tweets.length,
    user_latest_tweets,
  });
});

// ADMIN ------------------------------------
exports.admin_get_recent_tweets = catchAsync(async (req, res) => {
  const recent_tweets = await this.get_recent_tweets_and_user_activity_docs(
    req
  );
  return sendReq(res, 200, 'recent tweets', {
    results: recent_tweets.length,
    recent_tweets,
  });
});

// update -------------------------------------------
// tweet metadata properties
exports.update_tweet_like_count = try_catch(
  async (tweet_id, value) =>
    await Tweet.findOneAndUpdate(
      { _id: tweet_id },
      {
        $inc: {
          'metadata.like_count': value,
        },
      }
    )
);
exports.update_comment_count_in_tweet = try_catch(
  async (tweet_id, value) =>
    await Tweet.findOneAndUpdate(
      { _id: tweet_id },
      {
        $inc: {
          'metadata.comment_count': value,
        },
      }
    )
);
exports.update_retweet_count = try_catch(
  async (tweet_id, value) =>
    await Tweet.findOneAndUpdate(
      {
        $or: [{ _id: tweet_id }, { retweet_parent_id_arr: { $in: tweet_id } }],
      },
      {
        $inc: {
          'metadata.retweet_count': value,
        },
      }
    )
);

exports.return_get_tweet = try_catch(
  async (tweet_id) => await Tweet.findOne({ _id: tweet_id, active: true })
);

// search tweets
exports.search_tweets = try_catch(async (word, page, limit) => {
  // sort by itself by seeing the score (the search sort it byitself)
  const tweets = await Tweet.aggregate([
    {
      $search: {
        compound: {
          must: { equals: { path: 'active', value: true } },
          should: [
            {
              autocomplete: {
                path: 'text',
                query: word,
                fuzzy: {
                  maxEdits: 1,
                  prefixLength: 1,
                  maxExpansions: 256,
                },
              },
            },
            {
              text: {
                path: 'text',
                query: word,
                score: { boost: { value: 2 } },
              },
            },
          ],
        },

        highlight: {
          path: 'text',
        },
      },
    },

    { $skip: Number(page) * Number(limit) },

    { $limit: 25 },

    {
      $set: {
        highlights: { $meta: 'searchHighlights' },
        score: { $meta: 'searchScore' },
      },
    },
  ]);
  return tweets;
});

// --------------------------------------------------
// API_______________________________
exports.get_tweet = Factory.getOne(Tweet);
exports.get_allTweets = Factory.getAll(Tweet);
exports.update_tweet = Factory.updateOne(Tweet);
exports.update_allTweets = Factory.updateAll(Tweet);
// exports.delete_tweet = Factory.deleteOne(Tweet);
exports.delete_allTweets = Factory.deleteAll(Tweet);

// reset();

//
