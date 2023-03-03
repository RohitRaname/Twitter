const mongoose = require('mongoose');

const tweetLikeSchema = new mongoose.Schema(
  {
    tweet_id: {type:mongoose.Schema.Types.ObjectId,required:true},
    count: { type: Number, default: 0 },
    max_count: { type: Number, default: 50 },
    page: { type: Number, default: 0 },

    // tweet liked uses
    users: [
      {
        user_id: mongoose.Schema.Types.ObjectId,
        name: String,
        avatar: String,
        bio: String,
        profilePic: String,
      },
    ],
  },
  {
    toObject: { virtual: true },
    toJSON: { virtual: true },
    timestamps: true,
  }
);

const tweetLikeModel = mongoose.model('tweet_like_by', tweetLikeSchema);

module.exports = tweetLikeModel;
