import formview from '../../../Common/FormView.js';

export default class change_username_view extends formview {
  _parentEl = document.querySelector(
    '.form[data-form="setting-update-username"]'
  );

  _cur_user_data = JSON.parse(
    document.querySelector('.section').dataset.cur_user
  );

  _username_input = this._parentEl.querySelector('input[name="avatar"]');

  _submit_btn = this._parentEl.querySelector('.form-submitBtn');

  constructor() {
    super();
    this.handleFormBasicFunctionality();
  }

  _change_username(target) {
    const item = target.closest('.settings-avatar-suggestion');
    if (!item) return;

    this._username_input.value = item.dataset.value;
    this._submit_btn.removeAttribute('disabled');
  }

  add_handler_form(handle) {
    this._parentEl.addEventListener('click', (e) => {
      const target = e.target;

      this._submit_form(target, handle);

      this._change_username(target);
    });
  }

  _submit_form(target, handle) {
    if (!target.closest('.form-submitBtn')) return;
    const data = this.getAllNonHiddenInputValueAsObj();

    handle('change-username', { avatar: data.avatar });
  }
}
