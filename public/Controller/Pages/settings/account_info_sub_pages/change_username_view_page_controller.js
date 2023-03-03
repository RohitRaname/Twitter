import { patch } from '../../../api/api.js';

import change_username_view_page from '../../../../View/Pages/settings/account_info_sub_pages/change_username_page_view.js';

const change_username_page = document.querySelector(
  '.form[data-form="setting-update-username"]'
);

const change_username = async (data) => {
  const res = await patch(`users/me`, data);
  if (res.status === 200) location.assign('/settings/account');
};

const control_form = (action, data) => {
  if (action === 'change-username') change_username(data);
};

if (change_username_page) {
  const view = new change_username_view_page();
  view.add_handler_form(control_form);
}
