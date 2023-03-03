import FormView from '../../Common/FormView.js';

class CustomiseUserExperienceView extends FormView {
  _parentEl = document.querySelector(
    '.form--signUp[data-action="customise-experience"]'
  );

  _checkBoxBtn = this._parentEl.querySelector('.btn--checkbox');
  _checkBoxInput = this._parentEl.querySelector('.checkbox-value');

  _formSubmitBtn = this._parentEl.querySelector('.form-submitBtn');

  constructor() {
    super();

    this.handleCheckBox(this._checkBoxBtn, this._formSubmitBtn);
  }

  _getCheckBoxValue() {
    return this._checkBoxInput.name;
  }

  // API ***********************************************
  addHandlerSubmitForm(handle) {
    this._formSubmitBtn.addEventListener('click', () => {
      // const formData = this.getAllNonHiddenInputValueAsObj();

      const formData = {};


      const userGivePermission = this._getCheckBoxValue();
      formData[userGivePermission] = true;
      handle(formData);

    });
  }
}

export default CustomiseUserExperienceView;
