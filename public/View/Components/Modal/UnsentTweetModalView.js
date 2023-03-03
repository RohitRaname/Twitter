import ModalView from '../../Common/ModalView.js';
import DiscardDraftTweetPopupView from '../Popup/DraftUnsentTweet/DraftTweetPopup.js';

class UnsentTweetModalView extends ModalView {
  _parentEl = document.querySelector(".modal[data-modal='unsent-tweets']");

  _generate_markUp(tweet) {
    const { tweet_type, posted_tweet } = tweet;
    const tweet_user = posted_tweet.user;

    if (tweet_type.includes('draft')) {
      return `
      <li
        class="preview-item modal-item preview-item--sm"
        data-active="false"
        data-tweet-id="${tweet._id}"
        data-tweet-type="${tweet_type}"
        data-tweet='${JSON.stringify(tweet)}'
    >
        <div class="btn--checkbox" data-checked="false">
          <i class="fa fa-check" aria-hidden="true"></i>
        </div>
        <div class="preview-details">
          <div class="preview-extra">
            ${
              tweet_type === 'draft-quote'
                ? `<i class="fas fa-retweet" aria-hidden="true"></i>
              <p>Quoting to <span>${tweet_user.name}</span></p>`
                : ''
            }
            ${
              tweet_type === 'draft-comment'
                ? `<i class="fas fa-comment" aria-hidden="true"></i>
              <p>Replying to <span>${tweet_user.name}</span></p>`
                : ''
            }
          </div>
          <div class="preview-text">${tweet.text}</div>
        </div>
        <div class="preview-upload-img">
            ${
              tweet.upload_imgs.length > 0
                ? `<img src="/img/${
                    !tweet_type.includes('comment') ? 'tweets' : 'comments'
                  }/${tweet.upload_imgs.slice(0, 1)}">`
                : ''
            }
        </div>
    </li>
    <div class="line">&nbsp;</div>

    `;
    }
    if (tweet_type.includes('schedule')) {
      return `
      <li
        class="preview-item modal-item preview-item--sm"
        data-active="false"
        data-tweet-id="${tweet._id}"
        data-tweet-type="${tweet_type}"
        data-tweet=${JSON.stringify(tweet)}
    >
        <div class="btn--checkbox" data-checked="false">
          <i class="fa fa-check" aria-hidden="true"></i>
        </div>
        <div class="preview-details">
            <div class="preview-extra">
              <i class="fas fa-clock" aria-hidden="true"></i>
              <p>Will send on <span>${new Date(
                tweet.schedule_post_time
              ).toLocaleString()}</span></p>
            </div>
            <p class="t--sm">
            ${
              tweet_type === 'schedule-quote'
                ? `
              <i class="fas fa-retweet" aria-hidden="true"></i>Quoting to
              <span>${tweet_user.name}</span>
              `
                : ''
            }
            ${
              tweet_type === 'schedule-comment'
                ? `
              <i class="fas fa-comment" aria-hidden="true"></i>Replying to
              <span>${tweet_user.name}</span>
              `
                : ''
            }
            </p>
            <div class="preview-text">${tweet.text}</div>
        </div>
      
