import { patch } from '../../../api/api.js';
import change_password_page_view from '../../../../View/Pages/settings/account_info_sub_pages/change_password_page_view.js';

const change_password_page = document.querySelector(
  '.form[data-form="setting-change-password"]'
);

let view;

const control_page = async (action, data) => {
  if (action === 'change-password') {
    const res = await patch('auth/updateMyPassword', data);
    if (res.status !== 200) return view.show_cur_password_incorrect_error();
    location.assign('/settings/account')
  }
};

if (change_password_page) {
  view = new change_password_page_view();
  view.add_handler_form(control_page);
}
