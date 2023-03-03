import UserPreview from '../../../View/Components/Preview/userPreview.js';
import { display_follow_following_modal } from '../Modal/followOrfollowingModalController.js';
import { get, post, del } from '../../api/api.js';
import { update_login_signup_modal_content_and_show } from '../Modal/login_signup_modal_controller.js';

let View;
const userPreviewEl = document.querySelector(
  '.preview[data-type="user-preview"]'
);

const login_user = document.querySelector('body[data-login-user="true"]');

const control_set_user_info_in_preview_and_display_preview = async (data) => {
  // el => tweet_preview_el
  const { el, user_id } = data;
  const res = await get(`users/restrict-fields/${user_id}`);

  View.set_user_info_in_tweet_and_display_user_preview(el, res.data.docs);
};

const controlUserPreview = async (action, data) => {
  if (action === 'set-user-info-in-preview')
    control_set_user_info_in_preview_and_display_preview(data);

  // user avatar
  const { avatar, user_id, user_data } = data;
  if (action === 'redirect-to-user') location.assign(`/users/${avatar}`);

  if (action === 'show-user-following') {
    View.hide();
    display_follow_following_modal('following', data);
  }

  if (action === 'show-user-followers') {
    View.hide();
    display_follow_following_modal('followers', data);
  }

  if (action === 'show-login-signup-modal')
    update_login_signup_modal_content_and_show('follow', data.name);

  if (action === 'follow-user') {
    post(`users/following/follow/${user_id}`, { add_user: user_data });
  }
  if (action === 'unfollow-user') del(`users/following/unfollow/${user_id}`);
};

if (userPreviewEl) {
  View = new UserPreview();

  View.addHandlerPreviewWidnow(controlUserPreview);
}
