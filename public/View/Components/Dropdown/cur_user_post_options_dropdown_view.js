import AbsDropdownView from '../../Common/AbsDropdownView.js';

class cur_user_post_tweet_options extends AbsDropdownView {
  _topParentEl = document.querySelector('.postedTweet-list');
  _parentEl = document.querySelector(
    '.dropdown[data-type="cur-user-post-options-dropdown"]'
  );
  _dropdownListEl = this._parentEl.querySelector('.dropdown-list');
  _dropdown_content = this._parentEl.querySelector('.dropdown-content');

  // _section = document.querySelector('.')

  // for temporary store
  _tweet_data;

  render_and_show_dropdown(post_type, post) {
    let html;
    html = post_type === 'tweet' ? this.generate_posted_tweet_markUp(post) : '';

    this._dropdown_content.innerHTML = '';
    this._dropdown_content.insertAdjacentHTML('afterbegin', html);
  }

  _boolean_converter(value) {
    return value === 'true' || value === true ? true : false;
  }

  // CSS change and tweet dom el attr field change

  generate_posted_tweet_markUp(tweet_data) {
    // field and value are from tweet data and related to tweet

    let {
      _id,
      pinned,
      user: { avatar, _id: user_id },
    } = tweet_data;

    pinned = this._boolean_converter(pinned);

    // useless - i should have store in global class variable
    this._parentEl.dataset.postId = _id;
    this._parentEl.dataset.postUserId = user_id;
    this._parentEl.dataset.postUserName = avatar;
    this._parentEl.dataset.postType = 'tweet';
    this._parentEl.dataset.postFormat = tweet_data.type;
    this._parentEl.dataset.tweetUser = JSON.stringify(tweet_data.user);

    this._tweet_data = tweet_data;

    return `
            <div class="dropdown-item" data-action="delete-tweet" data-active="false">
                <i class="fas fa-trash-alt" aria-hidden="true"></i><span>Delete</span>
            </div>
            <div class="dropdown-item" data-action="${
              pinned ? 'unpin' : 'pin'
            }-tweet" data-field="pinned" data-value="${
      pinned ? false : true
    }" data-active="false">
                <i class="fa fa-${
                  pinned ? 'chain-broken' : 'thumb-tack'
                }" aria-hidden="true"></i
                ><span>${pinned ? 'Unpin from' : 'Pin to'}  your profile</span>
            </div>
            <div
                class="dropdown-item"
                data-active="false"
                data-field="cur_user_can_reply"
                data-value="${tweet_data.cur_user_can_reply}"
                data-audience_reply="${tweet_data.audience_reply}"
                data-choose-who-can-reply-btn=""
                data-action="choose-whocan-reply"
            >
                <i class="fas fa-comment-dots" aria-hidden="true"></i>
                <span>Change who can reply</span>
                <input type="text" class="hidden">

            </div>
          
    
  
    `;
  }

  handle_dropdown_options(handle) {
    // handle dropdown option
    this._parentEl.addEventListener('click', (e) => {
      const list_item = e.target.closest('.dropdown-item');
      if (!list_item) return;

      // 0.if dropdown item clicked,pass the value and hide dropdown

      const { postUserId, postType, postId, postFormat } =
        this._parentEl.dataset;
      let { action, field, value } = list_item.dataset;

      value = value === 'false' ? false : true;

      // if tweet pinned
      if (action === 'pin-tweet') this._tweet_data.pinned = true;
      if (action === 'unpin-tweet') this._tweet_data.pinned = false;

      this.hide();

      return handle(action, {
        post_id: postId,
        post_type: postType,
        user_id: postUserId,
        post_format: postFormat,
        // user_data: JSON.parse(this._parentEl.dataset.tweetUser),

        tweet_updated: {
          field: field,
          value: value,
        },

        tweet_data: this._tweet_data,
      });
    });
  }
}

export default cur_user_post_tweet_options;
