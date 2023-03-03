import PopupView from '../../../Common/PopupView.js';

// present in multi tweets
class DiscardDraftTweetPopupView extends PopupView {
  _parentEl = document.querySelector(
    '.popup[data-tweet-type="draft-tweets"][data-action="delete-unsent-tweets"]'
  );

  show(tweet_arr) {
    this._parentEl.setAttribute(
      'data-delete-tweet-arr',
      JSON.stringify(tweet_arr)
    );
    this._parentEl.classList.remove('hidden');
  }

  _delete_unsent_tweets(target, handle) {
    const btn = target.closest("button[data-action='delete-tweets']");
    if (!btn) return;
    handle(
      'delete-unsent-tweets',
      JSON.parse(this._parentEl.getAttribute('data-delete-tweet-arr'))
    );
    this.hide();
  }

  additionalHandleFuncs(target, handle) {
    this._delete_unsent_tweets(target, handle);
  }
}

export default DiscardDraftTweetPopupView;
