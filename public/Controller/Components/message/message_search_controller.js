import { get } from '../../api/api.js';

import message_search_view from '../../../View/Components/message/message_search_view.js';
import { scroll_to_message_position_in_messagelist } from './message_content_controller.js';
import { show_add_chat_user_modal } from './message_add_chat_user_modal.js';

const section_message = document.querySelector('.section-message');

let view;

const render_search_messages = async (data) => {
  const { word, cur_user_id } = data;

  // i can't understand the route due to no field mention
  const res = await get(`messages/search/${cur_user_id}/${word}/25`);


  view.render(res.data.docs || []);
};

const control_message_search = (action, data) => {

  if (action === 'show-add-chat-user-modal') show_add_chat_user_modal();

  if (action === 'search-message') render_search_messages(data);


  if (!data) return;
  const { chat_id, message_id } = data;
  if (action === 'scroll-to-chat-message-position') {
  }
  scroll_to_message_position_in_messagelist(message_id);

  // we only  load 2 pages worth of chat so if that message is from before 2 pages message then we need to load that message page and scroll it to that place
  if (action === 'load-message-in-cur-chat-and-scroll-to-chat-mesage-position');

  
  if (action === 'load-other-chat-and-scroll-to-chat-message-position') {
    location.assign(`/messages/chat/${chat_id}`);
    setTimeout(
      () => scroll_to_message_position_in_messagelist(message_id),
      1500
    );
  }
};

if (section_message) {
  view = new message_search_view();
  view.add_handler_message_search(control_message_search);
}
