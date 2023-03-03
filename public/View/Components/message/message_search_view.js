export default class message_search_view {
  _section = document.querySelector('.section-message');
  _section_content = this._section.querySelector('.message-content');
  _parentel = this._section.querySelector('.message-search');

  // input
  _search_input = this._parentel.querySelector('.search-input');

  // info
  _cur_user_id = this._section.dataset.cur_user_id;
  _cur_chat_id = this._section.dataset.chat_id;

  // el
  _search_list = this._parentel.querySelector('.message-search-list');

  _generate_markup(message) {
    const { chat_id, chat_message_id, highlight_text, text, to_user, ts } =
      message;

    // const time = new Intl.DateTimeFormat('en-US', {
    //   month: 'short',
    //   day: 'numeric',
    // }).format(new Date(ts));

    const { name, profilePic } = to_user;

    return ` <div class="message-search-item" data-chat_id=${chat_id} data-chat_message_id=${chat_message_id}>
                <div class="preview-item-content">
                  <img
                    class="preview-img img--md"
                    src="/img/users/${profilePic || 'default.png'}"
                    alt=""
                  />

                  <div class="preview-details">
                    <div class="preview-title">
                      ${name}
                      <span class="dot"></span>

                      <t class="t--md">${ts}</t>
                    </div>

                    <p class="p--md preview-text">
                  ${
                    highlight_text
                      ? highlight_text
                          .map((el) => {
                            return el.type === 'hit'
                              ? `<span class="yellow"> ${el.value} </span>`
                              : `<span class=""> ${el.value} </span>`;
                          })
                          .join(' ')
                      : text
                  }
                    </p>

                  </div>
                  <button
                    class="btn--icon-dim-primary mg-l hide"
                    data-dropdown-btn=""
                    data-dropdown-class="search-message-dropdown"
                    data-active="false"
                    data-action="show-item-options"
                  >
                    <div class="icon-box">
                      <i class="fas fa-ellipsis" aria-hidden="true"></i>
                    </div>
                  </button>
                </div>
              </div>`;
  }

  _get_page_width() {
    return document.documentElement.offsetWidth;
  }

  _get_search_list() {
    return this._parentel.querySelector('.message-search-list');
  }

  _active_search_message_item_which_chat_is_being_viewed() {
    const message_item = this._search_list.querySelector(
      `.message-search-item[data-chat_id="${this._cur_chat_id}"]`
    );
    if (message_item) message_item.dataset.active = true;
  }

  render(message_arr) {
    this._search_list.innerHTML = '';
    if (message_arr.length === 0) return;
    const html = message_arr
      .map((message) => this._generate_markup(message))
      .join('');
    this._search_list.insertAdjacentHTML('beforeend', html);
  }

  // _search_message(handle){}
  _setdom_els_and_attr(target) {
    // els
    this._search_list = this._parentel.querySelector('.message-search-list');
  }

  _search_message(handle) {
    this._search_input.addEventListener('input', () => {
      const value = this._search_input.value.trim();
      if (value === '') return;

      handle('search-message', { word: value, cur_user_id: this._cur_user_id });
    });
  }

  _handle_searchlist(handle) {
    this._parentel.addEventListener('click', (e) => {
      const target = e.target;
      this._setdom_els_and_attr(target);

      if (target.closest('button[data-action="show-item-options"]')) return;

      if (target.closest('button[data-action="add-chat-user"]'))
        handle('show-add-chat-user-modal');

      // show all chat messages
      const item = target.closest('.message-search-item');
      if (!item) return;
      const { chat_id, chat_message_id: message_id } = item.dataset;

      const data = { chat_id, message_id };
      console.log(this._get_page_width());
      if (this._get_page_width() < 1000) {
        this._section_content.style.display = 'block';
        document.querySelector('body').dataset.is_chat_users_list_page_showing = 'false';
        this._parentel.classList.add('hidden');
      }

      // scroll-to-cur-chat-message

      if (chat_id === this._section.dataset.chat_id) {
        const message_present_in_messagelist = document
          .querySelector('.message-list')
          .querySelector(`.message-item[data-message-id="${data.message_id}"]`);

        return message_present_in_messagelist
          ? handle('scroll-to-chat-message-position', data)
          : handle(
              'load-message-in-cur-chat-and-scroll-to-chat-mesage-position',
              data
            );
      }

      handle('load-other-chat-and-scroll-to-chat-message-position', data);
    });
  }

  add_handler_message_search(handle) {
    this._active_search_message_item_which_chat_is_being_viewed();
    this._search_message(handle);
    this._handle_searchlist(handle);
  }
}
