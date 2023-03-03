/* eslint-disable camelcase */
const mongoose = require('mongoose');

const tweet_schedule_schema = new mongoose.Schema(
  {
    _id: mongoose.SchemaTypes.ObjectId, // tweet_id
    user_id: mongoose.Schema.Types.ObjectId,
    type: String,
    post_at: Date,
  },
  {
    toObject: { virtual: true },
    toJSON: { virtual: true },
  }
);



tweet_schedule_schema.index({ post_at: -1 });
const tweet_schedule = mongoose.model('tweet_schedule', tweet_schedule_schema);

module.exports = tweet_schedule;
