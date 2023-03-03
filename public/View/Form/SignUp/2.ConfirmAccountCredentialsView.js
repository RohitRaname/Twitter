import FormView from '../../Common/FormView.js';

class ConfirmAccountCredentialsView extends FormView {
  _parentEl = document.querySelector(
    '.form--signUp[data-action="confirm-account-credentials"]'
  );

  _formGroupParentEl = this._parentEl.querySelector('.form-groups');

  _formSubmitBtn = this._parentEl.querySelector('.form-submitBtn');

  constructor() {
    super();
    this.handleFormBasicFunctionality();
  }

  // Go back to the first page Create you account then start from the first
  addHanlderResetSignUp(handle) {
    // this._formGroupParentEl.addEventListener('click', function (e) {
    //   if (e.target.closest('input')) handle();
    // });
  }

  // API ***********************************************
  addHandlerSubmitForm(handle) {
    this._formSubmitBtn.addEventListener('click', () => {
      const formData = this.getAllNonHiddenInputValueAsObj();
      handle(formData);
    });
  }
}

export default ConfirmAccountCredentialsView;
