class PreviewWindowView {
  _parentEl;

  _follow_following_btns;
  // parent on which mouseover event will be fired so we know to which element we need to show window-preview
  _targetEl;

  // post => tweet or comment item
  _post_item_el;

  _login_user = document.querySelector('body').dataset.loginUser === 'true';
  _cur_user = this._login_user
    ? JSON.parse(
        document.querySelector('.section').dataset.cur_user ||
          document.querySelector('.section').dataset.curUser
      )
    : false;

  // taken from parentEl
  user_id;
  user_avatar;
  cur_tweet_hover_user_data;
  user_name;

  hide() {
    this._parentEl.classList.replace('show', 'hide');
  }

  // set dom attr and el use
  // global variable save change with new element we can make use of it

  // attr store permanently till page is loaded

  show() {
    // hiding other preview window execpt this current one
    [...document.querySelectorAll('preview[preview-window]')].forEach((el) =>
      el.classList.add('hide')
    );

    this._parentEl.classList.replace('hide', 'show');
  }

  // there is preview item in preview_el which is different from user preview component
  set_user_info_in_tweet_and_display_user_preview(tweet_preview_el, user_data) {
    const {
      name,
      avatar,
      bio,
      following_count,
      followers_count,
      _id,
      profilePic,
    } = user_data;

    // if there are multiple tweets by same user so i dont want make req for same data for another tweet of multiple tweets as we already have it
    const tweet_group_el = tweet_preview_el.closest('.postedTweet-group');

    if (tweet_group_el && tweet_group_el.dataset.tweetsCount === 'multiple') {
      let all_tweet_group_preview_els = [
        ...tweet_group_el.querySelectorAll('.preview-item'),
      ];
      all_tweet_group_preview_els.forEach((el) => {
        el.dataset.name = name;
        el.dataset.avatar = avatar;
        el.dataset.bio = bio || '';
        el.dataset.followers_count = followers_count;
        el.dataset.following_count = following_count;
        el.dataset._id = _id;
        el.dataset.profilePic = profilePic;

        el.dataset.userDetailSet = 'true';
      });

      tweet_preview_el = all_tweet_group_preview_els[0];
    } else {
      // set info in tweet el for future purpose
      tweet_preview_el.dataset.name = name;
      tweet_preview_el.dataset.avatar = avatar;
      tweet_preview_el.dataset.bio = bio || '';
      tweet_preview_el.dataset.followers_count = followers_count;
      tweet_preview_el.dataset.following_count = following_count;
      tweet_preview_el.dataset._id = _id;
      tweet_preview_el.dataset.profilePic = profilePic;

      tweet_preview_el.dataset.userDetailSet = 'true';
    }

    this.render(tweet_preview_el.dataset);
  }

  update_posted_tweet_dom_el(user_id, follow_by_cur_user) {
    const tweet_items = [
      ...document
        .querySelector('.postedTweet-list')
        .querySelectorAll('.postedTweet'),
    ];

    tweet_items.forEach((tweet_item) => {
      const user_id_match =
        tweet_item.getAttribute('data-post-user-id') === user_id;
      if (user_id_match) {
        const post = JSON.parse(tweet_item.dataset.post);
        post['follow_by_cur_user'] = follow_by_cur_user;
        tweet_item.dataset.post = JSON.stringify(post);
      }
    });
  }

  // update imf of hover user
  render(dataset) {
    const {
      name,
      avatar,
      bio,
      profilePic,
      following_count,
      followers_count,
      _id,
    } = dataset;

    // set detail in tweet so future purpose

    // user preview
    this._parentEl.dataset.user_id = _id;
    this._parentEl.dataset.avatar = avatar;

    this._cur_user && this._cur_user._id.toString() === _id.toString()
      ? this._follow_following_btns.classList.add('hidden')
      : this._follow_following_btns.classList.remove('hidden');

    // set current user follow hover (tweet or comment or modal item)
    // tweet el or comment_el
    if (this._post_item_el.closest('.postedTweet-list')) {
      const post = JSON.parse(this._post_item_el.dataset.post);
      this._parentEl.dataset.followUser = post.follow_by_cur_user;
    }

    // model
    if (this._post_item_el.closest('.modal')) {
      const user = this._post_item_el.dataset;
      // this._parentEl.dataset.followUser = user.follow_by_cur_user;
    }

    // hover render variable save (hover) if go in
    //  to another values
    // perfect to user
    this.cur_tweet_hover_user_data = dataset;

    this.user_avatar = avatar.slice(1);
    this.user_id = _id;
    this.user_name = name;

    this._parentEl.dataset.user_id = _id;
    // extract imformation from user_doc
    this._parentEl.querySelector('.preview-name').textContent = name;
    this._parentEl.querySelector('.preview-avatar').textContent = avatar;
    this._parentEl.querySelector('.preview-description').textContent = bio;
    this._parentEl.querySelector('.preview-following').textContent =
      following_count;
    this._parentEl.querySelector('img').src = `/img/users/${profilePic}`;
    this._parentEl.querySelector(
      '.preview-followers'
    ).textContent = `${followers_count}`;
  }

