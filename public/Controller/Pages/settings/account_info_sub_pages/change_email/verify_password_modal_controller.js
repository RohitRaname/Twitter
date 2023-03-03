import { post, patch } from '../../../../api/api.js';

import verify_password_modal_view from '../../../../../View/Pages/settings/account_info_sub_pages/change_email_page/verify_password_modal_view.js';

import { show_change_email_modal_view } from './change_email_modal_controlller.js';

const change_email_page = document.querySelector(
  '.form[data-form="setting-update-email"]'
);

let view;

export const show_verify_email_modal_view = () => view.show();

// const change_email = async (data) => {
//   const res = await patch(`users/me`, data);
//   if (res.status === 200) location.assign('/settings/account');

// };

const verify_password = async (data) => {
  const { _id, password } = data;
  const res = await post(`auth/confirm-password/${_id}/${password}`);
  if (res.status === 200) show_change_email_modal_view();
};

const control_modal = (action, data) => {
  // if (action === 'change-email') change_email(data);
  if (action === 'verify-password') verify_password(data);
};

if (change_email_page) {
  view = new verify_password_modal_view();
  view.add_handler_modal(control_modal);
}
