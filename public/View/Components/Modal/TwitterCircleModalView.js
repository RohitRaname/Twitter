import ModalView from '../../Common/ModalView.js';

class TwitterCircleModalView extends ModalView {
  _parentEl = document.querySelector(".modal[data-modal='edit-circle']");

  _modal_container = this._parentEl.querySelector('.modal-container');

  _search_form = this._parentEl.querySelector('.search-form');

  _generate_markUp(user, insert_in_first_section = false) {
    return `
    <div class="modal-item preview-item-container preview-item" data-state data-user-id=${
      user._id || user.userId
    } data-name=${user.name} data-avatar=${user.avatar} data-description=${
      user.bio
    } data-following_count=${user.following_count} data-followers_count=${
      user.followers_count
    } >
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
      <p class="preview-state">
        <button class="btn--outline btn--sm" data-action="${
          insert_in_first_section ? 'remove' : 'add'
        }">${insert_in_first_section ? 'Remove' : 'Add'}</button>
      </p>
    </div>`;
  }

  // add or remove member from/to  twitter circle
  handleSelectItems(target, handle) {
    const itemEl = target.closest('.preview-item');
    if (!itemEl) return;

    const { section } = this._currentActiveSectionEl.dataset;

    const { id, avatar, name, profilePic } = itemEl.dataset;
    let btn;

    if (section === 'my-circle') {
      // 1.click remove btn then change it to add btn
      btn = target.closest('button[data-action="remove"]');

      if (btn) {
        itemEl.remove();
        handle('remove-user-from-circle', itemEl.dataset);
        return;
      }
    }

    if (section === 'recommend-circle') {
      // twitter recommend => we can add user to circle
      btn = target.closest('button[data-action="add"]');

      if (btn) {
        btn.dataset.action = 'remove';
        btn.textContent = 'Remove';
        handle('add-user-to-circle', itemEl.dataset);
        this.add_item_to_section_list('my-circle', itemEl, true);
        return;
      }

      // 1.click remove btn then change it to add btn
      btn = target.closest('button[data-action="remove"]');

      if (btn) {
        btn.dataset.action = 'add';
        btn.textContent = 'Add';
        handle('remove-user-from-circle', itemEl.dataset);
        return;
      }
    }
    handle('redirect-to-user', itemEl.dataset);
  }

  handleSearchUser(handle) {
    this._search_form &&
      this._search_form.addEventListener('input', (e) => {
        const value = this._search_form.querySelector('input').value;
        if (value === '') return;

        this._currentActiveSectionEl.dataset.name = value;

        handle('display-recommend-users', {
          section: "recommend-circle",
          name: value,
        });
      });
  }



  addHandlerModal(handle) {
    this.handleModal(handle);

    // saerch user for recommendation
    this.handleSearchUser(handle);

    this.load_more_docs(handle);
  }
}

export default TwitterCircleModalView;
