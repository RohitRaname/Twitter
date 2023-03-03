export default class Mobile_nav_view {
  _parentel = document.querySelector('.mobile-nav');
  _cur_user = JSON.parse(
    document.querySelector('.section').dataset.cur_user ||
      document.querySelector('.section').dataset.curUser
  );

  _mobile_nav_btn = document.querySelector('.mobile-nav-btn');

  _click_on_overlay(target) {
    if (target.closest('.overlay')) this._parentel.dataset.active = false;
  }

  _click_on_hide_btn(target) {
    if (target.closest('button[data-action="hide"]'))
      this._parentel.dataset.active = false;
  }

  _click_on_show_manage_accounts_modal_btn(target, handle) {
    const btn = target.closest('[data-action="show-manage-accounts-modal"]');

    if (!btn) return;

    handle(btn.dataset.action);
  }
  _click_on_show_follow_following_modal_btn(target, handle) {
    const btn = target.closest('.mobile-nav-follow-modal-btn');
    if (!btn) return;

    handle(btn.dataset.action, {
      user_type: btn.dataset.type,
      user: this._cur_user,
    });
  }
  _click_on_show_customize_twitter_modal_btn(target, handle) {
    const btn = target.closest('[data-action="show-customize-twitter-modal"]');
    if (!btn) return;
    handle(btn.dataset.action);
  }

  _click_on_nested_settings(target) {
    const nested_item = target.closest('.dropdown-item[data-child-els="true"]');

    if (!nested_item) return;

    const { active } = nested_item.dataset;
    nested_item.dataset.active = active === 'true' ? false : true;
  }

  _click_on_logout_setting(target, handle) {
    if (target.closest('.dropdown-item[data-action="logout"]'))
      return handle('logout');
  }

  add_handler_mobile_nav(handle) {
    this._parentel.addEventListener('click', (e) => {
      const target = e.target;

      this._click_on_overlay(target);
      this._click_on_hide_btn(target);
      this._click_on_show_manage_accounts_modal_btn(target, handle);
      this._click_on_show_follow_following_modal_btn(target, handle);

      this._click_on_show_customize_twitter_modal_btn(target, handle);

      this._click_on_nested_settings(target);
      this._click_on_logout_setting(target, handle);
    });
  }
}
