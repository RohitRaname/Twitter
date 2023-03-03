import FormView from '../../Common/FormView.js';

class SetBioView extends FormView {
  _parentEl = document.querySelector('.form--signUp[data-action="set-bio"]');

  _textAreaEl = this._parentEl.querySelector('#bio');
  _formSubmitBtn = this._parentEl.querySelector('.form-submitBtn');
  _textAreaCountEl = this._parentEl.querySelector('.form-count span');

  constructor() {
    super();
    this.handleFormBasicFunctionality();
    this.autoIncreaseTextareaHeight(this._textAreaEl);
    this._updateBioTextareaCount();
  }

  _updateBioTextareaCount() {
    this._updateInputWordCount(this._textAreaEl, this._textAreaCountEl);
  }

  // API ***********************************************

  addHandlerSubmitForm(handle) {
    this._formSubmitBtn.addEventListener('click', () => {
      let bioValue = this._textAreaEl.value;
      if (!bioValue || bioValue.length === 0) return handle('skip');

      bioValue = bioValue.trim();
      handle({ bio: bioValue });
      // update user bio
      // then go to next page
    });
  }
}

export default SetBioView;
