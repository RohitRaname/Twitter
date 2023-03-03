import AbsDropdownView from '../../Common/AbsDropdownView.js';

class settings_dropdown extends AbsDropdownView {
  _parentEl = document.querySelector('.dropdown[data-type="settings"]');
  _dropdownListEl = this._parentEl.querySelector('.dropdown-list');

  // state

  set_postion_of_dropdown(dropdown_btn, page_scroll_top) {
    const { top, left, width, height } = dropdown_btn.getBoundingClientRect();
    const dropdown_el = this._parentEl.getBoundingClientRect();
    this._dropdownListEl.style.top = top + page_scroll_top - 84 + 'px';
    this._dropdownListEl.style.left = left - 84 + 'px';
  }
}

export default settings_dropdown;
