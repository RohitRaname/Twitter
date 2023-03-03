class abs_component_view {
  parent_el;

  btn_el_class;
  btn_text_el;
  btn_input_el;

  show() {
    this.parent_el.classList.replace('hidden', 'display');
  }
  hide() {
    this.parent_el.classList.replace('display', 'hidden');
  }

  setDOMEls(target) {}

  handle_click_on_display_btn(btn) {
    // const { top, left, width, height } = btn.getBoundingClientRect();
    // const parent_el_container   =
    // this.parent_el.style.left = left + 'px';
    // this.parent_el.style.top = btn.offsetTop + height + 'px';
    // this.show();
  }
  handle_click_on_item(target, handle) {}
  handle_click_on_overlay(target) {
    if (target.closest('.overlay')?.closest(this.parent_el_class)) this.hide();
  }

  handle_abs_el(handle) {
    // add event listener for different component

    document.documentElement.addEventListener('click', (e) => {
      const target = e.target;

   
      if (
        target.closest(this.btn_el_class) ||
        target.closest(this.parent_el_class)
      ) {

        this.handle_click_on_display_btn(target);

        this.handle_click_on_item(target, handle);

        this.handle_click_on_overlay(target);
      }
    });
  }
}

export default abs_component_view;
