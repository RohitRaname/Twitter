import FollowOrFollowingModalView from '../../../View/Components/Modal/FollowOrFollowingModalView.js';

import { del, post, get } from '../../api/api.js';

const followOrFollowingModalEl = document.querySelector(
  ".modal[data-modal='follow-or-following']"
);
let View;

// first section means  we can remove the selected doc(remove btn)
// second section where we add the doc(add btn)
const render_and_display_section = (
  section,
  user_arr,
  insert_in_first_section = false
) => {
  View.render(section, user_arr, insert_in_first_section);
  View.show(section);
};
export const display_follow_following_modal = (section_display, data) => {
  View.set_user_name_and_avatar_at_header(data.name, data.avatar,data.user_id||data._id);
  render_section(section_display, data.user_id || data._id, 0);
};
export const hide_follow_following_modal = () => View.hide();

// const go_to_home = () => location.assign('/');

const render_section = async (section, user_id, page = 0) => {
  console.log(section);
  console.log('getting-data');
  if (section === 'following') {
    const res = await get(`users/following/${user_id}/page/${page}/limit/12`);
    render_and_display_section('following', res.data.docs);
  }

  if (section === 'followers') {
    const res = await get(`users/followers/${user_id}/page/${page}/limit/12`);
    render_and_display_section('followers', res.data.docs);
  }
};

const go_to_user_page = (avatar) => location.assign(`/users/${avatar}`);

const follow_user = async (user_data) => {
  await post(`users/following/follow/${user_data._id}`, {
    add_user: user_data,
  });
};

const unfollow_user = async (user_id) => {
  await del(`users/following/unfollow/${user_id}`);
};

// remove/add to twitter circle
// redirect to clicked user
const control_follow_following_modal = async (action, data) => {
  // user detail

  if (action === 'load-more-docs') {
    const { section, page } = data;
    const res = await get(`users/${section}/page/${page}/${limit}`);
    return res.data.docs;
  }

  //////////////////////////////////////////////////////////
  const { userId: _id, avatar, name, profilePic } = data;
  if (action === 'redirect-to-user') go_to_user_page(avatar.slice(1));

  if (action === 'follow') follow_user({ _id, avatar, name, avatar });
  // ---------------------------
  if (action === 'unfollow') unfollow_user(_id);

  if (action === 'redirect-to-section') render_section(data.section,data.user_id,0);
};

if (followOrFollowingModalEl) {
  View = new FollowOrFollowingModalView();
  View.handleModal(control_follow_following_modal);
}
