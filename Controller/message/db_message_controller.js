/* eslint-disable camelcase */

const Message = require('../../Model/message/all_message_model');
const try_catch = require('../../utils/tryCatchBlock');
const { readable_time } = require('../../utils/helperFunction');

exports.create_message = try_catch(
  async (
    chat_id,
    chat_message_id,
    from_id,
    to_user_doc,
    message_text,
    mute,
    chat_bw_users
  ) => {
    await Message.create({
      chat_id: chat_id,
      chat_message_id: chat_message_id,
      from_id: from_id,
      text: message_text,
      mute: mute,
      to_user: to_user_doc,
      chat_user_ids: chat_bw_users.map((user) => user._id),
    });
  }
);

exports.update_message = try_catch(async (chat_message_id, text) => {
  const message_updating = await Message.findOneAndUpdate(
    {
      chat_message_id,
    },
    {
      // first matching element  $ use find el arr
      $set: { text },
    },
    { new: true }
  ).exec();
});

exports.delete_message = try_catch(async (chat_message_id) => {
  const message_deleting = await Message.findOneAndUpdate(
    {
      chat_message_id: chat_message_id,
    },
    {
      // first matching element  $ use find el arr
      $set: { active: false },
    },
    { new: true }
  ).exec();
});

exports.delete_all_chat_messages = try_catch(async (chat_id, user_id) => {
  const deactivate__account = await Message.updateMany(
    {
      chat_id: chat_id,
      from_id: user_id,
    },
    {
      // first matching element  $ use find el arr
      $set: { active: false },
    },
    { new: true }
  ).exec();

  return deactivate__account;
});

exports.search_messages = try_catch(async (from_id, text, limit) => {
  // if i dont return stored source if will get me the full doc like 25 search match return 25 doc


  const messages = await Message.aggregate([
    {
      $search: {
        compound: {
          must: [
            {
              text: {
                path: 'chat_user_ids',
                query: from_id,
              },
            },
            {
              equals: {
                path: 'active',
                value: true,
              },
            },
          ],
          should: [
            {
              autocomplete: {
                path: 'text',
                query: text,
                fuzzy: { prefixLength: 2 },
              },
            },
            {
              text: {
                path: 'text',
                query: text,
                score: { boost: { value: 2 } },
              },
            },
          ],
          minimumShouldMatch: 1,
        },

        highlight: {
          path: 'text',
        },
      },
    },

    {
      $match: {
        $expr: {
          $switch: {
            branches: [
              // cur user
              {
                case: {
                  $and: [
                    { $eq: ['$from_id', from_id] },
                    { $eq: ['$active', true] },
                  ],
                },
                then: true,
              },

              {
                case: {
                  $and: [
                    { $ne: ['$from_id', from_id] },
                    { $eq: ['$active', true] },
                    { $eq: ['$mute', false] },
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

    {
      $limit: Number(limit),
    },

    {
      $project: {
        highlights: { $meta: 'searchHighlights' },
        score: { $meta: 'searchScore' },
        chat_id: 1,
        chat_message_id: 1,
        to_user: 1,
        text: 1,
        _id: 0,
        ts: 1,
      },
    },

    {
      $set: {
        highlight_text: { $first: '$highlights.texts' },
      },
    },

    { $unset: ['score', 'highlights'] },
  ]);

  if (messages.length === 0) return [];

  return messages.map((message) => {
    message.ts = readable_time(message.ts);
    return message;
  });
});

exports.update_all_messages = try_catch(async (chat_id, from_id, query) => {
  await Message.updateMany({ chat_id, from_id }, { $set: query });
});
