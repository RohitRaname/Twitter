import PopupView from '../../../Common/PopupView.js';

// present in multi tweets
class SaveMultiTweetPopupView extends PopupView {
  _parentEl = document.querySelector(
    '.popup[data-tweet-type="multiple-tweets"][data-action="save-tweet"]'
  );

  constructor() {
    super();
    // this.handlePopup();
  }

  // handlePopup(handle) {
  //   // checking if event is set already
  //   if (!this._parentEl || this._parentEl.dataset.clickEvent === 'true') return;

  //   // setting addEvent for only one time
  //   this._parentEl.dataset.clickEvent = 'false';

  //   // handlling begings
  //   this._parentEl.addEventListener('click', (e) => {
  //     const target = e.target;
  //     this.handleDeleteAllTweetBtn(target, handle);

  //     this._handleCancelTweetBtn(target);

  //     this._handleOverlayEL(target);

  //     this.additionalHandleFuncs(target, handle);
  //     //
  //   });
  // }

  additionalHandleFuncs(target, handle) {
    // save Tweet btn
    const btn = target.closest('button[data-action="save-tweet"]');
    if (!btn) return;

    handle('save-tweet-as-draft');
    this.hide();
  }

  addHandlerPopup(handle) {
    this.handlePopup(handle);
  }
}

export default SaveMultiTweetPopupView;