  _setDOMElsAndAttributes(target) {
    this._userId = this._parentEl.dataset.userId;
  }

  // handle
  _handleClickOnUserAboutDetail(target, handle) {
    const el = target.closest('.preview-about-user') || target.closest('.img');
    if (!el) return;

    handle('redirect-to-user', { avatar: this.user_avatar });
  }

  _handleClickOnFollowingOrFollowsStats(target, handle) {
    const statsBtn =
      target.closest("[data-action='show_user_following']") ||
      target.closest("[data-action='show_user_followers']");
    if (!statsBtn) return;

    const { type } = statsBtn.dataset;

    handle(`show-user-${type}`, {
      avatar: this.user_avatar,
      name: this.user_name,
      type_of_users: type,
      user_id: this.user_id,
    });
  }

  // follow or unFollow Btn
  _handleFollowOrUnfollowBtn(target, handle) {
    const followOrFollowingBtn = target.closest('button[data-follow-btn]');
    if (!followOrFollowingBtn) return;

    if (!this._login_user) {
      this.hide();
      handle('show-login-signup-modal', this.cur_tweet_hover_user_data);
      return;
    }

    let { follow } = followOrFollowingBtn.dataset;
    follow = follow === 'true' ? false : true;

    this._parentEl.dataset.followUser = follow;

    this.update_posted_tweet_dom_el(this.user_id, follow);

    handle(`${follow ? 'follow' : 'unfollow'}-user`, {
      avatar: this.user_avatar,
      follow: follow,
      user_id: this.user_id,
      user_data: this.cur_tweet_hover_user_data,
    });
  }

  _adjust_postion_according_to_component(el) {
    const { top, left, width, height } = el.getBoundingClientRect();
    this._parentEl.style.left = left + 'px';

    const page_scroll_top = document.documentElement.scrollTop;

    // posted_tweet
    if (el.closest('.postedTweet-list')) {
      this._parentEl.style.top = top + page_scroll_top + 25 + 'px';
    }
    if (el.closest('.comment-list')) {
      this._parentEl.style.top = top + page_scroll_top + 10 + 'px';
    }

    if (el.closest('.modal[data-modal="follow-or-following"]')) {
      this._parentEl.style.top =
        top + page_scroll_top + height - height / 4 + 'px';
    }
  }

  addHandlerPreviewWidnow(handle) {
    let delay_render_timeout_id_arr = [];
    let delay_render_timeout = 1300;

    // show preview when hover on target user item and change imf according to hover user
    document.documentElement.addEventListener('mouseover', async (e) => {
      const target = e.target;

      // if its not preview target then can it be preview itself
      if (target.closest('.preview[data-preview-window]')) return;

      // whenever null case is there handle it with if(!)

      if (!target.getAttribute('data-preview-window-target-el'))
        return this.hide();

      // updating value in preview according to target item
      const target_item_el = target.closest('.preview-item');
      const target_position_el = target.closest('.preview-item-container');
      this._post_item_el = target_position_el;

      if (!target_item_el) return;

      const setTimeout_id = setTimeout(() => {
        // GET USER INFO FROM DB
        if (target_item_el.dataset.userDetailSet === 'true')
          this.render(target_item_el.dataset);
        else {
          handle('set-user-info-in-preview', {
            el: target_item_el,
            user_id: target_item_el.dataset.userId,
          });
        }

        this._adjust_postion_according_to_component(target_position_el);
        this.show();
      }, delay_render_timeout);

      target_item_el.addEventListener('mouseleave', () => {
        clearTimeout(setTimeout_id);
      });
    });

    // handle functionality of preview
    this._parentEl.addEventListener('click', (e) => {
      const target = e.target;

      this._setDOMElsAndAttributes(target);

      // redirect to user when click user main details
      this._handleClickOnUserAboutDetail(target, handle);

      // display users following or follow on new page
      this._handleClickOnFollowingOrFollowsStats(target, handle);

      // follow user or unfollow target user
      this._handleFollowOrUnfollowBtn(target, handle);
    });
  }
}
export default PreviewWindowView;
