import CreateAccountView from '../../../../View/Form/SignUp/0.CreateAccountView.js';
import { post } from '../../../api/api.js';
const createAccountForm = document.querySelector(
  '.form--signUp[data-action="create-account"]'
);

const controlCreateAccount = async (data) => {
  const res = await post(
    'auth/signUpCreateAccount',
    data,
    `/signUp/1?email=${data.email}`
  );
};

if (createAccountForm) {
  const View = new CreateAccountView();

  View.addHandlerSubmitForm(controlCreateAccount);
}
