import FormView from '../../Common/FormView.js';

class ConfirmLoginView extends FormView {
  _parentEl = document.querySelector(
    '.form--login[data-action="enter-password"]'
  );

  _loginBtn = this._parentEl.querySelector('button[data-action="login"]');
  _forgotPasswordBtn = this._parentEl.querySelector(
    'button[data-action="forgot-password"]'
  );
  _passwordGroupEl = this._parentEl.querySelector(
    '.form-group[data-field="password"]'
  );
  _passwordInput = this._passwordGroupEl.querySelector('#password');

  _seePasswordBtn = this._passwordGroupEl.querySelector(
    '[data-action="see-password"]'
  );

  _show_signup_formbtn = this._parentEl.querySelector('span[data-action="show-signup-form"]')

  constructor() {
    super();
    this.handleFormBasicFunctionality();
    this.enableUserToSeePasswordTyped(
      this._seePasswordBtn,
      this._passwordInput
    );
  }

  // API ***********************************************

  // send email or name for further login
  addHandlerSubmitForm(handle) {
    this._loginBtn.addEventListener('click', () => {
      const formdata = this.getAllNonHiddenInputValueAsObj();
      // then to next page

      handle(formdata);
    });
  }


  
  click_on_show_signup_formbtn(handle) {
    this._show_signup_formbtn.addEventListener('click', () => {
     handle('show-signup-form')
    });
  }

  addHandlerForgotPasswordBtn() {
    this._forgotPasswordBtn.addEventListener('click', (handle) => {
      // reassign to forgot Password
      // then to next pagehandle

      handle();
    });
  }
}

export default ConfirmLoginView;
