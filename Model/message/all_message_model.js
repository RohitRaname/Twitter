/* eslint-disable camelcase */
const mongoose = require('mongoose');

const message_schema = new mongoose.Schema(
  {
    // both user are first on their own , with this we dont need to lookup for other user message

    chat_id: mongoose.Schema.Types.ObjectId,
    chat_message_id: mongoose.Schema.Types.ObjectId,

    from_id: mongoose.Schema.Types.ObjectId, // avatar
    chat_user_ids: [String],

    // user delete account
    to_user: {
      _id: mongoose.Schema.Types.ObjectId,
      name: String,
      avatar: String,
      profilePic: String,
    },

    //  100
    text: String,
    ts: { type: Date, default: new Date() },

    active: { type: Boolean, default: true },
    mute: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

message_schema.pre(/^find/, function (next) {
  this.find({ active: true });
  next();
});

const message = mongoose.model('all_chat_message', message_schema);
module.exports = message;
