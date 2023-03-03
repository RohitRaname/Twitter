/* eslint-disable no-restricted-syntax */
/* eslint-disable camelcase */
const mongoose = require('mongoose');
const sharp = require('sharp');
const multer = require('multer');

const ChatMessage = require('../../Model/message/chat_message_bw_users_model');
const try_catch = require('../../utils/tryCatchBlock');

const sendReq = require('../../utils/sendJSON');
const { readable_time } = require('../../utils/helperFunction');

const user_controller = require('../user/userController');
const db_message_controller = require('./db_message_controller');

const is_chat_page_messages_full = try_catch(async (chat_id) => {
  const chat_doc = await ChatMessage.findOne({
    chat_id,
  })
    .sort({ page: -1 })
    .exec();

  if (chat_doc.messages.length < 100)
    return {
      page_full: false,
      cur_page: chat_doc.page,
      chat_bw: chat_doc.chat_bw,
    };

  return {
    page_full: true,
    cur_page: chat_doc.page,
    chat_bw: chat_doc.chat_bw,
  };
});

// to start sharing of message to each other we need to create the path platform for message sharing
const create_chat_connection_bw_users = try_catch(async (users) => {
  const connection_id = mongoose.Types.ObjectId();
  const create_connection = ChatMessage.create({
    chat_bw: users,
    page: 0,
    active: true,
    chat_id: connection_id,
    ts: new Date(),
  });

  const add_chat_id_to_users = users.map((chat_bw_user) =>
    user_controller.handle_user_multiple_chat_id_arr(chat_bw_user._id, {
      $push: {
        chat_id_arr: connection_id,
        chat_user_id_arr: users.filter(
          (user) => user._id.toString() !== chat_bw_user._id.toString()
        )[0]._id,
      },
    })
  );

  const results = await Promise.all([create_connection, add_chat_id_to_users]);

  return results[0];
});

const send_message = try_catch(
  async (chat_id, from_id, to_user_doc, message_doc) => {
    // eslint-disable-next-line one-var


    const chat_page_messages_full = await is_chat_page_messages_full(chat_id);
    const { page_full, cur_page, chat_bw } = chat_page_messages_full;

    const chat_message_id = mongoose.Types.ObjectId();

    const chat_message = page_full
      ? ChatMessage.create({
          chat_id: chat_id,
          page: Number(cur_page) + 1,
          chat_bw: chat_bw,
          messages: [{ _id: chat_message_id, ...message_doc }],
        })
      : ChatMessage.findOneAndUpdate(
          {
            chat_id: chat_id,
            $expr: {
              $lt: [{ $size: '$messages' }, 100],
            },
          },
          {
            $push: { messages: { _id: chat_message_id, ...message_doc } },
          },
          { new: true }
        ).exec();

    const db_message_create = db_message_controller.create_message(
      chat_id,
      chat_message_id,
      from_id,
      to_user_doc,
      message_doc.text,
      message_doc.mute,
      chat_bw
    );

    const result = await Promise.all([chat_message, db_message_create]);

    // first one is still a promise new extract from arr we get whole consume obj

    return result[0].messages.slice(-1)[0];
  }
);

const update_chat_message = try_catch(async (chat_id, message_id, text) => {
  const update_chat_message = ChatMessage.findOneAndUpdate(
    {
      chat_id: chat_id,
      'messages._id': message_id,
    },
    {
      // first matching element  $ use find el arr
      $set: { 'messages.$.text': text, 'messages.$.ts': new Date() },
    },
    { new: true }
  ).exec();

  const update_db_message = db_message_controller.update_message(
    message_id,
    text
  );

  const result = await Promise.all([update_chat_message, update_db_message]);

  return result[0].messages.slice(-1)[0];
});

const delete_chat_message = try_catch(async (chat_id, message_id) => {
  const deleting_chat_message = ChatMessage.findOneAndUpdate(
    {
      chat_id: chat_id,

      // find arr el => id => simply find obj

      // arr el find
      'messages._id': message_id,
    },
    {
      // first matching element  $ use find el arr
      $set: { 'messages.$.active': false },
    },
    { new: true }
  ).exec();
  const delete_db_message = db_message_controller.delete_message(message_id);
  const result = await Promise.all([deleting_chat_message, delete_db_message]);
  return result[0].messages.slice(-1)[0];
});

const delete_chat_connection = try_catch(async (chat_id, user_id) => {
  const remove_chat_id_from_user =
    user_controller.handle_user_multiple_chat_id_arr(user_id, {
      $pull: {
        chat_id_arr: chat_id,
        pinned_chat_id_arr: chat_id,
        mute_chat_id_arr: chat_id,
      },
    });

  const delete_user_chat_bucket = ChatMessage.updateMany(
    {
      chat_id: chat_id,
      'chat_bw._id': user_id,
    },
    {
      // first matching element  $ use find el arr
      $set: { 'chat_bw.$.delete_chat': false },
    },
    { new: true }
  ).exec();

  const delete_all_chat_messages =
    db_message_controller.delete_all_chat_messages(chat_id, user_id);

  await Promise.all([
    remove_chat_id_from_user,
    delete_user_chat_bucket,
    delete_all_chat_messages,
  ]);

  // await ChatMessage.updateMany({chat_id:chat_id,"chat_bw._id":user_id},{$set:{"chat_bw.$.a"}})
});

