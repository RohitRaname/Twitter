import FormView from '../../Common/FormView.js';

class FindTwitterAccount extends FormView {
  _parentEl = document.querySelector(
    '.form[data-action="find-account-by-name-or-email"]'
  );

  _searchBtn = this._parentEl.querySelector('button[data-action="search"]');

  constructor() {
    super();
    this.handleFormBasicFunctionality();
  }

  // API ***********************************************

  // send email or name for further login

  addHandlerSubmitForm(handle) {
    this._searchBtn.addEventListener('click', () => {
        const formData = this.getAllNonHiddenInputValueAsObj()
        handle(formData)

    });
  }
}

export default FindTwitterAccount;
