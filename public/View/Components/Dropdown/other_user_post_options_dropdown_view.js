import AbsDropdownView from '../../Common/AbsDropdownView.js';

class PostedTweetOptionsDropdown extends AbsDropdownView {
  _topParentEl = document.querySelector('.postedTweet-list');
  _parentEl = document.querySelector(
    '.dropdown[data-type="post-options-dropdown"]'
  );
  _dropdownListEl = this._parentEl.querySelector('.dropdown-list');
  _dropdown_content = this._parentEl.querySelector('.dropdown-content');

  render_and_show_dropdown(post_type, post) {
    let html;
    html = post_type === 'tweet' ? this.generate_posted_tweet_markUp(post) : '';

    this._dropdown_content.innerHTML = '';
    this._dropdown_content.insertAdjacentHTML('afterbegin', html);
  }

  // CSS change and tweet dom el attr field change

  generate_posted_tweet_markUp(tweet_data) {
    let {
      _id,

      user: { avatar, _id: user_id },
      follow_by_cur_user,
      mute_by_cur_user,
      block_by_cur_user,
    } = tweet_data;


    follow_by_cur_user =
      follow_by_cur_user === true || follow_by_cur_user === 'true'
        ? true
        : false;
    mute_by_cur_user =
      mute_by_cur_user === true || mute_by_cur_user === 'true' ? true : false;
    block_by_cur_user =
      block_by_cur_user === true || block_by_cur_user === 'true' ? true : false;

    this._parentEl.dataset.postId = _id;
    this._parentEl.dataset.postUserId = user_id;
    this._parentEl.dataset.postUserName = avatar;
    this._parentEl.dataset.postType = 'tweet';
    this._parentEl.dataset.tweetUser = JSON.stringify(tweet_data.user);

    return `
          <div class="dropdown-item" data-field="block-tweet" data-action="block-tweet" data-value="false">
            <i class="fas fa-frown" aria-hidden="true"></i>
            <span>Not intersected in this Tweet</span>
          </div>

          <div class="dropdown-item"  data-field="follow_by_cur_user" data-action="${
            follow_by_cur_user ? 'unfollow-user' : 'follow-user'
          }" data-value="${follow_by_cur_user}">
            <i class="fas fa-user-${
              follow_by_cur_user ? 'times' : 'plus'
            }" aria-hidden="true"></i>
            <span>${follow_by_cur_user ? 'Unfollow' : 'Follow'} ${avatar}</span>
          </div>
      
          <div class="dropdown-item" data-field="mute_by_cur_user" data-action="${
            mute_by_cur_user ? 'unmute' : 'mute'
          }-user" data-value="${mute_by_cur_user}">
            <i class="fa fa-volume-${
              mute_by_cur_user ? 'up' : 'off'
            }" aria-hidden="true"></i>
            <span>${mute_by_cur_user ? 'Unmute' : 'Mute'} ${avatar}</span>
          </div>
          <div class="dropdown-item" data-field="block_by_cur_user" data-action="${
            block_by_cur_user ? 'unblock' : 'block'
          }-user" data-action="${
            block_by_cur_user ? 'Unblock' : 'Block'
          }-user" data-value="${block_by_cur_user}">
          <i class="${
            block_by_cur_user ? 'fa fa-user' : 'fas fa-user-alt-slash'
          }" aria-hidden="true"></i>
          <span>${block_by_cur_user ? 'Unblock' : 'Block'}  ${avatar}</span>
       </div>
    
  
    `;
  }

  handle_dropdown_options(handle) {
    // handle dropdown option
    this._parentEl.addEventListener('click', (e) => {
      const list_item = e.target.closest('.dropdown-item');
      if (!list_item) return;

      // 0.if dropdown item clicked,pass the value and hide dropdown

      const { postUserId, postType, postId } = this._parentEl.dataset;
      let { action, field, value } = list_item.dataset;

      // CSS STUFF ------------------------------------------------------
      value = value === 'true' ? false : true;
      // list_item.dataset.value = value;
      // this.update_posted_tweet_dom_el(postUserId, field, value, postId);

      this.hide();

      return handle(action, {
        post_id: postId,
        post_type: postType,
        user_id: postUserId,
        user_data: JSON.parse(this._parentEl.dataset.tweetUser),
        field,
        value,
      });
    });
  }
}

export default PostedTweetOptionsDropdown;
