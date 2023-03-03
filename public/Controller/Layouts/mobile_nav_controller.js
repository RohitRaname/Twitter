import { get } from '../api/api.js';

import Mobile_nav_view from '../../View/Layouts/mobile_nav_view.js';
import { show_customize_twitter_modal } from '../Components/Modal/customize_twitter_modal_controller.js';
import { display_follow_following_modal } from '../Components/Modal/followOrfollowingModalController.js';
import { show_add_existing_account_modal } from '../Components/Modal/add_existing_account_modal_controller.js';
import { show_manage_existing_account_modals } from '../Components/Modal/manage_existing_accounts_modal_controller.js';

const mobile_nav = document.querySelector('.mobile-nav');

const control_mobile_nav = async (action, data) => {
  if (action === 'show-manage-accounts-modal')
    show_manage_existing_account_modals();

  if (action === 'show-follow-following-modal')
    display_follow_following_modal(data.user_type, data.user);
  if (action === 'show-customize-twitter-modal') show_customize_twitter_modal();

  if (action === 'logout') {
    await get('auth/logout');
    location.assign('/');
  }
};

if (mobile_nav) {
  const View = new Mobile_nav_view();
  View.add_handler_mobile_nav(control_mobile_nav);
}
