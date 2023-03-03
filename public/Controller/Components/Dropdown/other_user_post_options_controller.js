import PostDropdownOptions from '../../../View/Components/Dropdown/other_user_post_options_dropdown_view.js';
import { update_dom_posted_tweet_el_dataset_post_attr } from '../Tweet/postedTweetController.js';
import {
  update_cur_user_data_field_in_section_dataset,
  set_follow_or_following_button_active_state,
} from '../user_profile/user_profile_controller.js';
import { post, del } from '../../api/api.js';

let View;
const postDropdownEl = document.querySelector(
  '.dropdown[data-type="post-options-dropdown"]'
);

export const display_post_options_dropdown = (post_type, post_data) =>
  View.render_and_show_dropdown(post_type, post_data);

const control_tweet_options = (action, data) => {
  const { user_id, user_data, post_id, field, value } = data;

  update_dom_posted_tweet_el_dataset_post_attr(user_id, field, value, post_id);

  // set the follow or following in user profile page if it current open
  if (document.querySelector('.section-user-profile')) {
    if (action.includes('follow')) update_cur_user_data_field_in_section_dataset('follow_by_cur_user',value)
    if (action.includes('mute')) update_cur_user_data_field_in_section_dataset('mute_by_cur_user',value)
    if (action.includes('block')) update_cur_user_data_field_in_section_dataset('block_by_cur_user',value)


 

    if (action.includes('follow'))
      set_follow_or_following_button_active_state(value);
  }

  // post ------------------------------------------
  if (action === 'follow-user') {
    post(`users/following/follow/${user_id}`, { add_user: user_data });
  }

  if (action === 'mute-user')
    post(`users/mute-user/add/${user_id}`, { add_user: user_data });
  if (action === 'block-user')
    post(`users/block-user/add/${user_id}`, { add_user: user_data });

  if (action === 'block-tweet') {
    post(`users/block-tweet/add/${post_id}`);
    if (document.querySelector('.section-comment')) location.assign('/');
  }

  // delete ------------------------------------------
  if (action === 'unfollow-user') del(`users/following/unfollow/${user_id}`);
  if (action === 'unmute-user') del(`users/mute-user/remove/${user_id}`);
  if (action === 'unblock-user') del(`users/block-user/remove/${user_id}`);
};
const control_comment_options = (action, data) => {};

const controlPostDropdownOptions = (action, data) => {
  const { post_type } = data;
  post_type === 'tweet'
    ? control_tweet_options(action, data)
    : control_comment_options(action, data);
};

if (postDropdownEl) {
  View = new PostDropdownOptions();
  View.addHandlerDropdown(controlPostDropdownOptions);
}
