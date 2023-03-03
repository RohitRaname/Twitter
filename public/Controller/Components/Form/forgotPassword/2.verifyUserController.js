import forgotPasswordVerification from '../../../../View/Form/ForgotPassword/2.VerifyAccount.js';
import { post, get } from '../../../api/api.js';

const forgotPasswordVerificationForm = document.querySelector(
  '.form--forgotPassword[data-action="verify-account"]'
);

const controlVerifyAccount = async (token) => {
  const email = location.search.split('&')[0].split('q=')[1];

  await post(
    `auth/forgotPasswordVerifyAccount`,
    token,
    `/forgotPassword/3?q=${email}`
  );
};

const controlResendVerificationToken = async () => {
  const email = location.search.split('&')[0].split('q=')[1];

  const data = { email };

  await post(`auth/forgotPasswordSendVerification`, data);
};

if (forgotPasswordVerificationForm) {
  const View = new forgotPasswordVerification();

  // handler
  View.addHandlerSubmitForm(controlVerifyAccount);
  View.addHandlerRequestNewVerificationToken(controlResendVerificationToken);
}
