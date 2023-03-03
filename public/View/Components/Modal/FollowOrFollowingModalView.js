import ModalView from '../../Common/ModalView.js';

class FollowOrFollowingModalView extends ModalView {
  _parentEl = document.querySelector(
    ".modal[data-modal='follow-or-following']"
  );

  _cur_user_id = JSON.parse(
    document.querySelector('.section').dataset.curUser ||
      document.querySelector('.section').dataset.cur_user
  )._id;

  _user_info_box = this._parentEl.querySelector('.modal-user-info');
  _user_name_el = this._parentEl.querySelector('.modal-user-name');
  _user_avatar_el = this._parentEl.querySelector('.modal-user-avatar');

  _view_user_id;

  render(section, doc_arr) {
    console.log('data', doc_arr);
    this._sectionElArr.forEach(
      (el) => (el.querySelector('.modal-list').innerHTML = '')
    );

    const insert_list_el = this._parentEl
      .querySelector(`section[data-section=${section}]`)
      .querySelector('.modal-list');

    insert_list_el.innerHTML = '';
    const html = doc_arr
      .map((doc) => this._generate_markUp(doc, section))
      .join('');
    insert_list_el.insertAdjacentHTML('afterbegin', html);
  }

  _generate_markUp(user_doc, section) {
    let { name, bio, avatar, profilePic, follow_by_cur_user, _id } = user_doc;

    if (!follow_by_cur_user) follow_by_cur_user = false;
    this._user_info_box.dataset.userAvatar = `${avatar.slice(1)}`;

    return `
    <div
    class="modal-item preview-item preview-item-container"
    data-state=""
    data-hover=""
    data-follow-user="${section === 'followers' ? follow_by_cur_user : true}"
    data-user-id=${_id}
    data-id=${_id}
    data-name=${name}
    data-avatar=${avatar}
    data-description=${bio}
    data-following_count
    data-followers_count

    data-user-detail-set="false"
  >
    <div class="preview-item-content" data-preview-window-target="">
      <img
        class="preview-img"
        src="/img/users/${profilePic || 'default.jpg'}"
        alt=""
        data-preview-window-target-el="true"
      />
      <div class="preview-details-col">
        <div class="preview-title" data-preview-window-target-el="true">
          ${name}
        </div>
        <div class="preview-extra" data-preview-window-target-el="true">
          ${avatar}
        </div>
        <p class="p--md preview-text">${bio || ''}</p>
      </div>
    </div>
    <p class="preview-state ${
      _id.toString() === this._cur_user_id.toString() ? 'hide' : ''
    }">

      
      <button
      class="btn--outline btn--sm"
      data-follow="true"
      >
      Follow
        </button>
        <button
        class="btn--outline btn--sm"
        data-follow="false"
        >
        Following
        </button>
    </p>
  </div>
  `;
  }

  set_user_name_and_avatar_at_header(name, avatar, user_id) {
    this._user_info_box.dataset.userAvatar = avatar.slice(1);
    this._user_name_el.textContent = name;
    this._user_avatar_el.textContent = avatar;

    this._view_user_id = user_id;
  }

  // add or remove member from/to  twitter circle
  handleSelectItems(target, handle) {
    const itemEl = target.closest('.preview-item');
    if (!itemEl) return;

    // 1.click on follow or unfollow btn
    // 2.click on item not btn

    let { avatar } = itemEl.dataset;

    ///----------------------------------------------------------------
    // 1.click on follow or unfollow btn
    const button = target.closest('button[data-follow]');
    if (button) {
      // sending imf
      const { follow } = button.dataset;
      const action = follow === 'true' ? 'follow' : 'unfollow';
      const follow_value = follow === 'true' ? 'true' : 'false';
      handle(action, itemEl.dataset);

      // setting item el data attribute (data-follow-user)
      itemEl.dataset.followUser = follow_value;

      return;
    }

    // 2.click on preview item
    return handle('redirect-to-user', itemEl.dataset);
  }

  _click_on_header_following_username(target, handle) {
    // 1.click on header twitter account name(the account which we are viewing follow and following stats)
    const user_account_stats = target.closest('.modal-user-info');
    if (user_account_stats) {
      const avatar = user_account_stats.getAttribute('data-user-avatar');
      return handle('redirect-to-user', { avatar });
    }
  }

  // additional function
  handleAdditionalFuncs(target, handle) {
    this._click_on_header_following_username(target, handle);
    this.load_more_docs(handle);
  }
}

export default FollowOrFollowingModalView;
