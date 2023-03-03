import FormView from '../../Common/FormView.js';

class SetPasswordView extends FormView {
  _parentEl = document.querySelector(
    '.form--signUp[data-action="set-password"]'
  );

  _reRequestTokenBtn = this._parentEl.querySelector('.form-reRequestToken');
  _formSubmitBtn = this._parentEl.querySelector('.form-submitBtn');

  _passwordGroupEl = this._parentEl.querySelector(
    '.form-group[data-field="password"]'
  );
  _passwordInput = this._passwordGroupEl.querySelector('#password');

  _seePasswordBtn = this._passwordGroupEl.querySelector(
    '.form-hint--seePassword'
  );

  constructor() {
    super();

    this.handleFormBasicFunctionality();
    this._checkPasswordMeetRequirements();
    // this._enableUserToSeePassword();
    this.enableUserToSeePasswordTyped(
      this._seePasswordBtn,
      this._passwordInput
    );
  }

  _checkPasswordMeetRequirements() {
    this._passwordInput.addEventListener('input', () => {
      const length = this._passwordInput.value.trim().length;

      this._passwordGroupEl.dataset.error = length < 8 ? true : false;
    });
  }

  // _enableUserToSeePassword() {
  //   this._seePasswordBtn.addEventListener('click', () => {
  //     let { active } = this._seePasswordBtn.dataset;

  //     active = active === 'false' ? true : false;

  //     this._seePasswordBtn.dataset.active = active;

  //     active === true
  //       ? this._passwordInput.setAttribute('type', 'text')
  //       : this._passwordInput.setAttribute('type', 'password');
  //   });
  // }

  // API ***********************************************

  addHandlerSubmitForm(handle) {
    this._formSubmitBtn.addEventListener('click', () => {
      const formData = {};
      formData[this._passwordInput.name] = this._passwordInput.value;
      handle(formData);
    });
  }
}

export default SetPasswordView;
