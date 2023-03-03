import { post,del } from '../../api/api.js';
import message_content_view from '../../../View/Components/message/message_list_view.js';

let view;
const section_message = document.querySelector('.message-content');

export const scroll_to_message_position_in_messagelist = (message_id)=>view.scroll_to_chat_message_position(message_id)

const control_message_content = async(action, data_obj) => {
  const {data,chat_id} = data_obj;
  if (action === 'send-message') {const res = await post(`messages/${chat_id}`, data)
  view.render([res.data.docs])
};
  if (action === 'delete-message') del(`messages/chat/${data_obj.chat_id}/message/${data_obj.message_id}`);
};

if (section_message) {
   view = new message_content_view();
  view.handle_message(control_message_content);
}
