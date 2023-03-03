import FormView from '../../Common/FormView.js';

class SignUpVerificationView extends FormView {
  _parentEl = document.querySelector(
    '.form--signUp[data-action="signUp-verification"]'
  );

  _reRequestTokenBtn = this._parentEl.querySelector('.form-reRequestToken');
  _formSubmitBtn = this._parentEl.querySelector('.form-submitBtn');

  constructor() {
    super();
    this.handleFormBasicFunctionality();
  }

  // API ***********************************************

  addHandlerRequestNewVerificationToken(handle) {
    this._reRequestTokenBtn.addEventListener('click', () => {
      // api call

      handle();
    });
  }

  addHandlerSubmitForm(handle) {
    this._formSubmitBtn.addEventListener('click', () => {
      const formData = this.getAllNonHiddenInputValueAsObj();
      handle(formData);
    });
  }
}

export default SignUpVerificationView;
