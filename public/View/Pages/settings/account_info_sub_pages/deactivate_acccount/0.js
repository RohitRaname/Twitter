import formview from '../../../../Common/FormView.js';

export default class deactivate_account_page_0_view extends formview {
  _parentEl = document.querySelector(
    '.section[data-page="settings-deactivate-account-0"]'
  );

  _cur_user_data = JSON.parse(
    document.querySelector('.section').dataset.cur_user
  );


  _submit_btn = this._parentEl.querySelector('.form-submitBtn');

  constructor() {
    super();
    this.handleFormBasicFunctionality();
  }



  add_handler_form(handle) {
    this._parentEl.addEventListener('click', (e) => {
      const target = e.target;

      this._submit_form(target, handle);

    });
  }

  _submit_form(target, handle) {
    if (!target.closest('.form-submitBtn')) return;
    handle('redirect-to-deactivate-page-1')
  }
}
