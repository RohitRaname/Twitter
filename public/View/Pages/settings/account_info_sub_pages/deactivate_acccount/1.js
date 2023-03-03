import formview from '../../../../Common/FormView.js';

export default class deactivate_account_page_1_view extends formview {
  _parentEl = document.querySelector(
    '.form[data-form="setting-deactivate--account-confirm-password"]'
  );

  

  _cur_user_data = JSON.parse(
    document.querySelector('.section').dataset.cur_user
  );


  _submit_btn = this._parentEl.querySelector('.form-submitBtn');

  constructor() {
    super();
    this.handleFormBasicFunctionality();
  }


  add_handler_submit_btn(handle) {
    this._submit_btn.addEventListener('click', () => {
      const data = this.getAllNonHiddenInputValueAsObj();
   
      handle('confirm-password-and-deactivate-account',{password:data.password});
    });
  }
}
