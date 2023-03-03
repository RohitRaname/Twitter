/* eslint-disable camelcase */
const mongoose = require('mongoose');
const {readable_time} = require('../../utils/helperFunction')

// this one keep all the tweets so get newest update to show in news

// lookup join
// - reason => follow or followers keep increasing frequenctly
const TweetSchema = new mongoose.Schema(
  {
    // stats of tweet
    metadata: {
      like_count: { type: Number, default: 0 },
      retweet_count: { type: Number, default: 0 },
      comment_count: { type: Number, default: 0 },
    },

    user_id: { type: mongoose.SchemaTypes.ObjectId, required: true },
    // user_avatar: String,

    // if tweet is deleted then tweet is {active:false}
    active: { type: Boolean, default: true },
    pinned: { type: Boolean, default: false },

    user_details: {
      name: String,
      avatar: String,
      profilePic: String,
    },

    // tweet that are posted will be true or tweet that are schedule will be false
    // post: { type: Boolean, required: true },
    tweet_type: {
      type: String,
      enum: {
        values: [
          'draft-text',
          'draft-comment',
          'draft-quote',
          'schedule-text',
          'schedule-comment',
          'schedule-quote',
          'text',
          'retweet',
          'quote',
          'comment',
        ],
        message:
          "tweet_type should be one of these 'draft-text','draft-comment','draft-quote', 'schedule-text','schedule-comment','schedule-quote', 'post', 'retweet', 'quote-tweet'",
      },
      required: [true, 'tweet_type is required'],
    },

    text: {
      type: String,
      trim: true,
      maxLength: [180, 'words limit execcedded!!'],
    },

    audience_can_reply: {
      type: String,
      enum: {
        values: ['everyone', 'following', 'circle'],
        message:
          'reply audience should be one of these everyone,following,mention',
      },
      default: 'everyone',
    },
    target_audience: {
      type: String,

      enum: {
        values: ['everyone', 'circle'],
        message: 'reply audience should be one of these everyone,circle',
      },
      default: 'everyone',
    },

    //tweet_type= quote (posted_tweet)
    posted_tweet: {
      _id: mongoose.Schema.Types.ObjectId,
      text: String,
      upload_imgs: [String],
      ts: Date,
      user: {
        name: String,
        avatar: String,
        profilePic: String,
      },
    },

    // retweet (tweet which is retweeted)
    retweet_parent_id: mongoose.Schema.Types.ObjectId,
    retweet_parent_id_arr: [String],
    quote_tweet_parent_id: mongoose.Schema.Types.ObjectId,
    quote_tweet_parent_id_arr: [String],

    upload_imgs: [String],
    // if tweet schedule
    schedule_post_time: Date,
    // timestamp
    ts: { type: Date, default: new Date() },

    blocked_user_id_arr: [String],
    muted_user_id_arr: [String],
    circle_user_id_arr: [String],

    // temporary fields (used when tweets are retirive for user and see of user in tweet target audience or can reply to tweet)
    like_by_cur_user: Boolean,
    bookmark_by_cur_user: Boolean,
    retweet_by_cur_user: Boolean,
    quote_by_cur_user: Boolean,
    comment_by_cur_user: Boolean,
    follow_by_cur_user: Boolean,
    cur_user_can_reply: Boolean,
    mute_by_cur_user: Boolean,
    block_by_cur_user: Boolean,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

// to search for certain day tweets
// TweetSchema.index({ ts: 1, user_id: 1 });

// to search tweet by type
// TweetSchema.index({ tweet_type: 1 });

// to search for user tweets
TweetSchema.index({ user_id: 1 });
TweetSchema.index({ tweet_type: 1, ts: 1 });
TweetSchema.index({ active: 1 });

TweetSchema.virtual('ts_format').get(function () {
  if (this.posted_tweet.ts)
  this.posted_tweet.ts_format = readable_time(this.posted_tweet.ts);

  return readable_time(this.ts)

});

TweetSchema.pre(/^find/, function (next) {
  this.find({ active: true });
  next();
});

const TweetModel = mongoose.model('tweet', TweetSchema);
module.exports = TweetModel;

// profile
// meta
// detail
