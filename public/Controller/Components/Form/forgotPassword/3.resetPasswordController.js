import ResetPasswordView from '../../../../View/Form/ForgotPassword/3.ResetPasswordView.js';

import { post } from '../../../api/api.js';

const resetPasswordForm = document.querySelector(
  '.form--forgotPassword[data-action="reset-password"]'
);

const controlResetPassword = async (data) => {
  //   const email = location.search.split('&')[0].split('email=')[1];
  await post(`auth/forgotPasswordResetPassword`, data, '/');
};

if (resetPasswordForm) {
  const View = new ResetPasswordView();

  // handler
  View.addHandlerSubmitForm(controlResetPassword);
}