        <div class="preview-upload-img">
        ${
          tweet.upload_imgs.length > 0
            ? `<img src="/img/${
                !tweet_type.includes('comment') ? 'tweets' : 'comments'
              }/${tweet.upload_imgs.slice(0, 1)}">`
            : ''
        }
        </div>
    </li>
    <div class="line">&nbsp;</div>
    `;
    }
  }

  remove_section_item_el(section, tweet_id) {
    this._parentEl
      .querySelector(`.modal-section[data-section="${section}"]`)
      .querySelector('.modal-list')
      .querySelector(`li[data-tweet-id="${tweet_id}"]`)
      .remove();
  }

  _getAllItemsFromAllSection() {
    return [...this._parentEl.querySelectorAll('.modal-item')];
  }

  _getCountOfCurSectionActiveItemEls() {
    return [
      ...this._currentActiveSectionEl.querySelectorAll(
        'li[data-active="true"]'
      ),
    ].length;
  }

  _setAlLeastOneItemSelectedAttrAndDeleteBtnState(attrState, disabledbtn) {
    this._parentEl.setAttribute('data-atleast-1-item-selected', attrState);
    if (this._deleteBtn) this._deleteBtn.disabled = disabledbtn;
  }

  _setItemElActiveState(el, activeState) {
    if (!el) return;
    el.dataset.active = activeState;
    el.querySelector('.btn--checkbox').dataset.checked = activeState;
  }

  reset() {
    // set all paretn el atrribute to false
    this._parentEl.setAttribute('data-edit-items', false);
    this._setAlLeastOneItemSelectedAttrAndDeleteBtnState(false, true);

    // unselect last opened section item els
    this._getCurSectionAllItemEls().forEach((el) => {
      if (!el) return;
      this._setItemElActiveState(el, 'false');
    });
  }

  _delete_item(target, handle) {
    const btn = target.closest('button[data-action="delete"]');
    if (!btn) return;
    const { section } = this._currentActiveSectionEl.dataset;
    const tweet_arr = this._getCurSectionAllActiveItemEls().map((el) => {
      // el.remove();
      const { tweetId, tweetType } = el.dataset;
      return { tweet_id: tweetId, tweet_type: tweetType };
    });

    handle(`delete-tweets`, tweet_arr);
  }

  _select_item(target, handle) {
    const itemEl = target.closest('.preview-item');
    if (!itemEl) return;

    // if items is clicked not btn if edit functionality is not open then this means to put this tweet into multiple tweet modal
    if (this._parentEl.getAttribute('data-edit-items') === 'false') {
      const tweet_data = JSON.parse(itemEl.dataset.tweet);
      handle('insert-tweet-in-multiple-tweets-form', tweet_data);

      this.hide();
      return;
    }

    // active item and checking the box
    // const itemCheckBoxEl = itemEl.querySelector('.btn--checkbox');
    let { active } = itemEl.dataset;
    active = active === 'true' ? false : true;
    this._setItemElActiveState(itemEl, active);

    // itemCheckBoxEl.dataset.checked = checked;
    // itemEl.dataset.active = checked;

    // showing deselectall and active delete btn when alleast one el is active
    if (this._getCountOfCurSectionActiveItemEls() > 0) {
      this._setAlLeastOneItemSelectedAttrAndDeleteBtnState(true, false);
      return;
    }

    this._parentEl.setAttribute('data-atleast-1-item-selected', false);
    this._deleteBtn.disabled = true;

    this._setAlLeastOneItemSelectedAttrAndDeleteBtnState(false, true);
  }

  _edit_items(target) {
    const btn = target.closest('button[data-action="allow-to-edit-items"]');
    if (!btn) return;

    this._parentEl.setAttribute('data-edit-items', true);
  }

  _done_btn(target) {
    const btn = target.closest('button[data-action="done-with-editing-items"]');
    if (!btn) return;

    this._parentEl.setAttribute('data-edit-items', false);

    // uncheck all item checkbox checked
    this._getCurSectionAllItemEls().forEach(
      (el) => (el.querySelector('.btn--checkbox').dataset.checked = false)
    );

    this._parentEl.setAttribute('data-atleast-1-item-selected', false);
    this._deleteBtn.disabled = true;
  }

  _select_all_items(target) {
    const btn = target.closest('button[data-action="select-all"]');
    if (!btn) return;

    this._getCurSectionAllItemEls().forEach((el) =>
      this._setItemElActiveState(el, 'true')
    );

    this._setAlLeastOneItemSelectedAttrAndDeleteBtnState(true, false);
  }

  _unselect_all_items(target) {
    const btn = target.closest('button[data-action="unselect-all"]');
    if (!btn) return;

    this._getCurSectionAllItemEls().forEach((el) =>
      this._setItemElActiveState(el, 'false')
    );

    this._setAlLeastOneItemSelectedAttrAndDeleteBtnState(false, true);
  }

  handleAdditionalFuncs(target, handle) {
    // edit btns
    this._edit_items(target);

    this._done_btn(target);

    this._select_all_items(target);

    this._unselect_all_items(target);

    this._select_item(target, handle);

    this._delete_item(target, handle);
  }

  addHandlerModal(handle) {
    this.handleModal(handle);
  }
}

export default UnsentTweetModalView;
