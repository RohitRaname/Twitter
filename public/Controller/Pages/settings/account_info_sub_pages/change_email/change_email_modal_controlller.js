import { post, patch } from '../../../../api/api.js';

import change_email_modal_view from '../../../../../View/Pages/settings/account_info_sub_pages/change_email_page/change_email_modal_view.js';

const change_email_page = document.querySelector(
  '.form[data-form="setting-update-email"]'
);

let view;

export const show_change_email_modal_view = () => view.show();

const change_email = async (data) => {
  const res = await patch(`users/me`, data);
  if (res.status === 200) location.assign('/settings/account');

};

const control_modal = (action, data) => {
  if (action === 'change-email') change_email(data);
};

if (change_email_page) {
  view = new change_email_modal_view();
  view.add_handler_modal(control_modal);
}
