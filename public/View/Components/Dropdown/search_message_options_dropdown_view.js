import AbsDropdownView from '../../Common/AbsDropdownView.js';

class search_message_dropdown_view extends AbsDropdownView {
  _topParentEl = document.querySelector('.message-search-list');
  _parentEl = document.querySelector(
    '.dropdown[data-type="search-message-dropdown"]'
  );
  _dropdownListEl = this._parentEl.querySelector('.dropdown-list');
  _dropdown_content = this._parentEl.querySelector('.dropdown-content');

  _section = document.querySelector('.section');

  // permanent cur_user_data
  _cur_user_data = JSON.parse(this._section.dataset.cur_user);

  // temporary search message data store
  _chat_id;

  _boolean_converter(value) {
    return value === 'true' || value === true ? true : false;
  }


  render(message) {
    let { pinned, mute } = message;
    pinned=this.boolean_converter(pinned)
    mute=this.boolean_converter(mute)
    const html = this._generate_markup(pinned, mute);
    this._dropdown_content.innerHTML = '';
    this._dropdown_content.insertAdjacentHTML('afterbegin', html);
  }

  // CSS change and tweet dom el attr field change

  _generate_markup(pinned, mute) {
    return `
    <div class="dropdown-item" data-action="pin-chat" data-field="pinned" data-value="${
      pinned ? true : false
    }"><i class="fas fa-${  pinned ? 'chain-broken':'thumb-tack' }"></i><span>${
      pinned ? 'Unpin' : 'Pin'
    } conversation</span></div>
    <div class="dropdown-item" data-action="mute-chat" data-field="mute" data-value="${mute}"><i class="fa fa-volume-${mute ? 'up' : 'off'}" ></i><span>${
      mute ? 'Unmute' : 'Mute'
    } conversation</span></div>
    <div class="dropdown-item red" data-action="delete-chat" data-field="delete-chat" data-value="false"><i class="fas fa-trash-alt"></i><span>Delete conversation</span></div>
  
    `;
  }

  get_data_from_targetbtn_parent_el_and_update_dropdown(click_dropdown_btn) {
    const message_item = click_dropdown_btn.closest('.message-search-item');

    const { chat_id } = message_item.dataset;
    this._chat_id = chat_id;

    // check chat_id include in pinned_chat_id_arr or mute_chat_id_arr
    const { pinned_chat_id_arr, mute_chat_id_arr } = this._cur_user_data;

    const chat_is_pinned = pinned_chat_id_arr.some((id) => id === chat_id);
    const chat_is_muted = mute_chat_id_arr.some((id) => id === chat_id);

    const message = {
      pinned: chat_is_pinned,
      mute: chat_is_muted,
    };

    this.render(message);
  }

  _update_list_item_and_section_user_attr(field, value) {
    if (value) this._cur_user_data[field].push(this._chat_id);
    else
      this._cur_user_data[field] = this._cur_user_data[field].filter(
        (id) => id !== this._chat_id
      );
    this._section.dataset.cur_user = JSON.stringify(this._cur_user_data);
  }

  handle_dropdown_options(handle) {
    // handle dropdown option
    this._parentEl.addEventListener('click', (e) => {
      const list_item = e.target.closest('.dropdown-item');
      if (!list_item) return;

      // 0.if dropdown item clicked,pass the value and hide dropdown

      let { field, value, action } = list_item.dataset;

      value = value === 'true' ? false : true;
      list_item.dataset.value = value;

      // update cur_user data attr of section
      if (action === 'pin-chat')
        this._update_list_item_and_section_user_attr(
          'pinned_chat_id_arr',
          value
        );
      if (action === 'mute-chat')
        this._update_list_item_and_section_user_attr('mute_chat_id_arr', value);

      if (action === 'delete-chat') {
        this._update_list_item_and_section_user_attr('chat_id_arr', value);
        this._update_list_item_and_section_user_attr(
          'pinned_chat_id_arr',
          value
        );
        this._update_list_item_and_section_user_attr('mute_chat_id_arr', value);
      }

      this.hide();

      return handle(action, { chat_id: this._chat_id, field, value });
    });
  }
}

export default search_message_dropdown_view;
