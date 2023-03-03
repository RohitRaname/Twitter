import abs_component_view from '../../Common/abs_component_view.js';
import { addClass, contains, replaceClass } from '../../utils/domHelper.js';
class ChooseWhoCanReply extends abs_component_view {
  parent_el = document.querySelector(
    '.preview[data-type="choose-who-can-reply"]'
  );
  parent_el_class = '.preview[data-type="choose-who-can-reply"]';
  parent_inner_container_el =
    this.parent_el.querySelector('.preview-container');
  btn_el_class = '[data-action="choose-whocan-reply"]';

  btn_el;
  btn_text_el;
  btn_input_el;

  audience_can_reply_btn;

  ///////////////////////////////////////////////////////////////
  setDOMEls(btn) {
    this.btn_el = btn;
    this.btn_text_el = btn.querySelector('span');
    this.btn_input_el = btn.querySelector('input');

    // 1.5 find the type of tweet (multiple tweet or single tweet)
    this.multiple_tweets = btn.closest('[data-multiple-tweets="true"] ')
      ? true
      : false;
  }

  // display_btn will be of two types
  // 1.create tweet choose_audience_btn
  // 2.dropdown
  handle_click_on_display_btn(target) {
    const btn = target.closest(this.btn_el_class);
    if (!btn) return;

    this.setDOMEls(btn);

    if (contains(this.parent_el, 'hide')) this.show();
    else this.hide();

    const { top, left, width, height } = btn.getBoundingClientRect();
    const parent_el_container = (this.parent_inner_container_el.style.left =
      left + 'px');

    const scrollTop = document.documentElement.scrollTop;

    this.parent_inner_container_el.style.top = top + height + scrollTop + 'px';
    this.parent_inner_container_el.style.left = left + 'px';

    // if btn is from cur_user tweet dropdown options (change-who-can-reply of posted_tweet)
    if (btn.dataset.audience_reply) {
      [...this.parent_el.querySelectorAll('.preview-item')].forEach((el) => {
        el.dataset.active = el.dataset.value === btn.dataset.audience_reply;
      });
    }

    this.show();
  }

  _set_cur_item_active_only(el) {
    const cur_preview_item = el.closest('.preview-item');
    [...this.parent_el.querySelectorAll('.preview-item')].forEach((el) => {
      if (el !== cur_preview_item) return (el.dataset.active = false);
      el.dataset.active = true;
    });
  }

  set_who_can_reply_btn_text_And_value_in_tweet(value, tweet) {
    const audience_can_reply_btn = tweet.querySelector(
      'button[data-action="choose-whocan-reply"]'
    );

    // 1.css styling on btn(change color of btn)
    // 2.set choose-audience-btn span text content and input value
    // 3.set audience-can-reply-btn span text content and input value

    ////////////////////////////////////////////////////////////
    // 2.set choose-audience-btn span text content and input va

    const audience_can_reply_span_el =
      audience_can_reply_btn.querySelector('span');
    const audience_can_reply_input_el =
      audience_can_reply_btn.querySelector('input');

    audience_can_reply_span_el.textContent = value;
    audience_can_reply_input_el.value = value;

    if (value === 'everyone') {
      audience_can_reply_span_el.textContent = 'Everyone can reply';
    }
    if (value === 'following') {
      audience_can_reply_span_el.textContent = 'People you follow can repy';
    }
    if (value === 'circle') {
      audience_can_reply_span_el.textContent =
        'Only People you mention can reply';
    }
  }

  handle_click_on_item(target, handle) {
    const item_el = target.closest('.preview-item');
    if (!item_el) return;

    const { value } = item_el.dataset;

    // 1.set item active
    this._set_cur_item_active_only(target);

    // 2.check tweet type(if multiple then we need to change all tweet choose and reply btn)
    if (this.multiple_tweets) {
      const all_multiple_tweets = this.btn_el
        .closest('.createTweets-list')
        .querySelectorAll('.form--createTweet[data-tweet-in-use="true"]');

      all_multiple_tweets.forEach((tweet) =>
        this.set_who_can_reply_btn_text_And_value_in_tweet(value, tweet)
      );
    } else if (this.btn_el.closest('.form--createTweet')) {
      const tweet = this.btn_el.closest('.form--createTweet');
      this.set_who_can_reply_btn_text_And_value_in_tweet(value, tweet);

      // dropdown
    } else {
      if (this.btn_el.closest('.dropdown')) {
        const dropdown = this.btn_el.closest('.dropdown');

        const tweet_id = dropdown.dataset.postId;

        handle('update-tweet', {
          tweet_id: tweet_id,
          update_tweet: { audience_can_reply: value },
        });
      }
    }

    this.hide();

    // handle edit circle btn
  }

  add_handler_preview(handle) {
    this.handle_abs_el(handle);
  }
}

export default ChooseWhoCanReply;