const pin_unpin_chat = try_catch(async (chat_id, user_id, value) => {
  const result = await user_controller.handle_user_chat_id_arr(
    user_id,
    chat_id,
    'pinned_chat_id_arr',
    value
  );

  return result;
});
const mute_unmute_chat = try_catch(async (chat_id, user_id, value) => {
  const result = await user_controller.handle_user_chat_id_arr(
    user_id,
    chat_id,
    'mute_chat_id_arr',
    value
  );

  return result;
});

// return last 2 page doc chat of users
exports.get_chat_bw_users = try_catch(async (chat_id, user) => {

  const user_id = user._id;

  // const page_query = page ? { $lt: { page: Number(page) } } : {};

  let chat = await ChatMessage.aggregate([
    {
      $match: {
        chat_id: mongoose.Types.ObjectId(chat_id),
        // ...page_query,
      },
    },

    // { $sort: { page: -1 } },

    // { $limit: 2 },

    { $sort: { page: 1 } },

    {
      $set: {
        messages: {
          $filter: {
            input: '$messages',
            cond: {
              $switch: {
                branches: [
                  // cur user
                  {
                    case: {
                      $and: [
                        { $eq: ['$$this.from_id', user_id] },
                        { $eq: ['$$this.active', true] },
                      ],
                    },
                    then: true,
                  },

                  {
                    case: {
                      $and: [
                        { $ne: ['$$this.from_id', user_id] },
                        { $eq: ['$$this.active', true] },
                        { $eq: ['$$this.mute', false] },
                      ],
                    },
                    then: true,
                  },
                ],
                default: false,
              },
            },
          },
        },
      },
    },

    {
      $set: {
        messages: {
          $map: {
            input: '$messages',
            in: {
              $mergeObjects: [
                {
                  position: {
                    $cond: {
                      if: { $eq: ['$$this.from_id', user_id] },
                      then: 'right',
                      else: 'left',
                    },
                  },
                },
                '$$this',
              ],
            },
          },
        },
      },
    },

    {
      $unwind: { path: '$messages', preserveNullAndEmptyArrays: true },
    },

    {
      $group: {
        _id: { chat_id: '$chat_id', chat_bw: '$chat_bw' },
        messages: { $push: '$messages' },
        page: { $last: '$page' },
      },
    },

    {
      $addFields: {
        to_user: {
          $first: {
            $filter: {
              input: '$_id.chat_bw',
              cond: {
                $ne: ['$$this._id', user_id],
              },
            },
          },
        },
      },
    },

    {
      $project: {
        _id: 0,
        chat_id: '$_id.chat_id',
        messages: 1,
        to_user: 1,
        page: 1,
      },
    },

    // { $unset: 'chat_bw' },
  ]);

  if (chat.length === 0) return;
  chat = chat[0];

  if (chat.messages.length > 0)
    chat.messages = chat.messages.map((message) => {
      message.ts = readable_time(message.ts);
      return message;
    });

  return chat;
});
const update_chat_all_messages = try_catch(async (chat_id, from_id, query) => {
  const update_chat_messages = ChatMessage.updateMany(
    { chat_id },
    { $set: { 'messages.$[]': query } }
  );
  const update_db_messages = db_message_controller.update_all_messages(
    chat_id,
    from_id,
    query
  );

  await Promise.all([update_chat_messages, update_db_messages]);
});

// recent message (only 1)
exports.get_recent_chat_message = try_catch(async (chat_id, user_id) => {
  let recent_chat = await ChatMessage.aggregate([
    {
      $match: {
        chat_id: mongoose.Types.ObjectId(chat_id),
      },
    },

    { $sort: { page: -1 } },

    { $limit: 1 },

    {
      $set: {
        messages: {
          $filter: {
            input: '$messages',
            cond: {
              $switch: {
                branches: [
                  // cur user
                  {
                    case: {
                      $and: [
                        { $eq: ['$$this.from_id', user_id] },
                        { $eq: ['$$this.active', true] },
                      ],
                    },
                    then: true,
                  },

                  {
                    case: {
                      $and: [
                        { $ne: ['$$this.from_id', user_id] },
                        { $eq: ['$$this.active', true] },
                        { $eq: ['$$this.mute', false] },
                      ],
                    },
                    then: true,
                  },
                ],
                default: false,
              },
            },
          },
        },
        to_user: {
          $first: {
            $filter: {
              input: '$chat_bw',
              cond: { $ne: ['$$this._id', user_id] },
            },
          },
        },
      },
    },

    { $set: { message: { $last: '$messages' } } },

    {
      $project: {
        _id: 0,
        chat_id: 1,
        message: 1,
        to_user: 1,
      },
    },
  ]);

  if (recent_chat.length === 0) return;
  recent_chat = recent_chat[0];
  if (recent_chat.message)
    recent_chat.message.ts = readable_time(recent_chat.message.ts);

  return recent_chat;
});

