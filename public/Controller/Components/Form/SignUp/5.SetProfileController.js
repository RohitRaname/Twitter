import SetProfileView from '../../../../View/Form/SignUp/5.SetProfileView.js';
import { patch } from '../../../api/api.js';

const setProfileForm = document.querySelector(
  '.form--signUp[data-action="set-profile"]'
);

const controlSetProfile = async (data) => {
  const email = location.search.split('&')[0].split('email=')[1];
  await patch(`users/me?email=${email}`, data, `/signUp/6?email=${email}`);
};

const controlSkipToNextPage = async () => {
  const email = location.search.split('&')[0].split('email=')[1];
  location.assign(`/signUp/6?email=${email}`);
};

if (setProfileForm) {
  const View = new SetProfileView();

  // handler
  View.addHandlerUploadProfile(controlSetProfile);
  View.addHandlerSubmitForm(controlSkipToNextPage);
}
