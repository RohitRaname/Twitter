import SetBioView from '../../../../View/Form/SignUp/6.SetBioView.js';

import { patch } from '../../../api/api.js';

const setProfileForm = document.querySelector(
  '.form--signUp[data-action="set-bio"]'
);

const controlSetBio = async (data) => {
  if (data === 'skip') return location.assign('/');
  const email = location.search.split('&')[0].split('email=')[1];
  await patch(`users/me?email=${email}`, data, '/');
};

if (setProfileForm) {
  const View = new SetBioView();

  // handler
  View.addHandlerSubmitForm(controlSetBio);
}
