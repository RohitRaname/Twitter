import deactivate_account_page_0_view from '../../../../../View/Pages/settings/account_info_sub_pages/deactivate_acccount/0.js';
const deactivate_account_page_0 = document.querySelector(
    '.section[data-page="settings-deactivate-account-0"]'
  );

let view;

const control_page = async (action, data) => {
   if(action==='redirect-to-deactivate-page-1') location.assign('/settings/account/deactivate-account/1')

};

if (deactivate_account_page_0) {
  view = new deactivate_account_page_0_view();
  view.add_handler_form(control_page);
}
