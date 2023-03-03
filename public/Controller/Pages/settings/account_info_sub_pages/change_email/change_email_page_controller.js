import change_email_page_view from '../../../../../View/Pages/settings/account_info_sub_pages/change_email_page/change_email_page_view.js';

import { show_verify_email_modal_view } from './verify_password_modal_controller.js';

const change_email_page = document.querySelector(
  '.form[data-form="setting-update-email"]'
);


if (change_email_page) {
  const view = new change_email_page_view();
  view.add_handler_show_change_email_modal_btn(show_verify_email_modal_view);
}
