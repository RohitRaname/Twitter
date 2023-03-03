import AbsDropdownView from '../../Common/AbsDropdownView.js';

class user_logout_dropdown extends AbsDropdownView {
  _topParentEl = document.querySelector('.postedTweet-list');
  _parentEl = document.querySelector('.dropdown[data-type="user-logout"]');
  _dropdownListEl = this._parentEl.querySelector('.dropdown-list');

  _user_other_accounts_container = this._parentEl.querySelector(
    '.dropdown-user-other-accounts'
  );
  // for temporary store
  _tweet_data;

  _generate_markup(data) {
    return `
    <div
        class="dropdown-item preview-item"
        data-active="false"
        data-action="switch-account"
        data-data=${JSON.stringify({ avatar: data.avatar })}
      >
        <img
          class="preview-img"
          src="/img/users/${data.profilePic}"
          alt=""
        />
        <div class="preview-details">
          <div class="preview-title">${data.name}</div>
          <div class="preview-extra">${data.avatar}</div>
        </div>
        <p class="preview-state"><i class="fa fa-check" aria-hidden="true"></i></p>
    </div>
  `;
  }

  insert_item_to_dropdownlist(data_arr) {
    const html = data_arr.map((data) => this._generate_markup(data)).join('');
    this._user_other_accounts_container.insertAdjacentHTML('beforeend', html);
  }

  set_postion_of_dropdown(dropdown_btn, page_scroll_top) {
    const { top, left, width, height } = dropdown_btn.getBoundingClientRect();
    const dropdown_height = this._dropdownListEl.getBoundingClientRect().height;

    this._dropdownListEl.style.top = top - dropdown_height + 'px';
    this._dropdownListEl.style.left = left - 84 + 'px';
  }
}

export default user_logout_dropdown;
