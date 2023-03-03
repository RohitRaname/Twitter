/* eslint-disable camelcase */
const mongoose = require('mongoose');

const chat_bw_users_schema = new mongoose.Schema(
  {
    // both user are first on their own , with this we dont need to lookup for other user message

    chat_id: mongoose.Schema.Types.ObjectId,

    // user delete account
    chat_bw: [
      {
        // user_id

        _id: mongoose.Schema.Types.ObjectId,
        name: String,
        avatar: String,
        profilePic: String,

        delete_chat: { type: Boolean, default: false },
      },
    ],

    page: Number,

    //  100
    messages: [
      {
        from_id: mongoose.Schema.Types.ObjectId, // avatar
        text: String,
        upload_img: String,
        ts: { type: Date, default: new Date() },

        // delete message
        active: { type: Boolean, default: true },
        mute:{type:Boolean,default:false}

      },
    ],

    ts: { type: Date, default: new Date() },
  },
  { timestamps: true }
);

const chat_bw_users = mongoose.model('chat_bw_users', chat_bw_users_schema);
module.exports = chat_bw_users;
