import FormView from '../../../../Common/FormView.js';

export default class change_email_modal_view extends FormView {
  _parentEl = document.querySelector(
    ".form[data-form='settings-change-email']"
  );

  _cur_user_data = JSON.parse(
    document.querySelector('.section').dataset.cur_user
  );

  _email_input = this._parentEl.querySelector('input[name="email"]');
  _email_groupel = this._email_input.closest('.form-group');

  _submit_btn = this._parentEl.querySelector('.form-submitBtn');
  _submit_btns_container = this._parentEl.querySelector('.form-submitBtn__box');

  constructor() {
    super();
    this.handleFormBasicFunctionality();
    this._switch_bw_cancel_and_submit_btn();
    this._checkEmail();
  }

  _checkEmail() {
    this._email_input.addEventListener('input', (e) => {
      const value = e.target.value.trim();

      if (value.length === 0) {
        this._email_groupel.dataset.error = false;
        this._submit_btn.setAttribute('disabled',true);
        return;
      }

      if (!value.includes('@gmail.com' || '.io' || '.com')) {
        this._submit_btn.setAttribute('disabled',true);
        this._email_groupel.dataset.error = true;
        return;
      }

      this._email_groupel.dataset.error = false;
      this._submit_btn.removeAttribute('disabled');
    });
  }

  add_handler_modal(handle) {
    this._parentEl.addEventListener('click', (e) => {
      const target = e.target;

      // cancel btn
      if (target.closest('button[data-action="hide-modal"]')) this._hide();

      // submit btn
      if (target.closest('.form-submitBtn')) {
        handle('change-email', {
          email: this._email_input.value,
        });

        this._hide();
      }
    });
  }

  _switch_bw_cancel_and_submit_btn() {
    this._email_input.addEventListener('input', () => {
      this._submit_btns_container.dataset.active =
        this._email_input.value.length > 0;
    });
  }
}
