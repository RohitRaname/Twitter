import { post, del, get } from '../../api/api.js';
import message_add_chat_user_modal_view from '../../../View/Components/message/message_add_chat_user_modal.js';

let view;
const section_message = document.querySelector('.message-content');

export const show_add_chat_user_modal =()=> view.show()

const render_future_chat_users = async (data) => {
  const { word, cur_user_id } = data;

  // i can't understand the route due to no field mention
  const res = await get(`messages/me/search-future-chat-users/${word}/12`);


  view.render(res.data.docs || []);
};

export const scroll_to_message_position_in_messagelist = (message_id) =>
  view.scroll_to_chat_message_position(message_id);

const control_add_chat_user = async (action, data) => {

  if (action === 'search-future-chat-users') render_future_chat_users(data);

  if (action === 'initiate-chat') {
    const res = await post(`messages/initiate-chat`, data);

    const chat = res.data.docs;
    location.assign(`/messages/chat/${chat.chat_id}`);
  }
};

if (section_message) {
  view = new message_add_chat_user_modal_view();
  view.add_handler_modal(control_add_chat_user);
}
