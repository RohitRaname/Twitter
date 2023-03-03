export default class section_bookmark_view {
  _section_bookmark = document.querySelector('.section-bookmark');
  _clear_bookmark_btn_box = this._section_bookmark.querySelector(
    '.clear-bookmarks-btn'
  );
  _tweetlist = this._section_bookmark.querySelector('.postedTweet-list');

  add_handler_click_on_clear_bookmark_btns_box(handle) {
    this._clear_bookmark_btn_box.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;

      const { active} = this._clear_bookmark_btn_box.dataset;
      this._clear_bookmark_btn_box.dataset.active =
        active === 'true' ? false : true;

      if (btn.dataset.action === 'clear-all-bookmarks') {
        this._tweetlist.innerHTML = '';
        handle('clear-all-bookmarks');
      }
    });
  }
}
