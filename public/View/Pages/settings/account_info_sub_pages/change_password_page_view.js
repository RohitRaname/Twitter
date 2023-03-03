import formview from '../../../Common/FormView.js';

export default class change_password_page_view extends formview {
  _parentEl = document.querySelector(
    '.form[data-form="setting-change-password"]'
  );

  _cur_user_data = JSON.parse(
    document.querySelector('.section').dataset.cur_user
  );

  _state = { cur_password: '', new_password: '', confirm_password: '' };

  _cur_password_input = this._parentEl.querySelector(
    'input[name="password"]'
  );
  _cur_password_groupel = this._cur_password_input.closest('.form-group');

  _new_password_input = this._parentEl.querySelector(
    'input[name="newPassword"]'
  );
  _new_password_groupel = this._new_password_input.closest('.form-group');

  _confirm_password_input = this._parentEl.querySelector(
    'input[name="confirmNewPassword"]'
  );
  _confirm_password_groupel =
    this._confirm_password_input.closest('.form-group');

  _submit_btn = this._parentEl.querySelector('.form-submitBtn');

  constructor() {
    super();
    this.handleFormBasicFunctionality();
  }

  // handle 6
  _enableSubmitBtnWhenAllInputsValid() {
    if (this._parentEl.dataset.optional === 'true')
      return (this._parentEl.querySelector('.form-submitBtn').disabled = false);

    this._update_input_filled_attr_in_groupel();

    const inputEls = this._getNonHiddenInputEls();

    let valid = true;
    inputEls.forEach((inputEl) => {
      if (inputEl.value.trim().length === 0) valid = false;
    });

    this._parentEl.dataset.allInputFieldsValid = valid;

    const submitBtn = this._parentEl.querySelector('.form-submitBtn');

    // valid ? submitBtn.removeAtrribute('disabled') : (submitBtn.disabled = true);
    if (submitBtn) submitBtn.disabled = valid ? false : true;
  }

  _check_all_submitted_inputs_correct() {
    if (
      this._cur_password_input.value.length === 0 ||
      this._cur_password_input.value.length < 8
    ) {
      this._cur_password_groupel.dataset.error = true;
      return false;
    }

    if (this._new_password_input.value.length < 8) {
      this._new_password_groupel.dataset.error = true;
      return false;
    }
    if (this._new_password_input.value !== this._confirm_password_input.value) {
      this._confirm_password_groupel.dataset.error = true;
      return false;
    }

    this._cur_password_groupel.dataset.error = false;
    this._new_password_groupel.dataset.error = false;
    this._confirm_password_groupel.dataset.error = false;
    return true;
  }

  add_handler_form(handle) {
    this._parentEl.addEventListener('click', (e) => {
      const target = e.target;

      this._submit_form(target, handle);
    });
  }

  _submit_form(target, handle) {
    if (!target.closest('.form-submitBtn')) return;

    if (!this._check_all_submitted_inputs_correct()) return;

    const data = this.getAllNonHiddenInputValueAsObj();

    handle('change-password', data);
  }

  show_cur_password_incorrect_error() {
    this._cur_password_groupel.dataset.error = true;
  }
}
