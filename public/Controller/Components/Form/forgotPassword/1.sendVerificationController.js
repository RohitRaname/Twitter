import SendVerificationToken from '../../../../View/Form/ForgotPassword/1.SendVerificationTokenView.js';

import { post } from '../../../api/api.js';

const SendResetVerificationTokenForm = document.querySelector(
  '.form--forgotPassword[data-action="send-verification"]'
);


const controlSendVerificationToken = async () => {
  const email = location.search.split('&')[0].split('q=')[1];

  const data = {};
  data.email = email;

  await post(
    `auth/forgotPasswordSendVerification`,
    data,
    `/forgotPassword/2?q=${email}`
  );
};

const controlCloseForm = async () => {
  const email = location.search.split('&')[0].split('q=')[1];

  const data = {};
  data.email = email;

  await post(`auth/removeVerificationTokenProperties`, data, `/join`);
};

if (SendResetVerificationTokenForm) {
  const View = new SendVerificationToken();

  // handler
  View.addHandlerSubmitForm(controlSendVerificationToken);
  View.addHandlerCloseForm(controlCloseForm);
}
