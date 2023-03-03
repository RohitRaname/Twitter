import ModalView from '../../Common/ModalView.js';
import { replaceClass } from '../../utils/domHelper.js';

export default class customize_twitter_modal_view extends ModalView {
  _parentEl = document.querySelector(
    '.modal[data-modal="customise-twitter-view"]'
  );

  _submitbtn = this._parentEl.querySelector('.submit_btn');

  _font_size_track_line = this._parentEl.querySelector(
    '.customize-fontsize-select-track-line'
  );

  _state = JSON.parse(
    document.querySelector('body').dataset.user_customization
  ) || {
    color: 'primary',
    font_size: '62.25%',
    theme: 'dark',
  };

  // setting font_size,color,theme extract from user
  update_modal(data) {
    const { font_size, color, theme } = data;

    let font_size_track_line_width_percent;
    if (font_size === '56.25%') font_size_track_line_width_percent = '0%';
    if (font_size === '50%') font_size_track_line_width_percent = '25%';
    if (font_size === '62.25%') font_size_track_line_width_percent = '50%';
    if (font_size === '64%') font_size_track_line_width_percent = '75%';
    if (font_size === '66%') font_size_track_line_width_percent = '100%';
    this._font_size_track_line.style.width = font_size_track_line_width_percent;

    const all_font_selectors = [
      ...this._parentEl.querySelectorAll('.customize-size-pointer'),
    ];

    all_font_selectors.forEach((el) => {
      if (
        Number(
          el.dataset.fontSize.slice(0, -1) <= Number(font_size.slice(0, -1))
        )
      )
        el.dataset.active = true;
      else el.dataset.active = false;
    });

    // set font size
    this._parentEl.querySelector(
      `div[data-font-size="${font_size}"]`
    ).dataset.active = true;
    // set font color
    this._parentEl.querySelector(
      `div[data-color="${color}"]`
    ).dataset.active = true;
    // set font size
    this._parentEl.querySelector(
      `div[data-theme="${theme}"]`
    ).dataset.active = true;
  }

  change_font_size(target, handle) {
    const font_size_selector = target.closest('.customize-size-pointer');
    if (!font_size_selector) return;

    // find the selector position and increasing with of font-size track line
    let index;
    const all_font_selectors = [
      ...this._parentEl.querySelectorAll('.customize-size-pointer'),
    ];

    // find index
    all_font_selectors.forEach((el, i) => {
      if (el === font_size_selector) {
        index = i;
      }
    });

    all_font_selectors.forEach((el, i) => {
      el.dataset.active = i < index;
    });

    this._font_size_track_line.style.width = index * 25 + '%';

    // now increase the font size

    const new_font_size = font_size_selector.dataset.fontSize;
    document.documentElement.style.fontSize = new_font_size;
    font_size_selector.dataset.active = true;

    // handle('save-font-size', { font_size: new_font_size });
    this._state.font_size = new_font_size;
  }
  change_color(target, handle) {
    const color_selector = target.closest('.customize-color-pointer');
    if (!color_selector) return;

    const { color } = color_selector.dataset;
    color_selector.dataset.active = true;

    // unselect all other color_selector els

    const color_els = [
      ...this._parentEl.querySelectorAll('.customize-color-pointer'),
    ];

    color_els.forEach((el) => (el.dataset.active = el === color_selector));

    document.documentElement.dataset.color = color;

    // sort colors to make they look as they not change position
    // let color_selected_index;
    // color_els.forEach((el, i) => {
    //   if (el === color_selector) color_selected_index = i;
    // });

    // const first_color = color_els[0];
    // const color_els_list_html = [
    //   color_selector,
    //   ...color_els.slice(1, color_selected_index),
    //   first_color,
    //   ...color_els.slice(color_selected_index, -1),
    // ].join('');
    // this._parentEl.querySelector('.customize-box-content').innerHTML =
    //   color_els_list_html;
    // // handle('save-color', { color: color });

    this._state.color = color;
  }

  // theme
  change_background_color(target, handle) {
    const background_color_selector = target.closest(
      '.customize-background-box'
    );
    if (!background_color_selector) return;

    const { theme } = background_color_selector.dataset;
    background_color_selector.dataset.active = true;

    // unselect all other color_selector els
    [...this._parentEl.querySelectorAll('.customize-background-box')].forEach(
      (el) => (el.dataset.active = el === background_color_selector)
    );

    document.documentElement.dataset.theme = theme;
    // handle('save-theme', { theme: theme });

    this._state.theme = theme;
  }

  _submit_form(target, handle) {
    if (!target.closest('.submit_btn')) return;

    handle('save-changes', this._state);
    this.hide(false);
  }

  hide(save_changes = false, handle) {
    replaceClass(this._parentEl, 'view', 'hidden');

    this.reset();
    document.documentElement.style.overflowY = 'unset';
    if (save_changes) handle('save-changes', this._state);
  }

  hideModalWhenOverlayIsClicked(target, handle) {
    if (!target.closest('.overlay')) return;

    // this.hide();
    this.hide(true, handle);
  }

  add_handler_modal(handle) {
    this._parentEl.addEventListener('click', (e) => {
      const target = e.target;
      this.hideModalWhenOverlayIsClicked(target);
      this._handleBackBtn(target);

      this.change_font_size(target);

      this.change_color(target);

      this.change_background_color(target);

      this.hideModalWhenOverlayIsClicked(target, handle);

      this._submit_form(target, handle);
    });
  }
}
