import {
  addClass,
  closest,
  contains,
  removeClass,
  replaceClass,
} from '../utils/domHelper.js';

class FormView {
  _parentEl;
  _redirectToWhenFormClosed = '/join';

  _hide(empty_input_value = true) {
    document.documentElement.style.overflowY = 'hidden';
    if (
      this._progress_line &&
      this._parentEl.dataset.form_submitting === 'true'
    ) {
      this._progress_line.dataset.progress = '100';
    }

    setTimeout(() => {
      replaceClass(this._parentEl, 'view', 'hidden');
      if (this._progress_line) this._progress_line.dataset.progress = '0';
      this._parentEl.form_submitting === 'false';
      if (empty_input_value) this._reset();
    }, 450);
  }

  _hideWithoutClearInputValues() {
    replaceClass(this._parentEl, 'view', 'hidden');
    if (this._progress_line) this._progress_line.dataset.progress = '0';
  }

  show() {
    document.documentElement.style.overflowY = 'hidden';
    replaceClass(this._parentEl, 'hidden', 'view');
  }

  _clearAllInputElValue() {
    const allInputEls = [...this._parentEl.querySelectorAll('input')];
    allInputEls.forEach((mov) => (mov.value = ''));
  }

  _getGroupEls() {
    return [...this._parentEl.querySelectorAll('.form-group')];
  }

  _getInputEls() {
    const input_els = this._parentEl.querySelectorAll('input');
    const textarea_els = this._parentEl.querySelectorAll('textarea');
    return [...input_els, ...textarea_els];
  }

  _getNonHiddenInputEls() {
    return [...this._parentEl.querySelectorAll('input')].filter(
      (el) => !contains(el.closest('.form-group'), 'hidden')
    );
  }

  _activeGroupEl(formGroupEl, active) {
    const groupEls = this._getGroupEls();

    // changed
    if (groupEls === []) return;
    //- changed

    for (const el of groupEls) {
      el.dataset.active = 'false';
    }
    active = active === 'false' ? 'true' : 'false';
    formGroupEl.dataset.active = active;
  }

  _unActiveAllGroupEls() {
    const groupEls = this._getGroupEls(this._parentEl);

    // changed
    if (groupEls === []) return;
    // -changed

    groupEls.forEach((el) => {
      el.dataset.active = 'false';
    });
  }

  _reset() {
    this._unActiveAllGroupEls();
    this._clearAllInputElValue();
  }

  // if input are filled then let the group el label move to top
  _update_input_filled_attr_in_groupel() {
    // Handle 1 ***************************************
    const inputEls = this._getInputEls();

    inputEls.forEach((inputEl) => {
      if (!inputEl.closest('.form-group')) return;

      const value = inputEl.value;
      if (value.length === 0) {
        inputEl.closest('.form-group').dataset.inputFilled = false;
        return;
      }

      inputEl.closest('.form-group').dataset.inputFilled = true;
    });
  }
  // Handle 2
  _set_active_state_in_form_groupel(target) {
    const formGroupEl = closest(target, 'form-group');

    if (!formGroupEl || formGroupEl.dataset.type === 'date') {
      this._unActiveAllGroupEls(this._parentEl);
      this._update_input_filled_attr_in_groupel();
      return;
    }

    const input = formGroupEl.querySelector('.form-input');

    // let { active, type } = formGroupEl.dataset;
    if (input) input.focus();

    this._activeGroupEl(formGroupEl, 'false');
  }

  // Handle 3
  _click_on_close_btn(target) {
    if (!closest(target, 'form-closeBtn')) return;
    // changed
    if (this._redirectToWhenFormClosed === 'current') return this._hide();
    if (this._redirectToWhenFormClosed)
      return location.assign(this._redirectToWhenFormClosed);

    // changed
    // this._reset();
    this._hide(true);
  }

  // Handle 5
  _handleSetClickDropdownValueInInput(target) {
    const groupEl = closest(target, 'form-group');
    if (!groupEl) return;
    const dropDownItem = closest(target, 'dropDown-item');

    if (!dropDownItem) return;
    const value = dropDownItem.textContent.trim();

    const groupInputEl = target
      .closest('.form-group')
      .querySelector('.form-input');

    groupInputEl.value = value;
    groupEl.dataset.active = false;

    // this._update_input_filled_attr_in_groupel();
  }

