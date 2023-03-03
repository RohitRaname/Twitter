import Non_login_user_page_view from '../../View/Pages/non_login_user_page_view.js';
import { show_add_existing_account_modal } from '../Components/Modal/add_existing_account_modal_controller.js';

const non_login_user_page = document.querySelector(
  'body[data-login-user="false"]'
);

export const control_non_login_user_page = (action) => {
  if (action === 'show-add-account-modal') show_add_existing_account_modal();
  if (action === 'redirect-to-signup-page') {
    location.assign('/join/signup');
  }

  if (action === 'follow' || action === 'follow-user');
};

if (non_login_user_page) {
  const View = new Non_login_user_page_view();
  View.add_handler_page(control_non_login_user_page);
}
