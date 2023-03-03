import cur_user_post_tweet_options_view from '../../../View/Components/Dropdown/cur_user_post_options_dropdown_view.js';
import {
  update_single_tweet_itemel_post_attr,
  remove_tweet_itemel_from_postedtweetlist,
  controlRenderPostedTweet,
} from '../Tweet/postedTweetController.js';

import { post, del } from '../../api/api.js';

let View;
const postDropdownEl = document.querySelector(
  '.dropdown[data-type="cur-user-post-options-dropdown"]'
);

export const display_cur_user_post_options_dropdown = (post_type, post_data) =>
  View.render_and_show_dropdown(post_type, post_data);

const control_tweet_options = (action, data) => {
  const { user_id, post_id, tweet_updated, post_format, tweet_data } = data;

  // i should have made me(without mentioning user id) and admin route(mentioning id)

  // correct route user/:user_id/tweets/remove

  // for admin to go with any user => users/18738937484/tweets/remove/
  // for me (cur-user) => users/me/tweets/remove

  // post ------------------------------------------
  if (action === 'delete-tweet') {
    remove_tweet_itemel_from_postedtweetlist(false, post_id);
    del(`users/tweets/remove/${post_id}/${post_format}`);
  }

  if (action === 'pin-tweet') {
    post(`users/tweets/pin/add/${post_id}`);
    remove_tweet_itemel_from_postedtweetlist(false, post_id);
    controlRenderPostedTweet([tweet_data]);
    // update_single_tweet_itemel_post_attr(
    //   post_id,
    //   tweet_updated.field,
    //   tweet_updated.value
    // );
  }

  if (action === 'unpin-tweet') {
    remove_tweet_itemel_from_postedtweetlist(false, post_id);
    controlRenderPostedTweet([tweet_data]);
    del(`users/tweets/pin/remove/${post_id}`);
  }
};
const control_comment_options = (action, data) => {};

const controlPostDropdownOptions = (action, data) => {
  const { post_type } = data;
  post_type === 'tweet'
    ? control_tweet_options(action, data)
    : control_comment_options(action, data);
};

if (postDropdownEl) {
  View = new cur_user_post_tweet_options_view();
  View.addHandlerDropdown(controlPostDropdownOptions);
}
