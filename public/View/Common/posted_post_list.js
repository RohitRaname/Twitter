class ParentPostedView {
  _topParentEl;
  _parentEl;
  _section;
  _postOptionsDropdown = document.querySelector(
    '.dropdown[data-type="post-options-dropdown"]'
  );
  _retweet_quote_tweet_Dropdown = document.querySelector(
    '.dropdown[data-type="retweet_quote_post"]'
  );

  _login_user = document.querySelector('body[data-login-user="true"]');

  _post_reply_modal = document.querySelector('.tweet-reply');

  // 1.need to change dropdown

  // btn
  _tweet_reply_btn;
  _retweet_quote_tweet_btn;

  render(user, tweet) {
    const html = this._generate_markUp(user, tweet);
    this._topParentEl.insertAdjacentHTML('afterbegin', html);
  }

  _generate_markUp(user, tweet) {}

  // CSS STUFF------------------------------------------
  _set_btn_active(type) {
    if (type === 'write-comment') this._tweet_reply_btn.dataset.active = true;
    if (type === 'retweet') this._retweet_quote_tweet_btn.dataset.active = true;
  }

  //////////////////////////////////////////////////////////////////////

  _setDOMSElsAndDataAttrs(target) {
    // set post dropdown attribute from tweet detail attribute
    this._parentEl = target.closest('.postedTweet');
    this._topParentEl = target.closest('.postedTweet-list');

    this._posted_tweetlist = this._topParentEl.querySelector('.posted-tweets');
    this._pinned_tweetlist = this._topParentEl.querySelector('.pinned-tweets');

    if (!this._parentEl || this._parentEl === undefined) return;

    this.page = target.closest('.section').dataset.page;

    this.post_data = JSON.parse(this._parentEl.dataset.post);
    const post_user = this.post_data.user;

    this.post_user_id = post_user._id;
    this.post_user_name = post_user.name;
    this.post_user_avatar = post_user.avatar;

    this.post_id = this.post_data._id;
    this.post_type = this.post_data.type;
    this.post_format = this.post_data.format;

    this._tweet_reply_btn = this._parentEl.querySelector(
      'button[data-action="write-comment"]'
    );
    this._retweet_quote_tweet_btn = this._parentEl.querySelector(
      'button[data-action="retweet"]'
    );
  }

  update_posted_tweet_btn_count_and_active_state(
    btn_type,
    count,
    active_state
  ) {
    const btn = this._parentEl.querySelector(
      `button[data-action="${btn_type}"]`
    );

    btn.dataset.active = active_state;
    console.log(btn_type);

    active_state =
      active_state === 'true' || active_state === true ? true : false;

    const btn_icon = btn.querySelector('i');

    if (btn_type === 'like')
      btn_icon.className = `fa fa-heart${active_state === true ? '' : '-o'}`;
    if (btn_type === 'write-comment')
      btn_icon.className = `fa fa-commenting${
        active_state === true ? '' : '-o'
      }`;
    if (btn_type === 'bookmark')
      btn_icon.className = `fa fa-bookmark${active_state === true ? '' : '-o'}`;

    if (!btn.querySelector('span')) return;
    const count_value = Number(btn.querySelector('span').textContent);
    btn.querySelector('span').textContent = count_value + count;
  }

  _handle_like_unlike_post(target, handle) {
    const btn = target.closest('button[data-action="like"]');
    if (!btn) return;

    let active;
    active = btn.dataset.active;
    active = active === 'true' ? false : true;

    if (this._login_user) {
      // set btn
      btn.dataset.active = active;
      const btn_icon = btn.querySelector('i');

      btn_icon.className = `fa fa-heart${active === true ? '' : '-o'}`;
    }

    // update the count

    const data = {
      post_type: this.post_type,
      post_user_name: this.post_user_name,
      action: 'like',
      post_id: this.post_id,
    };

    active === true ? handle('like-post', data) : handle('unlike-post', data);

    const like_count_el = btn.querySelector('span');

    if (!like_count_el || !this._login_user) return;
    const count_value = Number(like_count_el?.textContent);
    like_count_el.textContent = active ? count_value + 1 : count_value - 1;
  }

  _handle_retweet_quote_post(target, handle) {
    const btn = target.closest('button[data-action="retweet"]');
    if (!btn) return;

    // login user
    if (this._login_user) {
      const retweet_item_el = this._retweet_quote_tweet_Dropdown.querySelector(
        '.dropdown-item[data-action="retweet"]'
      );

      const retweet_item_span_el =
        this._retweet_quote_tweet_Dropdown.querySelector(
          '.dropdown-item[data-action="retweet"] span'
        );

      let { active } = btn.dataset;
      active = active === 'true' ? false : true;

      retweet_item_el.dataset.value = active;

      retweet_item_span_el.textContent = active ? 'Retweet' : 'Undo Retweet';

      // set the necessary attr in retweet quote dropdown

      this._retweet_quote_tweet_Dropdown.dataset.post =
        this._parentEl.dataset.post;
    }

    handle('retweet-post', {
      post_user_name: this.post_user_name,
      action: 'retweet',
    });
  }

  // comment on post
  _handle_reply_to_post(target, handle) {
    const btn = target.closest('button[data-action="write-comment"]');
    if (!btn) return;

    const reply_tweet_obj = {};

    reply_tweet_obj.posted_tweet = JSON.parse(this._parentEl.dataset.post);

    reply_tweet_obj.tweet_type = 'comment';
    reply_tweet_obj.posted_tweet.reply_to =
      reply_tweet_obj.posted_tweet.user.avatar;

    reply_tweet_obj.post_user_name = this.post_user_name;
    reply_tweet_obj.action = 'comment';

    handle('add-comment-on-tweet', reply_tweet_obj);
    // this._post_reply_modal.classList.replace('hide', 'display');
  }

  _handle_bookmark_post(target, handle) {
    const btn = target.closest('button[data-action="bookmark"]');
    if (!btn) return;

    let { active } = btn.dataset;
    active = active === 'true' ? false : true;

    if (this._login_user) {
      btn.querySelector('.icon-box').dataset.active = active;
      btn.dataset.active = active;
      const btn_icon = btn.querySelector('i');

      btn_icon.className = `fa fa-bookmark${active === true ? '' : '-o'}`;

      btn.dataset.active = active;
    }
    const data = {
      post_user_name: this.post_user_name,
      post_type: this.post_type,
      post_id: this.post_id,
      action: 'bookmark',
    };

    active === true
      ? handle('bookmark-post', data)
      : handle('unbookmark-post', data);
  }

  _handle_post_options_dropdown(target, handle) {
    // 1.set tweet id and tweet user id in dropdown
    // 2.set tweet user name in list item span el

    const btn = target.closest('.tweet-options-btn');
    if (!btn) return;

    const post_options_dropdown_classname = btn.dataset.dropdownClass;

    handle(`display-${post_options_dropdown_classname}`, this.post_data);
  }

  _click_on_post(target, handle) {
    // name or img or avatar
    if (
      target.closest('.tweet-img') ||
      target.closest('.tweet-user_name') ||
      target.closest('.tweet-user__email')
    ) {
      handle('redirect-to-user', { avatar: this.post_user_avatar });
    } else {
      if (!target.closest('button') && !target.closest('.comment-tweet')) {
        let show_comment_with_gallery;
        if (target.closest('.tweet-uploadImg'))
          show_comment_with_gallery = 'gallery';
        else show_comment_with_gallery = 'normal';

        handle('redirect-to-post', {
          post_type: this.post_type,
          post_id: this.post_id,
          show_comment_with_gallery,
        });
      }
    }
  }
  additional_funcs() {}

  handle_post(handle, e) {
    const target = e.target;

    // TASKS
    //-- 1.display user-preview when hover on user detail(name,avatar) => taken cart by user preview (already written func)
    //-- 2.display tweet options dropdown when clicked on dropdown btn(notification bar)
    //-- 3.click on tweet user interaction btns(like,retweet,comment,bookmark)

    this._setDOMSElsAndDataAttrs(target);

    if (!this._parentEl) return;

    // 1. => already done

    // 2.display tweet options dropdown when clicked on dropdown btn(notification bar)
    this._handle_post_options_dropdown(target, handle);

    this._handle_reply_to_post(target, handle);

    this._handle_like_unlike_post(target, handle);

    this._handle_retweet_quote_post(target, handle);

    this._handle_bookmark_post(target, handle);

    this._click_on_post(target, handle);

    this.additional_funcs(target, handle);
  }
}

export default ParentPostedView;
