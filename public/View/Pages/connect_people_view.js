import { load_docs_on_scroll_view } from '../Common/load_docs_on_scroll_view.js';

export class connect_people_view extends load_docs_on_scroll_view {
  _parentel = document.querySelector('.section-connect-people');

  scroll_el = window;
  docs_insert_list = this._parentel.querySelector('.connect-people-list');

  _click_on_follow_following_btn(target, handle) {
    // change btn follow to following btn
    const button = target.closest('button[data-follow]');
    if (!button) return;

    const { follow } = button.dataset;

    const follow_following_box = target.closest('div');
    follow_following_box.dataset.active = follow === 'true' ? true : false;

    let { user } = button.closest('.preview-item').dataset;

    user = JSON.parse(user);

    if (follow === 'true') return handle('follow-user', user);
    handle('unfollow-user', user);
  }

  _click_on_user_item(target, handle) {
    if (!target.closest('.preview-item') || target.closest('button')) return;

    const user = JSON.parse(target.closest('.preview-item').dataset.user);

    handle('show-user-profile', { avatar: user.avatar });
  }
  add_handler_page(handle) {
    this._parentel.addEventListener('click', (e) => {
      const target = e.target;

      this._click_on_follow_following_btn(target, handle);
      this._click_on_user_item(target, handle);
    });
  }
}
