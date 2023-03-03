import PopupView from '../../../Common/PopupView.js';

// present in multi tweets
class DiscardMultiTweetPopupView extends PopupView {
  _parentEl = document.querySelector(
    '.popup[data-tweet-type="multiple-tweets"][data-action="discard-tweets"]'
  );

  constructor() {
    super();
    this.handlePopup();
  }
}

export default DiscardMultiTweetPopupView;
