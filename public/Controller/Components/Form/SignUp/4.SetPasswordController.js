import SetPasswordView from '../../../../View/Form/SignUp/4.SetPasswordView.js';
import { post } from '../../../api/api.js';

const signUpSetPassword = document.querySelector(
  '.form--signUp[data-action="set-password"]'
);

const controlSetPassword = async (data) => {
  const email = location.search.split('&')[0].split('email=')[1];


  

  await post(
    `auth/signUpSetPassword?email=${email}`,
    data,
    `/signUp/5?email=${email}`
  );
};

if (signUpSetPassword) {
  const View = new SetPasswordView();

  // handler
  View.addHandlerSubmitForm(controlSetPassword);
}
