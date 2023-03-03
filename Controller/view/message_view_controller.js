/* eslint-disable camelcase */
const message_controller = require('../message/chat_controller');
const try_catch = require('../../utils/tryCatchBlock');
const sendReq = require('../../utils/sendJSON');
const { default: mongoose } = require('mongoose');

const basic_page_data = try_catch(
  async (cur_chat_id, full_user, restrict_user) => {
    const { chat_id_arr, mute_chat_id_arr, pinned_chat_id_arr } = full_user;

    const user = {
      ...restrict_user,
      chat_id_arr,
      mute_chat_id_arr,
      pinned_chat_id_arr,
    };

    const user_id = user._id;
    // const user_has_ever_chated = chat_id_arr.length ? true : false;
    let current_chat, all_recent_chat_message;

    if (chat_id_arr.length > 0) {
      // current chat
      const get_first_chat = message_controller.get_chat_bw_users(
        cur_chat_id,
        user
      );

      // all chats only one 1 recent message
      const get_all_chats_recent_message = chat_id_arr.map((chat_id) =>
        message_controller.get_recent_chat_message(chat_id, user_id)
      );

      const result = await Promise.all([
        get_first_chat,
        ...get_all_chats_recent_message,
      ]);

      current_chat = result[0];
      all_recent_chat_message = result.slice(1);

      const other_user_that_we_are_chating = await mongoose
        .model('user')
        .findOne({ _id: current_chat.to_user._id });

      current_chat.muted_by_other_chat_user =
        other_user_that_we_are_chating.mute_chat_id_arr.some(
          (chat_id) => chat_id === cur_chat_id
        );

      // user which we are talking to if he mute me then i mute wont reach to him until he unmute me
    }

    return {
      current_chat: current_chat || false,
      user,
      all_recent_chat_message: all_recent_chat_message || [],
    };
  }
);

// simple preview of all users message
exports.render_preview_page = try_catch(async (req, res, next) => {
  // eslint-disable-next-line camelcase

  const { current_chat, user, all_recent_chat_message } = await basic_page_data(
    req.user.chat_id_arr[0],
    req.user,
    req.restrict_user.cur_user
  );

  return res.render('pages/message_page', {
    current_chat,
    all_recent_chat_message,
    ...req.restrict_user,
    cur_user: user,
    login_user: req.login_user,
    page:"message"
  });
});

// show chat with the to user
exports.render_chat_message = try_catch(async (req, res, next) => {
  // eslint-disable-next-line camelcase

  const { chat_id } = req.params;

  const { current_chat, user, all_recent_chat_message } = await basic_page_data(
    chat_id,
    req.user,
    req.restrict_user.cur_user
  );

  return res.render('pages/message_page', {
    current_chat,
    all_recent_chat_message,
    ...req.restrict_user,
    login_user: req.login_user,
    cur_user: user,
    page:"message"
  });
});
