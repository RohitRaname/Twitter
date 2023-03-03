import { addClass, removeClass, replaceClass } from '../utils/domHelper.js';

class PopupView {
  _parentEl;
  _unsent_tweet_modal = document.querySelector(
    '.modal[data-modal="unsent-tweets"]'
  );
  // _tweetTopParenContainerEl;

  show() {
    removeClass(this._parentEl, 'hidden');
  }

  hide() {
    addClass(this._parentEl, 'hidden');
  }

  // i must think on my own no matter what other say the only thing which matter what i think not what other think

  // delete all written tweet in multi tweet form and return to home page
  show_unsent_tweets(target, handle) {
    const btn = target.closest("button[data-action='delete-tweets']");
    if (!btn) return;

    this.hide();
   handle('discard-tweet-and-show-unsent-tweet-modal')
  }

  // return back to multi tweet form
  cancel_btn(target) {
    const btn = target.closest("button[data-action='hide-popup']");

    if (!btn) return;

    this.hide();
  }

  click_on_overlay(target) {
    const el = target.closest('.overlay');
    if (!el) return;

    this.hide();
  }

  additionalHandleFuncs() {}

  // note
  // -- in case of multiple tweet frontend is self sufficient
  // -- for unsent draft tweet controller is needed

  handlePopup(handle) {
    // checking if event is set already
    if (!this._parentEl || this._parentEl.dataset.clickEvent === 'true') return;

    // setting addEvent for only one time
    this._parentEl.dataset.clickEvent = 'false';

    // handlling begings
    this._parentEl.addEventListener('click', (e) => {
      const target = e.target;
      this.show_unsent_tweets(target, handle);

      this.cancel_btn(target);

      this.click_on_overlay(target);

      this.additionalHandleFuncs(target, handle);
      //
    });
  }
}

export default PopupView;
