/* eslint-disable camelcase */
const mongoose = require('mongoose');

// group by user to limit data loaded when search by user
// 1000 -> 50

const notification_schema = new mongoose.Schema({
  // user id
  user_id: mongoose.Schema.Types.ObjectId,
  page: { type: Number, default: 0 },

  notifications: [
    {
      // can be [tweet,comment,user]'s id
      _id: mongoose.Schema.Types.ObjectId,

      type: {
        type: String,
        enum: ['like-tweet', 'like-comment', 'follow', 'tweet-create',"comment-on-tweet","reply-to-comment"],
        required: true,
      },

      // user which we are monitoring
      user: {
        _id: mongoose.Schema.Types.ObjectId,
        name: String,
        profilePic: String,
        avatar: String,
      },

      text: String,
    },
  ],
});

const notification = mongoose.model('notification', notification_schema);

module.exports = notification;
