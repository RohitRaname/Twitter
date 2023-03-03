import SignUpVerificationView from '../../../../View/Form/SignUp/3.SignUpVerificationView.js';
import { post, get } from '../../../api/api.js';

const signUpVerificationForm = document.querySelector(
  '.form--signUp[data-action="signUp-verification"]'
);

const controlVerifyAccount = async (token) => {

  await post(
    `auth/signUpVerifyUser`,
    token,
    `/signUp/4?email=${location.search.split('&')[0].split('email=')[1]}`
  );
};

const controlResendVerificationToken = async () => {
  await get(
    `auth/signUpSendVerificationCode?email=${
      location.search.split('&')[0].split('email=')[1]
    }`
  );
};

if (signUpVerificationForm) {
  const View = new SignUpVerificationView();

  // handler
  View.addHandlerSubmitForm(controlVerifyAccount);
  View.addHandlerRequestNewVerificationToken(controlResendVerificationToken);
}
