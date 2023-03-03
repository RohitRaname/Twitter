export default class navbar_view {
  _parentel = document.querySelector('.nav');
  _mobile_nav_btn = document.querySelector('.mobile-nav-btn');

  set_cur_section_nav_item_active(section) {
    const all_nav_items = [...this._parentel.querySelectorAll('.nav__item')];

    all_nav_items.forEach(
      (nav_item) =>
        (nav_item.dataset.active = nav_item.dataset.section === section)
    );
  }

  add_handler_nav(handle) {
    this._parentel.addEventListener('click', (e) => {
      const target = e.target;

      if (target.closest('.nav__tweet-btn'))
        handle('show-multiple-create-tweet-form');

      if (target.closest('.mobile-nav-btn')) {
        // document.documentElement.style.overflowY="hidden"
        this._mobile_nav_btn.dataset.active =
          this._mobile_nav_btn.dataset.active === 'true' ? false : true;
      }
    });
  }
}
