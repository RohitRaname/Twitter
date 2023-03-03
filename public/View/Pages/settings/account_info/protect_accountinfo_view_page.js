import formview from '../../../Common/FormView.js';

export default class protect_account_info_view_page extends formview {
  _parentEl = document.querySelector(
    '.form[data-form="setting-confirm-password"]'
  );

  _cur_user_data = JSON.parse(
    document.querySelector('.section').dataset.cur_user
  );

  _forgot_password_btn = document.querySelector(
    'button[data-action="forgot-password"]'
  );

  _submit_btn = this._parentEl.querySelector('.form-submitBtn');

  constructor() {
    super();
    this.handleFormBasicFunctionality();
  }

  add_handler_forgot_password_btn(handle) {
    this._forgot_password_btn.addEventListener('click', () => handle());
  }
  add_handler_submit_btn(handle) {
    this._submit_btn.addEventListener('click', () => {
      const data = this.getAllNonHiddenInputValueAsObj();
      this._cur_user_data.password = data.password.trim();

      handle(this._cur_user_data);
    });
  }
}
