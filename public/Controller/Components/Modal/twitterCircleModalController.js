import TwitterCircleModalView from '../../../View/Components/Modal/TwitterCircleModalView.js';
import { del, post, get } from '../../api/api.js';
import {
  update_circle_count,
  increase_or_decrease_circle_count,
} from '../Preview/0.chooseAudiencePreviewController.js';
import { load_more_docs } from './common_modal_controller.js';

let View;

const TwitterCircleModalEl = document.querySelector(
  ".modal[data-modal='edit-circle']"
);

// first section means  we can remove the selected doc(remove btn)
// second section where we add the doc(add btn)
const renderSectionList = (
  section,
  user_arr,
  insert_in_first_section = false
) => {
  View.render(section, user_arr, insert_in_first_section);
};

export const display_circle_modal = () => {
  render_section('my-circle');
  render_section('recomment-circle');
  View.show();
};
export const hide_circle_modal = () => View.hide();

// const go_to_home = () => location.assign('/');

const render_section = async (section, page = 0) => {
  if (section === 'my-circle') {
    const res = await get(`users/circle/my-circle/page/0/limit/12`);
    update_circle_count(res.data.docs.length);
    renderSectionList('my-circle', res.data.docs, true);
  }

  if (section === 'recommend-circle') {
    renderSectionList('recommend-circle', []);
  }
};

const go_to_user_page = (avatar) => location.assign(`/users/${avatar}`);

const add_user_to_circle = async (user_data) => {
  await post(`users/circle/add/user/${user_data._id}`, {
    add_user: user_data,
  });
  increase_or_decrease_circle_count(1);
};

const remove_user_from_circle = async (user_id) => {
  await del(`users/circle/remove/user/${user_id}`);
  increase_or_decrease_circle_count(-1);
};

// search recommend users
const display_search_recommend_users = async (data) => {
  const { page } = data;
  const users = await get(
    `users/circle/recommend-circle/${data.name}/page/0/limit/12`
  );
  renderSectionList(data.section, users.data.docs);
};

// remove/add to twitter circle
// redirect to clicked user
const controlTwitterCircleModal = async (action, data) => {

  // if (action === 'redirect-to-section') render_section(data.section);

  // search user
  if (action === 'display-recommend-users')
    display_search_recommend_users(data);

  // user detail
  const { userId: _id, avatar, name, profilePic } = data;

  if (action === 'redirect-to-user') go_to_user_page(avatar);

  if (action === 'add-user-to-circle')
    add_user_to_circle({ _id, avatar, name, avatar });
  // ---------------------------
  if (action === 'remove-user-from-circle') remove_user_from_circle(_id);

  if (action === 'load-more-docs') {
    const { section, page,name } = data;

    const res = section==="my-circle"? await get(`users/circle/${section}/page/${page}/limit/12`):await get(`users/circle/${section}/${name}/page/${page}/limit/12`);
    return res.data.docs;
  }
};

if (TwitterCircleModalEl) {
  View = new TwitterCircleModalView();
  View.addHandlerModal(controlTwitterCircleModal);
}
