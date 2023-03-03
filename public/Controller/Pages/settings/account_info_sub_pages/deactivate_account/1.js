import {del} from "../../../../api/api.js"
import deactivate_account_page_1_view from '../../../../../View/Pages/settings/account_info_sub_pages/deactivate_acccount/1.js';

const protect_account_form = document.querySelector(
  '.form[data-form="setting-deactivate--account-confirm-password"]'
);



const confirm_password_and_deactivate_account = async (action,data) => {
  const { password } = data;
  const res = await del(`auth/deactivate-account/me/${password}`);
  if (res.status === 200){
    
    location.assign('/');
    
  }
};

if (protect_account_form) {
  const view = new deactivate_account_page_1_view();

  view.add_handler_submit_btn(confirm_password_and_deactivate_account);
}
