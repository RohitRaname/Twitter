import ConfirmAccountCredentialsView from '../../../../View/Form/SignUp/2.ConfirmAccountCredentialsView.js';
import { post, get } from '../../../api/api.js';

const confirmAccountCredentialsForm = document.querySelector(
  '.form--signUp[data-action="confirm-account-credentials"]'
);

const controlSendAccountVerificationToken = async (data) => {
  await get(
    `auth/signUpSendVerificationCode?email=${data.email}`,
    `/signUp/3?email=${data.email}`
  );
};

const controlResetSignUp = async () => {
  await get(
    `auth/signUpResetUserCredentials?email=${
      location.search.split('&')[0].split('email=')[1]
    }`
  );

  location.assign('/join');
};

if (confirmAccountCredentialsForm) {
  const View = new ConfirmAccountCredentialsView();

  // handler
  View.addHandlerSubmitForm(controlSendAccountVerificationToken);
  View.addHanlderResetSignUp(controlResetSignUp);
}
