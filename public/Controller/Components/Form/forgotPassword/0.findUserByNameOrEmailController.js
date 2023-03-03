import FindUserAccountView from '../../../../View/Form/ForgotPassword/0.FindAccountViewByNameOrEmail.js';

import { post } from '../../../api/api.js';

const findUserForm = document.querySelector(
  '.form--forgotPassword[data-action="find-account-by-name-or-email"]'
);

const controlFindUserAccount = async (data) => {
  
  
  const res = await post(`auth/forgotPasswordCheckUserExist`, data);
  
  
  if (res.data.userSubmittedEmail === true)
  return location.assign(`/forgotPassword/1?email=${res.data.q}`);
  
  location.assign(`/forgotPassword/00?name=${data.nameOrEmail}`);
};

if (findUserForm) {
  const View = new FindUserAccountView();
  // handler
  View.addHandlerSubmitForm(controlFindUserAccount);
}
