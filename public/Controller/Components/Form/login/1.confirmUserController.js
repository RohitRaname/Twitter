import ConfirmLoginView from '../../../../View/Form/Login/1.ConfirmUserView.js';

import { post } from '../../../api/api.js';

const confirmLoginUserForm = document.querySelector(
  '.form--login[data-action="enter-password"]'
);

const controlLoginUser = async (data) => {
  //   const email = location.search.split('&')[0].split('email=')[1];
  await post(`auth/loginConfirm`, data, '/');
};

const controlForgotPassword = () => {
  location.assign('/forgotPassword/0');
};

const show_signup_form = () => {
  location.assign('/join/signup');

  
};

if (confirmLoginUserForm) {
  const View = new ConfirmLoginView();

  // handler
  View.addHandlerSubmitForm(controlLoginUser);
  View.addHandlerForgotPasswordBtn(controlForgotPassword);
  View.click_on_show_signup_formbtn(show_signup_form);
}
