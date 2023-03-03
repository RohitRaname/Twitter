import FormView from '../../Common/FormView.js';

class SendResetPasswordTokenView extends FormView {
  _parentEl = document.querySelector(
    '.form--forgotPassword[data-action="send-verification"]'
  );

  _checkBoxBtn = this._parentEl.querySelector('.btn--checkbox');

  _submitBtn = this._parentEl.querySelector('button[data-action="next"]');

  _cancelBtn = this._parentEl.querySelector(
    "button[data-action='cancel'");

  constructor() {
    super();
    this.handleFormBasicFunctionality();
    this.handleCheckBox(this._checkBoxBtn, this._submitBtn);
  }

  // API ***********************************************

  // send email or name for further login
  addHandlerSubmitForm(handle) {
    this._submitBtn.addEventListener('click', () => {
      handle();
    });
  }

  addHandlerCloseForm(handle) {
    this._cancelBtn.addEventListener('click', () => {
      handle();
    });
  }
}

export default SendResetPasswordTokenView;