  // handle 6
  _enableSubmitBtnWhenAllInputsValid() {
    if (this._parentEl.dataset.optional === 'true')
      return (this._parentEl.querySelector('.form-submitBtn').disabled = false);

    this._update_input_filled_attr_in_groupel();

    const inputEls = this._getNonHiddenInputEls();

    let valid = true;
    inputEls.forEach((inputEl) => {
      if (
        inputEl.value.trim().length === 0 ||
        inputEl.closest('.form-group').dataset.error === 'true'
      )
        valid = false;
    });

    this._parentEl.dataset.allInputFieldsValid = valid;

    const submitBtn = this._parentEl.querySelector('.form-submitBtn');

    // valid ? submitBtn.removeAtrribute('disabled') : (submitBtn.disabled = true);
    if (submitBtn) submitBtn.disabled = valid ? false : true;
  }

  // handle 7
  click_on_overlay(target) {
    const overlay =
      target.closest('.overlay') ||
      target.closest('button[data-action="close-form"]');
    if (!overlay) return;
  }

  prevent_enterbtn_to_submitform() {
    this._parentEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        // i want it to not use the real behaviour of enter
        e.preventDefault();
      }
      return true;
    });
  }

  _click_on_submit_btn(target) {
    if (!target.closest('.form-submitBtn') || !this._progress_line) return;

    this._progress_line.dataset.progress = '90';
    this._parentEl.dataset.form_submitting = true;
  }

  set_DOM_els(target) {
    this._parentEl.dataset.is_form_hidden = false;
    this._progress_line = this._parentEl.querySelector('.progress-line');
  }

  // Main function
  _basicFormClickAndInputEvent(e) {
    const target = e.target;

    this.set_DOM_els(target);

    // if all inputs are valid then set allInputFieldsValid attribute in form El

    // handle active input and label(blue color) when clicked
    this._set_active_state_in_form_groupel(target);

    // handle close form when close btn clicked
    this._click_on_close_btn(target);

    // handle option selected in group El dropdown

    this._handleSetClickDropdownValueInInput(target);

    // make group look as they have been filled by using css
    this._update_input_filled_attr_in_groupel();

    this._enableSubmitBtnWhenAllInputsValid();

    this._click_on_submit_btn(target);

    //  CSS
    this.click_on_overlay(target);
  }

  // PUBLIC FUNCTION *********************************
  handleFormBasicFunctionality() {
    this._parentEl.addEventListener(
      'click',
      this._basicFormClickAndInputEvent.bind(this)
    );

    this._parentEl.addEventListener(
      'input',
      this._enableSubmitBtnWhenAllInputsValid.bind(this)
    );

    this.prevent_enterbtn_to_submitform();
  }

  // get All Input Value as formData
  getAllNonHiddenInputValueAsFormData() {
    const unHiddenInputs = this._getNonHiddenInputEls();

    const formData = new FormData();
    unHiddenInputs.forEach((inputEl) =>
      formData.append(inputEl.name, inputEl.value.trim())
    );

    return formData;
  }
  getAllNonHiddenInputValueAsObj() {
    const unHiddenInputs = this._getNonHiddenInputEls();

    const formData = {};
    unHiddenInputs.forEach(
      (inputEl) => (formData[inputEl.name] = inputEl.value.trim())
    );

    return formData;
  }

  getAllInputValueAsFormData() {
    const unHiddenInputs = this._getInputEls();

    const formData = new FormData();
    unHiddenInputs.forEach((inputEl) =>
      formData.append(inputEl.name, inputEl.value.trim())
    );

  }

  autoIncreaseTextareaHeight(textAreaEl) {
    textAreaEl.addEventListener('scroll', function () {
      this.style.height = this.clientHeight + this.scrollTop + 'px';
    });
  }

  _updateInputWordCount(inputEl, countEl) {
    inputEl.addEventListener('input', (e) => {
      const count = e.target.value.trim().length;
      countEl.textContent = count;
    });
  }

  enableUserToSeePasswordTyped(seePasswordBtn, passwordInput) {
    seePasswordBtn.addEventListener('click', () => {
      let { active } = seePasswordBtn.dataset;

      active = active === 'false' ? true : false;

      seePasswordBtn.dataset.active = active;

      active === true
        ? passwordInput.setAttribute('type', 'text')
        : passwordInput.setAttribute('type', 'password');
    });
  }

  handleCheckBox(checkBoxBtn, submitBtn) {
    checkBoxBtn.addEventListener('click', () => {
      let { checked } = checkBoxBtn.dataset;
      checked = checked === 'true' ? false : true;

      checkBoxBtn.dataset.checked = checked;

      !checked === true
        ? submitBtn.removeAttribute('disabled')
        : submitBtn.removeAttribute('disabled', true);

      this._parentEl.dataset.allInputFieldsValid = checked;
    });
  }

  checkIfNewPasswordMeetMinRequirements(passwordInput, passwordGroupEl) {
    passwordInput.addEventListener('input', () => {
      const length = passwordInput.value.trim().length;

      passwordGroupEl.dataset.error = length < 8 ? true : false;
    });
  }
}

export default FormView;
