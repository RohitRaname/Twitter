class AbsDropdownView {
  _topParentEl;
  _parentEl; // dropdown
  _dropdownListEl; // dropdown-list
  _previous_click_dropdown_btn;

  hide() {
    this._parentEl.dataset.active = false;
  }

  show() {
    this._parentEl.dataset.active = true;
  }

  boolean_converter(value) {
    return value === 'true' || value === true ? true : false;
  }

  set_postion_of_dropdown(dropdown_btn, page_scroll_top) {
    const { top, left, width, height } = dropdown_btn.getBoundingClientRect();

    this._dropdownListEl.style.top = top + page_scroll_top + 'px';
    this._dropdownListEl.style.left =
      left - 64 - this._dropdownListEl.getBoundingClientRect().width + 'px';
  }

  get_data_from_targetbtn_parent_el_and_update_dropdown() {}

  // display dropdown at dropdown-btn position when clicked and set details attr from target(dropdown-details)
  _automatically_display_dropdown() {
    document.documentElement.addEventListener('click', (e) => {
      // 1.get dropdown class from dropdown-btn and check if it same as givent _parentEl.class
      // 2.if same then display dropdown where dropdown btn is by position the dropdown
      // 3.set details attr from target(dropdown-details)

      const target = e.target;

      const current_click_dropdown_btn = target.closest('[data-dropdown-btn]');
      if (
        !target.closest('[data-dropdown-btn]') ||
        (this._previous_click_dropdown_btn &&
          current_click_dropdown_btn !== this._previous_click_dropdown_btn)
      ) {
        this._previous_click_dropdown_btn = false;
        return this.hide();
      }

      this._previous_click_dropdown_btn = target.closest('[data-dropdown-btn]');

      // 1
      const dropdown_btn =
        target.closest('button[data-dropdown-btn]') ||
        target.closest('[data-dropdown-btn]');
      const { dropdownClass } = dropdown_btn.dataset;

      this.get_data_from_targetbtn_parent_el_and_update_dropdown(dropdown_btn);

      if (this._parentEl.getAttribute('data-type') !== dropdownClass) return;

      // 2
      const { top, left, width, height } = dropdown_btn.getBoundingClientRect();

      const page_scroll_top = document.documentElement.scrollTop;
      // this._dropdownListEl.style.top =top + page_scroll_top +  height + 'px';
      // this._dropdownListEl.style.left = left -left/3 + 'px';

      this.set_postion_of_dropdown(dropdown_btn, page_scroll_top);
      // 3.set details attr in dropdown component from target(dropdown-details) i
      // const { postType, postId, postUserName, postUserId } =
      //   dropdown_btn.closest('.dropdown-details').dataset;

      // this._parentEl.post_id = postId;
      // this._parentEl.post_user_id = postUserId;
      // this._parentEl.post_type = postType;
      // this._parentEl.post_user_name = postUserName;

      this.show();
    });
  }

  handle_dropdown_options(handle) {
    // handle dropdown option
    this._parentEl.addEventListener('click', (e) => {
      const list_item = e.target.closest('.dropdown-item');
      if (!list_item) return;

      // 0.if dropdown item clicked,pass the value and hide dropdown

      const { postId, postUserId, postType, postUserName } =
        this._parentEl.dataset;
      let { action, active, data } = list_item.dataset;
      data = data && JSON.parse(data);

      // active the listitem
      [...this._parentEl.querySelectorAll('.dropdown-item')].forEach(
        (el) => (el.dataset.active = el === list_item)
      );

      this.hide();
      return handle(action, {
        post_id: postId,
        post_type: action,
        data,
      });
    });
  }

  addHandlerDropdown(handle) {
    this._automatically_display_dropdown();
    this.handle_dropdown_options(handle);
  }
}

export default AbsDropdownView;