const search_chat_message = try_catch(async (from_id, text, limit) => {
  // if i dont return stored source if will get me the full doc like 25 search match return 25 doc

  const messages = await db_message_controller.search_message(
    from_id,
    text,
    limit
  );

  return messages;
});

const search_future_chat_users = try_catch(async (cur_user, name, limit) => {
  const search_users = await user_controller.return_search_users(name, limit);

  const already_added_chat_user_ids = [
    cur_user._id.toString(),
    ...cur_user.chat_user_id_arr,
  ];


  return search_users.filter((search_user) =>
    already_added_chat_user_ids.every(
      (added_id) => added_id !== search_user._id.toString()
    )
  );

});

// const update_chat_message

// API -----------------------------------------------------
exports.api_create_chat_connection_bw_users = try_catch(
  async (req, res, next) => {
    const { users } = req.body;
    const establish_connection = await create_chat_connection_bw_users(users);
    return sendReq(res, 200, 'connection established', establish_connection);
  }
);

exports.api_send_message = try_catch(async (req, res, next) => {
  const { from_id, text, chat_id, upload_img, mute } = req.body;
  const to_user_doc = {};

  Object.keys(req.body).forEach((key) => {
    if (key.includes('to_user_doc'))
      to_user_doc[key.replace('to_user_doc_', '')] = req.body[key];
  });

  const message_doc = { text, from_id, upload_img, mute };
  if (upload_img === 'undefined') delete message_doc.upload_img;

  const message = await send_message(
    chat_id,
    from_id,
    to_user_doc,
    message_doc
  );

  return sendReq(res, 200, 'message send', message);
});

exports.api_update_chat_message = try_catch(async (req, res, next) => {
  const { chat_id, message_id } = req.params;
  const { text } = req.body;
  const message = await update_chat_message(chat_id, message_id, text);
  return sendReq(res, 200, 'message updated', message);
});

exports.api_delete_chat_message = try_catch(async (req, res, next) => {
  const { chat_id, message_id } = req.params;
  const message = await delete_chat_message(chat_id, message_id);
  return sendReq(res, 200, 'message deleted', message);
});

exports.api_get_chats_bw_users = try_catch(async (req, res, next) => {
  const { chat_id } = req.params;
  const { user } = req;
  const chats = await this.get_chat_bw_users(chat_id, user);
  return sendReq(res, 200, 'chat_bw', chats);
});

exports.api_search_chat_messages = try_catch(async (req, res, next) => {
  const { user_id, text, limit } = req.params;
  const messages = await db_message_controller.search_messages(
    user_id,
    text,
    limit
  );
  return sendReq(res, 200, 'messages', messages);
});

exports.api_delete_chat_connection = try_catch(async (req, res, next) => {
  const { chat_id } = req.params;
  const user_id = req.user._id;
  const result = await delete_chat_connection(chat_id, user_id, true);
  return sendReq(res, 200, `delete chat user`, result);
});

exports.api_pin_unpin_chat = try_catch(async (req, res, next) => {
  const { value, chat_id } = req.params;
  const user_id = req.user._id;

  const result = await pin_unpin_chat(chat_id, user_id, value);
  return sendReq(
    res,
    200,
    `${value === 'true' ? 'pinned' : 'unpinned'} chat`,
    result
  );
});
exports.api_mute_unmute_chat = try_catch(async (req, res, next) => {
  const { value, chat_id } = req.params;
  const user_id = req.user._id;

  const result = await mute_unmute_chat(chat_id, user_id, value);
  return sendReq(
    res,
    200,
    `${value === 'true' ? 'pinned' : 'unpinned'} chat`,
    result
  );
});
exports.api_update_all_chat_messages = try_catch(async (req, res, next) => {
  const { chat_id } = req.params;
  const user_id = req.user._id;
  const query = req.body;

  const result = await update_chat_all_messages(chat_id, user_id, query);
  return sendReq(res, 200, `update chat all messages`, result);
});
exports.api_search_future_chat_users = try_catch(async (req, res, next) => {
  const { name, limit } = req.params;

  const result = await search_future_chat_users(req.user, name, limit);
  return sendReq(res, 200, `update chat all messages`, result);
});

// - MULTER /////////////////////////////////////////////////////////////
const save_img = try_catch(async (file, dimension, filename) => {
  await sharp(file.buffer)
    .resize(...dimension)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/messages/${filename}`);
});

exports.resizeImages = try_catch(async (req, res, next) => {
  if (!req.files) return next();

  const img_promise = [];

  for (const file of req.files) {
    const filename = `message-${req.user.id}-${Date.now()}.jpeg`;
    req.body.upload_img = filename;
    img_promise.push(save_img(file, [1200, 1080], filename));
  }

  if (img_promise.length > 0) await Promise.all(img_promise);

  // req.body.profilePic = filename;

  next();
});
