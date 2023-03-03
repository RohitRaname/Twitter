import ModalView from './../../Common/ModalView.js';
import { replaceClass } from '../../utils/domHelper.js';

export default class add_chat_user_modal extends ModalView {
  _section = document.querySelector('.section');
  _parentEl = document.querySelector('.modal[data-modal="add-chat-user"]');

  // input
  _search_input = this._parentEl.querySelector('.search-input');

  // info
  _cur_user_data = JSON.parse(this._section.dataset.cur_user);
  _cur_user_id = this._section.dataset.cur_user_id;
  // el
  _search_list = this._parentEl.querySelector('.modal-list');

  show() {
    replaceClass(this._parentEl, 'hidden', 'view');
    // this._parentEl.classList.remove('hide');
    document.documentElement.style.overflowY = 'hidden';
  }

  _generate_markup(user, insert_in_first_section = false) {
    return `
    <div class="modal-item preview-item-container preview-item" data-state data-user-id=${
      user._id || user.userId
    } data-name=${user.name} data-avatar=${user.avatar} data-description=${
      user.bio
    } data-following_count=${user.following_count} data-followers_count=${
      user.followers_count
    }
    data-user=${JSON.stringify(user)} 
    
    >
      <div class="preview-item-content"><img class="preview-img" src="/img/users/${
        user.profilePic
      }" onerror="this.src='/img/users/default.png'"  alt="" data-preview-window-target-el="true"/>
        <div class="preview-details">
          <div class="preview-title" data-preview-window-target-el="true">${
            user.name
          }</div>
          <div class="preview-extra" data-preview-window-target-el="true">${
            user.avatar
          }</div>
        </div>
      </div>
      <p class="preview-state hidden">
       
      </p>
    </div>`;
  }

  _get_search_list() {
    return this._parentEl.querySelector('.modal-list');
  }

  render(message_arr) {
    this._search_list.innerHTML = '';
    if (message_arr.length === 0) return;
    const html = message_arr
      .map((message) => this._generate_markup(message))
      .join('');
    this._search_list.insertAdjacentHTML('beforeend', html);
  }

  // _search_future_chat_users(handle){}
  _setdom_els_and_attr(target) {
    // els
    this._search_list = this._parentEl.querySelector('.modal-list');
  }

  _search_future_chat_users(handle) {
    this._search_input.addEventListener('input', () => {
      const value = this._search_input.value.trim();
      if (value === '') return;

      handle('search-future-chat-users', {
        word: value,
        cur_user_id: this._cur_user_id,
      });
    });
  }

  _handle_searchlist(handle) {
    this._parentEl.addEventListener('click', (e) => {
      const target = e.target;
      this._setdom_els_and_attr(target);

      this.hideModalWhenOverlayIsClicked(target);

      this._handleBackBtn(target)

      const item = target.closest('.modal-item');
      if (!item) return;
      const { user } = item.dataset;

      const data = { users: [this._cur_user_data, JSON.parse(user)] };

      // scroll-to-cur-chat-message

      handle('initiate-chat', data);
      this.hide();
    });
  }

  add_handler_modal(handle) {
    this._search_future_chat_users(handle);
    this._handle_searchlist(handle);
  }
}
