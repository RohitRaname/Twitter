import formview from '../../../../Common/FormView.js';

export default class change_email_view extends formview {

  _section = document.querySelector('.section[data-page="settings-change-email"]')

  _parentEl = document.querySelector('.form[data-form="setting-update-email"]');

  _cur_user_data = JSON.parse(
    document.querySelector('.section').dataset.cur_user
  );

  _show_change_email_modal_btn = this._section.querySelector(
    'button[data-action="show-change-email-modal"]'
  );

  constructor() {
    super();
    this.handleFormBasicFunctionality();
  }

  add_handler_show_change_email_modal_btn(handle) {
    this._show_change_email_modal_btn.addEventListener('click', () =>
      handle('show-change-email-modal')
    );
  }
}
