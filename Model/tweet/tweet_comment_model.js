/* eslint-disable camelcase */
const mongoose = require('mongoose');
const { readable_time } = require('../../utils/helperFunction');

const comment_schema = new mongoose.Schema({
  tweet_id: mongoose.Schema.Types.ObjectId,
  level: { type: Number, default: 1 },

  author: {
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    avatar: String,
    profilePic: String,
  },

  metadata: {
    like_count: { type: Number, default: 0 },
    bookmark_count: { type: Number, default: 0 },
  },
  upload_imgs: [String],
  text: String,

  // can be top level tweet comment or comment's reply
  reply_to: [String],
  parent_id: mongoose.Schema.Types.ObjectId,
  ancestors_id: [mongoose.Schema.Types.ObjectId],
  child_comments_count: { type: Number, default: 0 },

  ts: { type: Date, default: new Date() },
  schedule_post_time: Date,

  active: { type: Boolean, default: true },

  // if level 2 and greater
  reply: {
    _id: mongoose.Schema.Types.ObjectId,

    author: {
      _id: mongoose.Schema.Types.ObjectId,
      name: String,
      avatar: String,
      profilePic: String,
    },
    text: String,
    ts: Date,
    upload_imgs: [String],
    reply_to: [String],
    child_comments_count: { type: Number, default: 0 },
    // reply_to: [{ _id: mongoose.Schema.Types.ObjectId, avatar: String }],

    metadata: {
      like_count: { type: Number, default: 0 },
      bookmark_count: { type: Number, default: 0 },
    },
  },

  like_by_cur_user:Boolean,
  comment_by_cur_user:Boolean,
  bookmark_by_cur_user:Boolean,
});

comment_schema.pre(/^find/, function (next) {
  this.find({ active: true });
  next();
});

comment_schema.virtual('ts_format').get(function () {
  // if (Number(this.child_comments_count) > 0)
  //   this.reply.ts_format = readable_time(this.reply.ts_format);
  return readable_time(this.ts);
});

const comment = mongoose.model('comment', comment_schema);

module.exports = comment;
