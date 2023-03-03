export default class search_menu {
  _login_user = document.querySelector('body').dataset.loginUser === 'true';

  // together
  _parentel = document.querySelector('.search');
  _search_input = this._parentel.querySelector('input');

  // together
  _search_dropdown = this._parentel.querySelector('.search-dropdown');
  _searchlist = this._parentel.querySelector('.dropdown-list');

  // render
  _generate_markup(doc) {
    const { type, user, text, _id } = doc;

    return `<div
    class="dropdown-item modal-item preview-item-container preview-item"
    data-state=""
    data-id=${_id}
    data-type=${type}
    data-text=${text}

    data-user='${type === 'user' ? JSON.stringify(user) : ''}'
  >

  ${
    type === 'user'
      ? `
    <div class="preview-item-content">
          <img
            class="preview-img"
            src="/img/users/${user.profilePic}"
            onerror="this.src='/img/users/default.png'"
            alt=""
          />
          <div class="preview-details">
            <div class="preview-title">${user.name}</div>
                    <div class="preview-extra">${user.avatar}</div>
                    </div>
              </div>
          <p class="preview-state">
          
          </p>
    `
      : `
      <i class="search-icon fa fa-search"></i>
      <p>${text}</p>
      <p></p>
      
    `
  }
  </div>
  `;
  }

  render(docs, clear_html) {
    const html = docs.map((doc) => this._generate_markup(doc)).join('');

    if (clear_html) this._searchlist.innerHTML = '';

    clear_html
      ? this._searchlist.insertAdjacentHTML('afterbegin', html)
      : this._searchlist.insertAdjacentHTML('beforeend', html);
  }

  add_handler_search_content(handle) {
    this._search_input.addEventListener('input', (e) => {
      const word = this._search_input.value;
      if (word === '') return;
      handle('search-users', { word });
    });
  }

  // add_handler_searchlist() --------------------------------------
  _click_on_search_input(target) {
    if (target.closest('.search-form')) {
      this._search_dropdown.classList.remove('hidden');
      this._search_dropdown.dataset.active = true;
      document.querySelector('body').dataset.show_search_dropdown = true;
    } else {
      document.querySelector('body').dataset.show_search_dropdown = false;
    }
  }

  _click_on_overlay(target) {
    if (target.closest('.overlay')) {
      this._search_dropdown.classList.add('hidden');
      this._search_dropdown.dataset.active = false;
    }
  }

  _click_on_item(target, handle) {
    const itemel = target.closest('.dropdown-item');
    if (!itemel) return;

    const { type, id, text } = itemel.dataset;

    // click on item remove btn
    if (target.closest('button[data-action="remove"]')) {
      itemel.remove();
      return handle('remove-search-tag', { _id: id });
    }

    // click on dropdown item(not remove btn)

    type === 'user'
      ? handle('open-user-profile', {
          type: 'user',
          user: JSON.parse(itemel.dataset.user),
        })
      : handle('search-related-tweets', { type: 'text', text: text });

    this._search_input.value = '';
  }

  _click_on_clear_all_tags_btn(target, handle) {
    if (!target.closest('button[data-action="clear-all-tags"]')) return;
    this._searchlist.innerHTML = '';
    handle('remove-search-all-tag');
  }



  add_handler_searchlist(handle) {
    this._parentel.addEventListener('click', (e) => {
      const target = e.target;

   

      // pc
      this._click_on_search_input(target);
      this._click_on_overlay(target);
      this._click_on_item(target, handle);
      this._click_on_clear_all_tags_btn(target, handle);
    });
  }
}
