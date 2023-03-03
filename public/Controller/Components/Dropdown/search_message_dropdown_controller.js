import search_message_dropdown_view from '../../../View/Components/Dropdown/search_message_options_dropdown_view.js';
import { post, del,patch } from '../../api/api.js';

let View;
const search_message_dropdown = document.querySelector(
  '.dropdown[data-type="search-message-dropdown"]'
);

const control_search_message_result = async (action, data) => {

  const { chat_id, value } = data;

  if (action === 'mute-chat')
    patch(`messages/mute/chat-id/${chat_id}/value/${value}`);
  if (action === 'pin-chat')
    patch(`messages/pin/chat-id/${chat_id}/value/${value}`);
  if (action === 'delete-chat') {await del(`messages/chat/${chat_id}`)
  location.reload()
};
};

if (search_message_dropdown) {
  View = new search_message_dropdown_view();
  View.addHandlerDropdown(control_search_message_result);
}
