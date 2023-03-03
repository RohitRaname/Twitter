export default class message_content {
  _section = document.querySelector('.section-message');
  _parentel = this._section.querySelector('.message-content');

  _message_scroll_container = this._section.querySelector(
    '.message-content-container'
  );
  _message_list = this._parentel.querySelector('.message-list');
  _message_search_list = this._section.querySelector('.message-search');

  // input
  _textarea = this._parentel.querySelector('textarea');
  _upload_img_input = this._parentel.querySelector('#upload-image');

  // btn
  _add_imgs_btn = this._parentel.querySelector('button[data-action="add-img"]');
  _send_message_btn = this._parentel.querySelector(
    'button[data-action="send-message"]'
  );

  // el
  _submit_container = this._parentel.querySelector('.message-submit-container');
  _upload_img_box = this._parentel.querySelector('.message-upload-img-box');
  _upload_img = this._parentel.querySelector('.message-upload-img');

  generate_markup(message) {
    const { _id, text, ts, upload_img } = message;

    return `
    <li class="message-item f mg-sm" data-pos="right" data-message-id="${_id}">
          <div class="message-item-box">
              <img class="message-item-img  ${
                upload_img ? '' : 'hidden'
              }" src="${upload_img ? `/img/messages/${upload_img}` : ''}">


              <div></div>
              <div class="message-item-content">
                <button
                  class="btn--icon-dim-tertiary hide"
                 
                  data-action="delete-message"
                >
                  <div class="icon-box">
                    <i class="fas fa-trash-alt"></i>
                  </div>
                </button>


          

                <p class="message-text ${text ? '' : 'hidden'}">
                  ${text}

                  
                </p>
              </div>

              <p class="message-time t--lw">${new Intl.DateTimeFormat('en-US', {
                weekday: 'short',
                hour: 'numeric',
                minute: 'numeric',
                timeZoneName: 'short',
              })
                .format(new Date(ts))
                .split(' ')
                .slice(0, 3)
                .join(' ')}</p>
            </div>
          </div>
    
    

      </li>`;
  }

  render(message_arr, insert_at_the_end = true) {
    const html = message_arr
      .map((message) => this.generate_markup(message))
      .join(' ');

    insert_at_the_end
      ? this._message_list.insertAdjacentHTML('beforeend', html)
      : this._message_list.insertAdjacentHTML('afterbegin', html);
  }

  _setdom_els(target) {
    this._message_list = this._parentel.querySelector('.message-list');
  }

  get_page_width() {
    return document.documentElement.offsetWidth;
  }

  _enable_disable_send_message_btn() {
    if (this._textarea.value !== '' || this._upload_img_input.value !== '')
      this._send_message_btn.classList.remove('disable');
    else this._send_message_btn.classList.add('disable');
  }

  _auto_increase_height_of_texarea_when_writing() {
    // global delegated event listener

    this._textarea.value = '';

    const initial_height = this._textarea.clientHeight;
    let previous_no_of_lines = 0;

    this._textarea.addEventListener('input', () => {
      this._enable_disable_send_message_btn();

      const cur_no_of_lines = Math.floor(
        (this._textarea.scrollHeight - initial_height) / 22
      );

      if (cur_no_of_lines === previous_no_of_lines) return;

      this._textarea.style.height = 'auto';

      this._textarea.style.height = this._textarea.scrollHeight + 'px';

      // const decrease_or_increase_in_height =
      //   cur_no_of_lines > previous_no_of_lines
      //     ? this._textarea.clientHeight / (cur_no_of_lines + 2)
      //     : -this._textarea.clientHeight / (cur_no_of_lines + 2);
      // previous_no_of_lines = cur_no_of_lines;

      // console.log(cur_no_of_lines);
      // this._message_list.style.height =
      //   this._message_list.clientHeight -
      //   decrease_or_increase_in_height +
      //   +'px';
    });
  }

  _preview_upload_img() {
    this._upload_img_input.addEventListener('change', (e) => {
      this._enable_disable_send_message_btn();

      const img_input = e.target.closest('input');

      const file = [...img_input.files][0];
      this._upload_img.src = URL.createObjectURL(file);

      // when img load in upload_img el (src store)
      this._upload_img.addEventListener('load', () =>
        URL.revokeObjectURL(this._upload_img.src)
      );

      this._submit_container.setAttribute('data-upload-img-set', true);
    });
  }

  ////////////////////////////////////////////////////////////////
  // ***  _handle_message_content(handle){}
  ////////////////////////////////////////////////////////////////

  _click_on_remove_img_btn(target) {
    if (!target.closest('button[data-action="remove-img"]')) return;
    this._submit_container.setAttribute('data-upload-img-set', false);
    this._upload_img.src = '';
    this._upload_img_input.value = '';

    this._enable_disable_send_message_btn();
  }

  _click_on_delete_message_btn(target, handle) {
    if (!target.closest('button[data-action="delete-message"]')) return;

    const message_item = target.closest('.message-item');
    const { messageId } = message_item.dataset;

    message_item.remove();

    handle('delete-message', {
      chat_id: this._section.dataset.chat_id,
      message_id: messageId,
    });
  }

  _send_message(target, handle, pass = false) {
    if (!target.closest('button[data-action="send-message"]') && !pass) return;

    if (
      (this._textarea.value.trim() === '' || !this._textarea.value) &&
      this._upload_img_input.value === ''
    )
      return;

    const upload_img = [...this._upload_img_input.files][0];
    const text = this._textarea.value.trim();

    const { chat_id, cur_user_id, to_user, chat_mute_by_other_chat_user } =
      this._section.dataset;

    const to_user_doc = JSON.parse(to_user);

    let message = {
      upload_img,
      text,
      chat_id,
      from_id: cur_user_id,
      ts: new Date(),
      mute: chat_mute_by_other_chat_user,
    };

    const formdata = new FormData();
    Object.keys(message).forEach((key) => {
      if (message[key] === '' || !message[key]) return;
      formdata.append(key, message[key]);
    });
    Object.keys(to_user_doc).forEach((key) =>
      formdata.append(`to_user_doc_${key}`, to_user_doc[key])
    );

    // this.render([message]);

    handle('send-message', { chat_id: chat_id, data: formdata });

    // reset
    this._textarea.value = '';
    this._upload_img_input.value = '';
    this._submit_container.setAttribute('data-upload-img-set', false);
    this._upload_img.src = '';
    this._textarea.style.height = '40px';

    this._send_message_btn.classList.add('disable');

    // scroll the message-list to new message position
    setTimeout(() => {
      this._message_scroll_container.scrollTop =
        this._message_scroll_container.scrollHeight;
    }, 1000);
  }

  _send_message_when_enter_key_is_push(handle) {
    this._textarea.addEventListener('keypress', (e) => {
      const is_enter_key = e.key === 'Enter';
      if (!is_enter_key) return;

      this._send_message(this._textarea, handle, true);

      setTimeout(() => {
        this._textarea.style.height = '40px';
        // clear white space
        this._textarea.value = '';
      }, 200);
    });
  }

  // offset parent return real position where the fuck it is (does not matter if it is scrolled or not)
  _get_message_position(message_item) {
    return (
      message_item.offsetTop +
      (message_item.offsetParent &&
        this._get_message_position(message_item.offsetParent))
    );
  }

  scroll_to_chat_message_position(message_id) {
    const message_item = this._message_list.querySelector(
      `.message-item[data-message-id="${message_id}"]`
    );

    if (message_item) {
      this._message_scroll_container.scrollTop =
        this._get_message_position(message_item);
    }
  }

  _handle_message_content(handle) {
    this._parentel.addEventListener('click', (e) => {
      const target = e.target;

      this._setdom_els(target);

      this._click_on_remove_img_btn(target);
      this._send_message(target, handle);
      this._click_on_delete_message_btn(target, handle);

    // media phone query btn
    this._show_chat_users_list_not_messages_only(target);

    });
  }

  // media phone queries btn
  _show_chat_users_list_not_messages_only(target) {
    if (!target.closest("button[data-action='back-to-users-list']")) return;
    this._parentel.style.display = 'none';
    document.querySelector('body').dataset.is_chat_users_list_page_showing =
      'true';
    this._message_search_list.classList.remove('hidden');
  }

  handle_message(handle) {
    // initially run on its own to position the fixed component submit container
    this._auto_increase_height_of_texarea_when_writing();
    this._preview_upload_img();

    this._send_message_when_enter_key_is_push(handle);

    this._handle_message_content(handle);

  }
}
