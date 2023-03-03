import FormView from '../../Common/FormView.js';

class add_existing_account_modal_view extends FormView {
  _parentEl = document.querySelector(
    '.form[data-form="add-existing-accounts"]'
  );

  _redirectToWhenFormClosed="current"

  _submitbtn= this._parentEl.querySelector('button[data-action="submit"]');
  _forgotPasswordBtn = this._parentEl.querySelector(
    'button[data-action="forgot-password"]'
  );

  _show_signup_form_btn = this._parentEl.querySelector(
    'span[data-action="show-signup-form"]'
  );

  constructor() {
    super();
    this.handleFormBasicFunctionality();
  }

  // API ***********************************************

  // send email or name for further login
  addHandlerSubmitForm(handle) {
    this._submitbtn.addEventListener('click', () => {
      const data = this.getAllNonHiddenInputValueAsObj();
      
      handle(data);
    });
  }

  click_on_show_signup_formbtn() {
    this._show_signup_form_btn.addEventListener('click', () => {
      this._hide();

      handle()
    });
  }

  addHandlerForgotPasswordBtn(handle) {
    this._forgotPasswordBtn.addEventListener('click', () => {
      handle();
    });
  }
}

export default add_existing_account_modal_view;
