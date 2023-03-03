import FormView from '../../Common/FormView.js';

class IdentifyUser extends FormView {
  _parentEl = document.querySelector(
    '.form--login[data-action="login-with-email-or-name"]'
  );

  _signup_form = document.querySelector('.form--signUp');

  _nextBtn = this._parentEl.querySelector('button[data-action="next"]');
  _forgotPasswordBtn = this._parentEl.querySelector(
    'button[data-action="forgot-password"]'
  );

  _show_signup_form_btn = this._parentEl.querySelector(
    'span[data-action="show-signup-form"]'
  );

  constructor() {
    super();
    this.handleFormBasicFunctionality();
    this._click_on_show_signup_formbtn()
  }

  // API ***********************************************

  // send email or name for further login
  addHandlerSubmitForm(handle) {
    this._nextBtn.addEventListener('click', () => {
      const formdata = this.getAllNonHiddenInputValueAsObj();
      handle(formdata);
    });
  }

  _click_on_show_signup_formbtn() {
    this._show_signup_form_btn.addEventListener('click', () => {
      this._hide();

      this._signup_form.classList.replace('hidden', 'view');
    });
  }

  addHandlerForgotPasswordBtn(handle) {
    this._forgotPasswordBtn.addEventListener('click', () => {
      handle();
    });
  }
}

export default IdentifyUser;
