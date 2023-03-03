import add_existing_account_modal_view from '../../../View/Components/Modal/add_existing_account_modal_view.js';
import { insert_account_in_logout_dropdownlist } from '../Dropdown/user_logout_dropdown.js';

import { post } from '../../api/api.js';
const login_user = document.querySelector(
  'body[data-login-user="true"]'
);
const add_existing_account_modal = document.querySelector(
  '.form[data-form="add-existing-accounts"]'
);

let View;

export const show_add_existing_account_modal = () => View.show();
export const hide_add_existing_account_modal = (empty_inputs_value) =>
  View._hide(empty_inputs_value);

const submit_form = async (data) => {
  if (!login_user) {
    data.nameOrEmail = data.name_or_email;
    const res = await post('auth/loginConfirm', data);
    if (res.status === 200) location.assign('/');
    hide_add_existing_account_modal(true);
    return;
  }
  
  //   const email = location.search.split('&')[0].split('email=')[1];
  
  const res = await post(`auth/me/add-another-account`, data);
  if (res.status === 200) {
    insert_account_in_logout_dropdownlist([res.data.docs]);
    hide_add_existing_account_modal(true);
  }
};

const redirect_to_forgot_password_page = () => {
  location.assign('/forgotPassword/0');
};

const redirect_to_signup_page = () => {
  location.assign('/join/signup');
};

if (add_existing_account_modal) {
  View = new add_existing_account_modal_view();

  // handler
  View.addHandlerSubmitForm(submit_form);
  View.addHandlerForgotPasswordBtn(redirect_to_forgot_password_page);
  View.click_on_show_signup_formbtn(redirect_to_signup_page);
}
