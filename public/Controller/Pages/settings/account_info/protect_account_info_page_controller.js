import { post } from '../../../api/api.js';

import protect_account_info_view_page from '../../../../View/Pages/settings/account_info/protect_accountinfo_view_page.js';

const protect_account_form = document.querySelector(
  '.form[data-form="setting-confirm-password"]'
);

const redirect_to_forgot_password_page = () =>
  location.assign('/forgotPassword/0');

const confirm_password_and_redirect_to_account_info = async (data) => {
  const { _id, password } = data;
  const res = await post(`auth/confirm-password/${_id}/${password}`,{page:"settings"});
  if (res.status === 200) location.assign('/settings/account');
};

if (protect_account_form) {
  const view = new protect_account_info_view_page();
  view.add_handler_forgot_password_btn(redirect_to_forgot_password_page);
  view.add_handler_submit_btn(confirm_password_and_redirect_to_account_info);
}
