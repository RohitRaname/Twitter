import FormView from '../../../../Common/FormView.js';

export default class verify_password_modal_view extends FormView {
  _parentEl = document.querySelector(
    ".form[data-form='settings-verify-password']"
  );

  _cur_user_data = JSON.parse(
    document.querySelector('.section').dataset.cur_user
  );

  _password_input = this._parentEl.querySelector('input[name="password"]');

  _show_hide_password_btn = this._parentEl.querySelector(
    '.form-hint--seePassword'
  );

  _submit_btns_container = this._parentEl.querySelector('.form-submitBtn__box');

  constructor() {
    super();
    this.handleFormBasicFunctionality();
    this._switch_bw_cancel_and_submit_btn();
  }

  add_handler_modal(handle) {
    this._parentEl.addEventListener('click', (e) => {
      const target = e.target;

      // cancel btn
      if (target.closest('button[data-action="hide-modal"]')) this._hide();

      // show hide passoword
      if (target.closest('.form-hint--seePassword')) {
        const type = this._password_input.type;
        this._password_input.type = type === 'password' ? 'text' : 'password';
      }

      // submit btn
      if (target.closest('.form-submitBtn')) {
        handle('verify-password', {
          ...this._cur_user_data,
          password: this._password_input.value,
        });
        this._hide();
      }
    });
  }

  _switch_bw_cancel_and_submit_btn() {
    this._password_input.addEventListener('input', () => {
      this._submit_btns_container.dataset.active =
        this._password_input.value.length > 0;
    });
  }
}
