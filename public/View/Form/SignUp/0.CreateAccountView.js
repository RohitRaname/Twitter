import FormView from '../../Common/FormView.js';
import { addClass, removeClass } from '../../utils/domHelper.js';

class CreateAccountView extends FormView {
  _parentEl = document.querySelector(
    '.form--signUp[data-action="create-account"]'
  );

  // _phoneGroupEl = this._parentEl.querySelector(
  //   '.form-group[data-field="phone"]'
  // );
  // _inputPhoneEl = this._phoneGroupEl.querySelector('#phone');
  // _inputPhoneErrorEl = this._phoneGroupEl.querySelector('.form-error');

  _emailGroupEl = this._parentEl.querySelector(
    '.form-group[data-field="email"]'
  );
  _inputEmailEl = this._emailGroupEl.querySelector('#email');
  _inputEmailErrorEl = this._emailGroupEl.querySelector('.form-error');

  _nameGroupEl = this._parentEl.querySelector('.form-group[data-field="name"]');
  _inputNameEl = this._nameGroupEl.querySelector('#name');
  _inputNameCountEl = this._parentEl.querySelector('.form-hint span');
  _inputNameErrorEl = this._nameGroupEl.querySelector('.form-error');

  _switchBetweenPhoneAndEmailBtn = this._parentEl.querySelector(
    'button[data-switch-between="true"]'
  );

  _formSubmitBtn = this._parentEl.querySelector('.form-submitBtn');

  constructor() {
    super();
    this.handleFormBasicFunctionality();
    this._updateNameInputWordCount();
    // this._checkPhoneNumber();
    this._checkName();
    this._checkEmail();
    // this._switchBetweenPhoneAndEmail();
    // this._clearAllInputElValue();
    // this._addHandlerSubmitForm();
  }

  // in right side corner of input there is a indicator => 0/50 we need to update this
  _updateNameInputWordCount() {
    this._updateInputWordCount(this._inputNameEl, this._inputNameCountEl);
  }

  // _checkPhoneNumber() {
  //   this._inputPhoneEl.addEventListener('input', (e) => {
  //     const checker =
  //       /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/;

  //     const value = e.target.value.trim();

  //     if (value.length === 0) return (this._phoneGroupEl.dataset.error = false);

  //     const isValid = checker.test(value);
  //     if (isValid) return (this._phoneGroupEl.dataset.error = false);

  //     this._phoneGroupEl.dataset.error = true;
  //   });
  // }

  _checkName() {
    this._inputNameEl.addEventListener('input', (e) => {
      const value = e.target.value.trim();

      if (value.length === 0) return (this._nameGroupEl.dataset.error = true);
      if (value.length > 0) return (this._nameGroupEl.dataset.error = false);
    });
  }

  _checkEmail() {
    this._inputEmailEl.addEventListener('input', (e) => {
      const value = e.target.value.trim();

      if (value.length === 0) return (this._emailGroupEl.dataset.error = false);

      if (!value.includes('@gmail.com' || '.io' || '.com'))
        return (this._emailGroupEl.dataset.error = true);

      this._emailGroupEl.dataset.error = false;
    });
  }

  // _switchBetweenPhoneAndEmail() {
  //   this._switchBetweenPhoneAndEmailBtn.addEventListener('click', (e) => {
  //     const { switchTo } = e.target.dataset;
  //     if (switchTo === 'email') {
  //       removeClass(this._emailGroupEl, 'hidden');
  //       addClass(this._phoneGroupEl, 'hidden');
  //       this._switchBetweenPhoneAndEmailBtn.dataset.switchTo = 'phone';
  //       this._switchBetweenPhoneAndEmailBtn.textContent = 'Use Phone instead';
  //       return;
  //     }

  //     addClass(this._emailGroupEl, 'hidden');
  //     removeClass(this._phoneGroupEl, 'hidden');
  //     this._switchBetweenPhoneAndEmailBtn.dataset.switchTo = 'email';
  //     this._switchBetweenPhoneAndEmailBtn.textContent = 'Use Email instead';
  //   });
  // }

  // API ***********************************************
  addHandlerSubmitForm(handle) {
    this._formSubmitBtn.addEventListener('click', () => {
      let inputObj = this.getAllNonHiddenInputValueAsObj();

      const { year, month, day } = inputObj;
      const birth_date = `${day}/${month}/${year}`;
      delete inputObj.year;
      delete inputObj.month;
      delete inputObj.day;
      inputObj.birthDate = birth_date;

      handle(inputObj);
    });
  }
}

export default CreateAccountView;
