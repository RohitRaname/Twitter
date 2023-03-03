/* eslint-disable camelcase */
const mongoose = require('mongoose');

// group by user to limit data loaded when search by user
// 1000 -> 50

const user_activity_schema = new mongoose.Schema({
  // user id
  user_id: mongoose.Schema.Types.ObjectId,

  page: { type: Number, default: 0 },

  followers: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      name: String,
      avatar: String,
      bio: String,
      profilePic: String,
    },
  ],
  following: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      name: String,
      avatar: String,
      bio: String,
      profilePic: String,
    },
  ],
  circle: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      name: String,
      avatar: String,
      bio: String,
      profilePic: String,
    },
  ],

  // users which need to be notify when main user does some activity(create tweet)
  send_notification_to_user_id_arr: [{ _id: mongoose.Schema.Types.ObjectId }],
  get_notification_from_users: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      name: String,
      avatar: String,
      profilePic: String,
    },
  ],

  muted_user_id_arr: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      name: String,
      avatar: String,
      bio: String,
      profilePic: String,
    },
  ],
  blocked_user_id_arr: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      name: String,
      avatar: String,
      bio: String,
      profilePic: String,
    },
  ],
  bookmark_tweet_id_arr: [{ _id: mongoose.Schema.Types.ObjectId }],

  comment_tweet_id_arr: [{ _id: mongoose.Schema.Types.ObjectId }],

  // replies
  comment_id_arr: [{ _id: mongoose.Schema.Types.ObjectId }],
  like_comment_id_arr: [{ _id: mongoose.Schema.Types.ObjectId }],
  bookmark_comment_id_arr: [{ _id: mongoose.Schema.Types.ObjectId }],

  // like section
  like_tweet_id_arr: [{ _id: mongoose.Schema.Types.ObjectId }],

  posted_tweet_id_arr: [
    {
      _id: mongoose.Schema.Types.ObjectId,
    },
  ],
  retweet_quotetweet_parent_id_arr: [
    {
      _id: mongoose.Schema.Types.ObjectId,
    },
  ],
  block_tweet_id_arr: [
    {
      _id: mongoose.Schema.Types.ObjectId,
    },
  ],

  // store comment and tweet
  draft_tweets: [
    {
      // draft_text => no posted_tweet
      // draft_comment => posted tweet
      // draft quote=> posted tweet

      // mine reply

      text: String,
      upload_imgs: [String],
      tweet_type: {
        type: String,
        enum: ['draft-comment', 'draft-text', 'draft-quote'],
        required: true,
      },
      quote_tweet_parent_id_arr: [String],

      // comment type
      reply_to: [String],

      // posted tweet to which i will give reaction
      posted_tweet: {
        _id: mongoose.Schema.Types.ObjectId,
        text: String,
        ts: Date,
        reply_to: [String],

        upload_imgs: [String],
        user: {
          name: String,
          avatar: String,
          profilePic: String,
        },
      },
    },
  ],

  schedule_tweets: [
    {
      text: String,
      tweet_type: {
        type: String,
        enum: ['schedule-comment', 'schedule-text', 'schedule-quote'],
        required: true,
      },
      upload_imgs: [String],
      schedule_post_time: Date,
      quote_tweet_parent_id_arr: [String],
      reply_to: [String],

      // user imformation if it is comment or quote tweet
      posted_tweet: {
        _id: mongoose.Schema.Types.ObjectId,
        ts: Date,
        user: {
          name: String,
          avatar: String,
          profilePic: String,
        },
        text: String,
      },
    },
  ],

  // store simple keywords or search users
  search_keywords: [
    {
      type: { type: String, enum: ['text', 'user'], required: true },
      text: String,
      user: {
        _id: mongoose.Schema.Types.ObjectId,
        avatar: String,
        name: String,
        profilePic: String,
      },
    },
  ],

  pinned_tweet_id_arr: [{ _id: mongoose.Schema.Types.ObjectId }],
});

user_activity_schema.index({ user_id: 1, page: -1 }, { unique: true });
user_activity_schema.index({ user_id: 1, 'followers._id': -1 });
user_activity_schema.index({ user_id: 1, 'following._id': -1 });
user_activity_schema.index({ user_id: 1, 'circle._id': -1 });
user_activity_schema.index({ user_id: 1, 'send_notification_to_user_id_arr._id': -1 });
user_activity_schema.index({ user_id: 1, 'get_notification_from_users._id': -1 });
user_activity_schema.index({ user_id: 1, 'muted_user_id_arr._id': -1 });
user_activity_schema.index({ user_id: 1, 'blocked_user_id_arr._id': -1 });
user_activity_schema.index({ user_id: 1, 'bookmark_tweet_id_arr._id': -1 });
user_activity_schema.index({ user_id: 1, 'comment_tweet_id_arr._id': -1 });
user_activity_schema.index({ user_id: 1, 'comment_id_arr._id': -1 });
user_activity_schema.index({ user_id: 1, 'like_comment_id_arr._id': -1 });
user_activity_schema.index({ user_id: 1, 'bookmark_comment_id_arr._id': -1 });
user_activity_schema.index({ user_id: 1, 'like_tweet_id_arr._id': -1 });
user_activity_schema.index({ user_id: 1, 'posted_tweet_id_arr._id': -1 });
user_activity_schema.index({ user_id: 1, 'retweet_quotetweet_parent_id_arr._id': -1 });
user_activity_schema.index({ user_id: 1, 'block_tweet_id_arr._id': -1 });


user_activity_schema.index({ user_id: 1, 'draft_tweets._id': -1 });
user_activity_schema.index({ user_id: 1, 'schedule_tweets._id': -1 });
user_activity_schema.index({ user_id: 1, 'search_keywords._id': -1 });
user_activity_schema.index({ user_id: 1, 'pinned_tweet_id_arr._id': -1 });









user_activity_schema.index({ user_id: 1, 'block_tweet_id_arr._id': -1 });
user_activity_schema.index({ user_id: 1, 'comment_id_arr._id': -1 });
user_activity_schema.index({ user_id: 1, 'draft_tweets._id': -1 });
user_activity_schema.index({ user_id: 1, 'schedule_tweets._id': -1 });

const user_activity_bucket = mongoose.model(
  'user_activity',
  user_activity_schema
);

module.exports = user_activity_bucket;
