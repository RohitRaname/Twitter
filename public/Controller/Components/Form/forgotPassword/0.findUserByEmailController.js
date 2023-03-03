import FindUserAccountView from '../../../../View/Form/ForgotPassword/0.FindAccountByEmail.js';

import { post } from '../../../api/api.js';

const findUserForm = document.querySelector(
  '.form--forgotPassword[data-action="find-account-by-email"]'
);

const controlFindUserAccountByEmail = async (data) => {

  const name = location.search.split('&')[0].split('name=')[1];

  await post(
    `auth/forgotPasswordUserEmailExist?name=${name}`,
    data,
    `/forgotPassword/1?q=${data.email}`
  );
};

if (findUserForm) {
  const View = new FindUserAccountView();
  // handler
  View.addHandlerSubmitForm(controlFindUserAccountByEmail);
}
