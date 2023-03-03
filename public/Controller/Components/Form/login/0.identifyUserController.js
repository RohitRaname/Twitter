import IdentifyUserView from '../../../../View/Form/Login/0.IdentifyUserView.js';

import { post } from '../../../api/api.js';

const IdentifyUserForm = document.querySelector(
  '.form--login[data-action="login-with-email-or-name"]'
);

const controlIdentifyUser = async (data) => {
  //   const email = location.search.split('&')[0].split('email=')[1];
  const res = await post(`auth/loginIdentifyUser`, data);
  location.assign(`/login/confirmUser?q=${res.data.docs.nameOrEmail}`);
};

const controlForgotPassword = () => {
  location.assign('/forgotPassword/0');
};

if (IdentifyUserForm) {
  const View = new IdentifyUserView();

  // handler
  View.addHandlerSubmitForm(controlIdentifyUser);
  View.addHandlerForgotPasswordBtn(controlForgotPassword);
}
