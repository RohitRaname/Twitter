import CustomerExperienceView from '../../../../View/Form/SignUp/1.CustomiseExperienceView.js';
const CustomerExperienceForm = document.querySelector(
  '.form--signUp[data-action="customise-experience"]'
);

import { post } from '../../../api/api.js';

const controlCustomiseExperience = async (data) => {
  const email = location.search.split('?')[1].split('=')[1];

  const res = await post(
    `auth/signUpCustomiseUserExperience?email=${email}`,
    data
  );

  if (!res) return;

  const { name, birthDate } = res.data.docs;

  location.assign(
    `/signUp/2?email=${email}&name=${name}&birthDate=${birthDate}`
  );

  // `/join/signUp/2?email=${email}`
};

if (CustomerExperienceForm) {
  const View = new CustomerExperienceView();
  View.addHandlerSubmitForm(controlCustomiseExperience);
}
