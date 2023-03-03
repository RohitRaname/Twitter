import FormView from '../../Common/FormView.js';

class FindTwitterAccountByEmail extends FormView {
  _parentEl = document.querySelector(
    '.form[data-action="find-account-by-email"]'
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

export default FindTwitterAccountByEmail;
