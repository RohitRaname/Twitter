import FormView from '../../Common/FormView.js';

class ResetPasswordView extends FormView {
  _parentEl = document.querySelector('.form--forgotPassword[data-action="reset-password"]');

  _loginBtn = this._parentEl.querySelector('button[data-action="login"]');

  _passwordGroupEl = this._parentEl.querySelector(
    '.form-group[data-field="password"]'
  );
  _passwordInput = this._passwordGroupEl.querySelector('#password');

  _seePasswordBtn = this._passwordGroupEl.querySelector(
    '[data-action="see-password"]'
  );

  constructor() {
    super();
    this.handleFormBasicFunctionality();
    // this._addHandlerSubmitForm();
    this.checkIfNewPasswordMeetMinRequirements(this._passwordInput,this._passwordGroupEl)
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
      handle(formdata);

      // then to next page
    });
  }
}

export default ResetPasswordView;
