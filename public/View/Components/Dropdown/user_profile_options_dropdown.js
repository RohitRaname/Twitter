import AbsDropdownView from '../../Common/AbsDropdownView.js';

class user_profile_options_dropdown_view extends AbsDropdownView {
  _topParentEl = document.querySelector('.user .user-btns');
  _parentEl = document.querySelector(
    '.dropdown[data-type="user-profile-options-dropdown"]'
  );
  _dropdownListEl = this._parentEl.querySelector('.dropdown-list');
  _dropdown_content = this._parentEl.querySelector('.dropdown-content');

  _user_data;

  _boolean_converter(value) {
    return value === 'true' || value === true ? true : false;
  }

  generate_dropdown_markup(user_data) {
    this._user_data = user_data;

    let { avatar, mute_by_cur_user, follow_by_cur_user, block_by_cur_user } =
      user_data;

    mute_by_cur_user = this._boolean_converter(mute_by_cur_user);
    follow_by_cur_user = this._boolean_converter(follow_by_cur_user);
    block_by_cur_user = this._boolean_converter(block_by_cur_user);

    return `
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

  render_and_show_dropdown(post) {
    let html;
    html = this.generate_dropdown_markup(post);

    this._dropdown_content.innerHTML = '';
    this._dropdown_content.insertAdjacentHTML('afterbegin', html);
  }

  set_postion_of_dropdown(dropdown_btn, page_scroll_top) {
    const { top, left, width, height } = dropdown_btn.getBoundingClientRect();

    this._dropdownListEl.style.top = top + page_scroll_top - 6 + 'px';
    this._dropdownListEl.style.left =
      left - 57 - this._dropdownListEl.getBoundingClientRect().width + 'px';
  }

  handle_dropdown_options(handle) {
    // handle dropdown option
    this._parentEl.addEventListener('click', (e) => {
      const list_item = e.target.closest('.dropdown-item');
      if (!list_item) return;

      // 0.if dropdown item clicked,pass the value and hide dropdown

      let { action, value, field } = list_item.dataset;

      value = value === 'true' ? false : true;

      this._user_data[field] = value;

      // CSS STUFF ------------------------------------------------------

      //  this._user_data.mute_by_cur_user

      this.hide();

      return handle(action, this._user_data, field, value);
    });
  }
}

export default user_profile_options_dropdown_view;
