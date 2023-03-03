// whenever a component is used twice we should make the component as common View for that component so another component just like can use the component

import create_single_post_view from '../../Common/create_single_post_view.js';

class create_top_level_comment extends create_single_post_view {
  // so methods to be called automatically
  _section = document.querySelector('.section-comment');

  _topParentEl = document.querySelector(
    '.section-comment .comment-form-container'
  );

  emptyAllInputsValue() {
    // parent el
    this._parentEl.setAttribute('data-active', false);
    this._parentEl.setAttribute('data-tweet-schedule', false);
    this._parentEl.setAttribute('data-tweet-empty', true);

    this._textAreaEl.value = '';

    this._uploadImgsMainContainerEl.classList.add('hidden');
    this._uploadImgElsArr.forEach((el) => (el.src = ''));

    // percent complete circle
    this._percentageCircleControllerEl.setAttribute(
      'stroke-dasharray',
      `0,100`
    );
  }

  reset() {
    this._parentEl.dataset.hideParts = true;
    this.emptyAllInputsValue();
    this._textAreaEl.style.height = '26px';
  }

  handleSaveTweet(target, handle) {
    const save_comment = target.closest('button[data-action="save-tweet"]');
    if (!save_comment) return;

    const input_values = this._getAllInputsValue();
    input_values.reply_to = JSON.parse(input_values.reply_to);

    const page_type = this._section.dataset.pageType;

    // 1case
    const tweet_id = input_values.tweet_id;

    // 2ndcase =>parent comment id
    const comment_id = input_values.comment_id;

    const formdata = this.getTweetDataAsFormData(input_values);

    if (page_type === 'tweet_and_comments')
      handle('save-comment', tweet_id, formdata);

    if (page_type === 'comment_and_replies')
      handle('save-comment-reply', comment_id, formdata);
  }

  // FUNCTION BELONG TO PARENT VIEW

  additionalHandleFuncs(target, handle) {
    // show comment form option when clicked
    if (target.closest('.comment-form')) {
      this._parentEl.dataset.hideParts = false;
    }
  }

  add_handler_comment(handle) {
    this.handleTweet(handle);
  }
}

export default create_top_level_comment;
