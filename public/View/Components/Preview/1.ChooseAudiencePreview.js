import abs_component_view from '../../Common/abs_component_view.js';
import { addClass, contains, replaceClass } from '../../utils/domHelper.js';
class ChooseAudiencePreview extends abs_component_view {
  parent_el = document.querySelector('.preview[data-type="choose-audience"]');
  parent_el_class = '.preview[data-type="choose-audience"]';
  parent_inner_container_el =
    this.parent_el.querySelector('.preview-container');
  btn_el_class = 'button[data-action="choose-audience"]';
  edit_circle_modal = document.querySelector(
    '.modal[data-action="edit-your-circle"]'
  );

  _circle_count_el = this.parent_el.querySelector(
    '.choose-audience-circle-count'
  );

  btn_el;
  btn_text_el;
  btn_input_el;

  audience_can_reply_btn;

  // Share with other controller
  update_circle_count(circle_count) {
    this._circle_count_el.textContent = circle_count;
  }

  increase_or_decrease_circle_count(count) {
    const cur_count = Number(this._circle_count_el.textContent);
    this._circle_count_el.textContent = cur_count + count;
  }

  ///////////////////////////////////////////////////////////////
  setDOMEls(btn) {
    this.btn_el = btn;
    this.btn_text_el = btn.querySelector('span');
    this.btn_input_el = btn.querySelector('input');

    // 1.5 find the type of tweet (multiple tweet or single tweet)
    this.multiple_tweets = btn.closest('[data-multiple-tweets="true"] ')
      ? true
      : false;

    this.audience_can_reply_btn = btn
      .closest('.createTweet')
      .querySelector('button[data-action="choose-whocan-reply"]');
    this.audience_can_reply_text_el =
      this.audience_can_reply_btn.querySelector('span');
    this.audience_can_reply_input_el =
      this.audience_can_reply_btn.querySelector('input');
  }

  // set position of preview component relative to btn
  handle_click_on_display_btn(target) {
    const btn = target.closest(this.btn_el_class);
    if (!btn) return;

    this.setDOMEls(btn);

    if (contains(this.parent_el, 'hide')) this.show();
    else this.hide();

    console.log(this.multiple_tweets);
    const { top, left, width, height } = btn.getBoundingClientRect();
    const scrollTop = document.documentElement.scrollTop;

    this.parent_inner_container_el.style.left = left + 'px';
    this.parent_inner_container_el.style.top = top + height + scrollTop + 'px';

    this.show();
  }

  _set_cur_item_active_only(el) {
    const cur_preview_item = el.closest('.preview-item');
    [...this.parent_el.querySelectorAll('.preview-item')].forEach((el) => {
      if (el !== cur_preview_item) return (el.dataset.active = false);
      el.dataset.active = true;
    });
  }

  // set tweet btn value and some css
  set_choose_audience_btn_text_and_its_input_in_tweet(value, tweet) {
    const choose_audience_btn = tweet.querySelector(
      'button[data-action="choose-audience"]'
    );
    const audience_can_reply_btn = tweet.querySelector(
      'button[data-action="choose-whocan-reply"]'
    );

    // 1.css styling on btn(change color of btn)
    // 2.set choose-audience-btn span text content and input value
    // 3.set audience-can-reply-btn span text content and input value

    // 1.css styling on btn(change color of btn)
    if (value === 'everyone') {
      contains(choose_audience_btn, 'btn--inline-secondary')
        ? replaceClass(
            choose_audience_btn,
            'btn--inline-secondary',
            'btn--inline-primary'
          )
        : addClass(choose_audience_btn, 'btn--inline-primary');
    }
    if (value === 'circle')
      choose_audience_btn.classList.replace(
        'btn--inline-primary',
        'btn--inline-secondary'
      );

    ////////////////////////////////////////////////////////////
    // 2.set choose-audience-btn span text content and input va

    const choose_audience_span_el = choose_audience_btn.querySelector('span');
    const choose_audience_input = choose_audience_btn.querySelector('input');
    choose_audience_span_el.textContent = value;
    choose_audience_input.value = value;

    // 3.set audience-can-reply-btn span text content and input value

    const audience_can_reply_text_el =
      audience_can_reply_btn.querySelector('span');
    const audience_can_reply_input_el =
      audience_can_reply_btn.querySelector('input');

    if (value === 'circle') {
      audience_can_reply_btn.disabled = true;
      audience_can_reply_btn.dataset.restrict = true;
      audience_can_reply_text_el.textContent = 'Only in circle can reply';
      audience_can_reply_text_el.value = 'circle';
    } else if (value === 'everyone') {
      audience_can_reply_btn.dataset.restrict = false;
      audience_can_reply_btn.disabled = false;
      audience_can_reply_text_el.textContent = 'everyone can reply';
      audience_can_reply_input_el.value = 'everyone';
    }
  }

  handle_click_on_item(target, handle) {
    const item_el = target.closest('.preview-item');
    if (!item_el) return;

    const { value } = item_el.dataset;

    // 0.if edit circle btn is clicked
    if (
      value === 'circle' &&
      target.closest('[data-action="open-user-edit-circle"]')
    ) {
      this.hide();
      handle('show-circle-modal');
      return;
    }

    // 1.set item active
    this._set_cur_item_active_only(target);

    // 2.check tweet type(if multiple then we need to change all tweet choose and reply btn)
    if (this.multiple_tweets) {
      const all_multiple_tweets = this.btn_el
        .closest('.createTweets-list')
        .querySelectorAll('.form--createTweet[data-tweet-in-use="true"]');

      all_multiple_tweets.forEach((tweet) =>
        this.set_choose_audience_btn_text_and_its_input_in_tweet(value, tweet)
      );
    } else {
      const tweet = this.btn_el.closest('.form--createTweet');
      this.set_choose_audience_btn_text_and_its_input_in_tweet(value, tweet);
    }

    this.hide();

    // handle edit circle btn
  }

  addHandlerPreview(handle) {
    this.handle_abs_el(handle);
  }
}

export default ChooseAudiencePreview;
