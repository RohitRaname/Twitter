class user_profile_view {
  _section = document.querySelector('.section-user-profile');
  _parent_el = document.querySelector('.user-profile');
  _tweet_list = this._section.querySelector('.postedTweet-list');

  _login_user = document.querySelector('body').dataset.loginUser === 'true';
  _section_list_arr = [...this._section.querySelectorAll('.post-list')];

  _follow_following_container = this._parent_el.querySelector(
    'div[data-action="follow_or_following"]'
  );

  _profile_user_data;

  // HELPER FUNC --------------------------------------
  _get_profile_user_data() {
    return JSON.parse(this._section.dataset.profileUser);
  }

  // EXPORT FUNC ---------------------------------------
  update_user_data_in_section_dataset_attr(data) {
    this._section.dataset.profileUser = JSON.stringify(data);
  }
  update_user_data_field_in_section_dataset_attr(field, value) {
    const user = this._get_profile_user_data();
    user[field] = value;
    this._section.dataset.profileUser = JSON.stringify(user);
  }

  // set one of the follow or following btn
  set_follow_or_following_button_active_state(cur_user_follow_view_user) {
    this._follow_following_container.dataset.active = cur_user_follow_view_user;
  }

  render_section(section, html, set_page, page_no) {
    const section_list = this._section.querySelector(
      `.post-list[data-type="${section}"]`
    );

    if (set_page) section_list.dataset.page = page_no;

    section_list.insertAdjacentHTML('beforeend', html);
  }

  // HANDLE FUNC -----------------------------------
  _zoom_cover_pic(target) {
    if (!target.closest('.user-profile-cover')) return;
    // data-full-size-img-set="false" data-full-size-img="img-name"
    this._section.setAttribute('data-full-size-img-set', true);
    this._section.setAttribute('data-full-size-img', 'cover-pic');
    document.documentElement.style.overflowY = 'hidden';
  }

  _zoom_profile_pic(target) {
    if (!target.closest('.user-img-box')) return;
    // data-full-size-img-set="false" data-full-size-img="img-name"
    this._section.setAttribute('data-full-size-img-set', true);
    this._section.setAttribute('data-full-size-img', 'profile-pic');
    document.documentElement.style.overflowY = 'hidden';
  }

  _resize_the_zoom_pic(target) {
    if (!target.closest('button[data-action="resize-zoom-img"]')) return;
    this._section.setAttribute('data-full-size-img-set', false);
    this._section.setAttribute('data-full-size-img', '');

    document.documentElement.style.overflowY = 'auto';
  }

  _click_on_profile_btns(target, handle) {
    if (!target.closest('.user-btns-container') || !target.closest('button'))
      return;

    const btn = target.closest('button');

    const { action, active } = btn.dataset;

    // one of the btn is div (we need to target the parent not button)
    const div_parent = btn.closest('div[data-action="follow_or_following"]');

    if (this._login_user) {
      if (div_parent)
        div_parent.dataset.active =
          div_parent.dataset.active === 'true' ? false : true;
      else btn.dataset.active = btn.dataset.active === 'true' ? false : true;
    }
    const profile_user_data = this._get_profile_user_data();

    // click on user profile options btns
    if (action === 'show-profile-options')
      handle('display-user-profile-dropdown', profile_user_data);

    // notify me (understand) when the user has posted tweet
    if (action === 'allow-notification') {
      active === 'true'
        ? handle('remove-user-from-notification-users', {
            profile_user_id: profile_user_data._id,
            profile_user_data: {
              ...profile_user_data,
              send_notification_to_cur_user: false,
            },
          })
        : handle('add-user-to-notification-users', {
            profile_user_id: profile_user_data._id,
            profile_user_data: {
              ...profile_user_data,
              send_notification_to_cur_user: true,
            },
          });
    }

    if (action === 'follow') {
      profile_user_data.follow_by_cur_user = true;
      this.update_user_data_in_section_dataset_attr(profile_user_data);
      handle('follow-user', profile_user_data);
    }

    if (action === 'unfollow') {
      profile_user_data.follow_by_cur_user = false;
      this.update_user_data_in_section_dataset_attr(profile_user_data);

      handle('unfollow-user', profile_user_data);
    }

    // EDIT PROFILE  _--------------------------------
    if (action === 'edit-profile') handle('show-edit-profile-modal');
  }

  _show_following_follow_users(target, handle) {
    if (!target.closest('.user-following-stats')) return;
    const profile_user_data = this._get_profile_user_data();
    const { showUsers } = target.closest('p[data-show-users]').dataset;
    handle(`show-${showUsers}`, profile_user_data);
  }

  _click_on_section_btns(target, handle) {
    const section_btns_el = target.closest('.modal-change-section-btns');
    if (!section_btns_el) return;

    const click_section_btn = target.closest('[data-btn]');
    const { section } = click_section_btn.dataset;

    const get_current_active_section = section_btns_el.querySelector(
      '[data-btn][data-active="true"]'
    );

    // SECTION CHANGE BTN CLICKED -----------------------------------------------------
    // check same section btn click(do nothing)
    if (get_current_active_section.dataset.section === section) return;
    const profile_user = this._get_profile_user_data();
    // if different section btn(render the new section)
    [...section_btns_el.querySelectorAll('[data-btn]')].forEach((btn) => {
      if (btn === click_section_btn) btn.dataset.active = true;
      else btn.dataset.active = false;
    });

    const section_list = this._section.querySelector(
      `.post-list[data-type="${section}"]`
    );
    // SECTION LIST RENDER
    if (section_list.getAttribute('data-initial-docs-set') === 'true')
      return this._section_list_arr.forEach((list) => {
        if (list === section_list) section_list.classList.remove('hidden');
        else list.classList.add('hidden');
      });
    // GET PAGE NO
    // find section page no
    const section_page_no = section_list.dataset.page;
    section_list.setAttribute('data-initial-docs-set', 'true');
    const data = { section, profile_user, section_page: section_page_no };

    // display the render section list
    this._section_list_arr.forEach((list) => {
      if (list === section_list) section_list.classList.remove('hidden');
      else list.classList.add('hidden');
    });

    handle('render-section', data);
  }

  add_handler_user_profile_view(handle) {
    this._parent_el.addEventListener('click', (e) => {
      const target = e.target;

      // click on cover-pic
      this._zoom_cover_pic(target);

      // click on profile-pic
      this._zoom_profile_pic(target);

      // resize the full
      this._resize_the_zoom_pic(target);

      // click on profile btns
      this._click_on_profile_btns(target, handle);

      // click to show followers or following users
      this._show_following_follow_users(target, handle);

      // click on sections btns
      this._click_on_section_btns(target, handle);
    });
  }
}

export default user_profile_view;
