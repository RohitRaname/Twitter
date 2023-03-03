import FormView from '../../Common/FormView.js';

class SetProfileView extends FormView {
  _parentEl = document.querySelector(
    '.form--signUp[data-action="set-profile"]'
  );
  _imgInputEl = this._parentEl.querySelector('#profilePic');
  _formSubmitBtn = this._parentEl.querySelector('.form-submitBtn');
  constructor() {
    super();
    this.handleFormBasicFunctionality();
  }

  addHandlerUploadProfile(handle) {
    this._imgInputEl.addEventListener('change', () => {
      const formData = new FormData();

      formData.append('profilePic', this._imgInputEl.files[0]);

      handle(formData);
    });
  }
  // API ***********************************************

  addHandlerSubmitForm(handle) {
    this._formSubmitBtn.addEventListener('click', () => {
      handle();
    });
  }
}

export default SetProfileView;
