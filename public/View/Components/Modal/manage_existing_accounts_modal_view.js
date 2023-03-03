import ModalView from '../../Common/ModalView.js';

class manage_existing_account_modal_view extends ModalView {
  _parentEl = document.querySelector(
    '.modal[data-modal="manage-existing-accounts"]'
  );

  _redirectToWhenFormClosed = 'current';

  _switch_account(target, handle) {
    const account_item = target.closest(
      '.dropdown-item:not(.preview-item-no-hover)'
    );

    if (!account_item) return;
    handle('switch-account', JSON.parse(account_item.dataset.data));
  }

  _handle_btns(target, handle) {
    const btn = target.closest('button');
    if (!btn) return;

    const { action } = btn.dataset;

    if (action === 'show-add-existing-account-modal') this.hide();

    handle(btn.dataset.action);
  }

  add_handler_modal(handle) {
    this._parentEl.addEventListener('click', (e) => {
      const target = e.target;

      this._switch_account(target, handle);

      this._handle_btns(target, handle);
      this._handleBackBtn(target);
      this.hideModalWhenOverlayIsClicked(target);
    });
  }

  // API ***********************************************
}

export default manage_existing_account_modal_view;
