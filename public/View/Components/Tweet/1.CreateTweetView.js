// whenever a component is used twice we should make the component as common View for that component so another component just like can use the component
import { replaceClass } from '../../utils/domHelper.js';

import create_single_post_view from '../../Common/create_single_post_view.js';

class CreateTweetView extends create_single_post_view {
  _topParentEl = document.querySelector('.createTweet-main');
  // _parentEl = document.querySelector(
  //   '.form--createTweet[data-multiple-tweets="false"]'
  // );

  // FORM -------------------------------------------------------
  _multipleTweetForm = document.querySelector('.createTweets');

  // INPUT ----------------------------------------------------------

  // so methods to be called automatically
  constructor() {
    // this refers to current class CreateTweetView
    super();
  }

  check_any_post_word_limit_exceed() {
    return this._textAreaEl.value.length > 200;
  }

  disable_all_submit_btns() {
    this._saveTweetBtn.disabled = true;
  }

  enable_all_submit_btns() {
    this._saveTweetBtn.disabled = false;
  }

  // setUsedComponentClass() {
  //   this._ScheduleView = new ScheduleTweetFormView();
  // }

  _handleScheduleTweetBtn(target) {
    const scheduleTweetBtn = target.closest(
      "button[data-action='schedule-post']"
    );

    if (!scheduleTweetBtn) return;

    const tweet_type_input_el = this._parentEl.querySelector(
      '[name="tweet_type"]'
    );
    tweet_type_input_el.value = 'schedule-text';
  }

  // FUNCTION BELONG TO PARENT VIEW
  handleAddMultipleTweetsBtn(target, handle) {
    const btn = target.closest("button[data-action='add-another-tweet']");
    if (!btn) return;
    const tweet_data = this._getAllInputsValue();
    tweet_data.tweet_type = 'text';

    handle('set-tweet-data-in-multiple-tweets', tweet_data);
    this.emptyAllInputsValue(true);
  }

  addHandlerTweet(handle) {
    this.setUsedComponentClass();

    this.handleTweet(handle);
  }
}

export default CreateTweetView;
