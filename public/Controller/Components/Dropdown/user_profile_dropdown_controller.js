import user_profile_dropdown_view from '../../../View/Components/Dropdown/user_profile_options_dropdown.js';
import { post, del } from '../../api/api.js';
import { update_dom_posted_tweet_el_dataset_post_attr } from '../Tweet/postedTweetController.js';
import { update_cur_user_data_in_section_dataset } from '../user_profile/user_profile_controller.js';

let View;
const user_profile_dropdown = document.querySelector(
  '.dropdown[data-type="user-profile-options-dropdown"]'
);

// data=> name,avatar,cur_user_mute
export const display_user_profile_options_dropdown = (data) =>
  View.render_and_show_dropdown(data);

const control_user_profile_dropdown = async(action, data,field,value) => {
  const { _id: user_id } = data;

  update_cur_user_data_in_section_dataset(data);
  update_dom_posted_tweet_el_dataset_post_attr(user_id,field,value)
  // post ------------------------------------------

  if (action === 'mute-user')
    post(`users/mute-user/add/${user_id}`, { add_user: data });
  if (action === 'block-user'){

    await post(`users/block-user/add/${user_id}`, { add_user: data });
    // location.assign('/')
    
  }

  // delete ------------------------------------------
  if (action === 'unmute-user') del(`users/mute-user/remove/${user_id}`);
  if (action === 'unblock-user') del(`users/block-user/remove/${user_id}`);
};

if (user_profile_dropdown) {
  View = new user_profile_dropdown_view();
  View.addHandlerDropdown(control_user_profile_dropdown);
}
