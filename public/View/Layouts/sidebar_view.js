class sidebar_view {
  _parentel = document.querySelector('.sidebar');
  _login_user = document.querySelector('body[data-login-user="true"]')

  // NEWS -----------------------------------
  _click_on_news_item(target, handle) {
    const itemel = target.closest('.preview-item');
    if (!itemel) return;

    const { category, word } = itemel.dataset;
    handle('news', 'show-news-in-detail', { category, word });
  }

  _click_on_more_news_btn(target, handle) {
    const button = target.closest('.more-news');
    if (!button) return;

    handle('news', 'show-more-news-in-new-page');
  }

  _handle_news_container(target, handle) {
    this._click_on_more_news_btn(target, handle);
    this._click_on_news_item(target, handle);
  }

  // FOLLOW --------------------------------
  _click_on_follow_following_btn(target, handle) {
    // change btn follow to following btn
    const button = target.closest('button[data-follow]');
    if (!button) return;
    let { user } = button.closest('.modal-item').dataset;
    user = JSON.parse(user);
    if(!this._login_user) return handle('user','show-signup-login-modal',user)

    const { follow } = button.dataset;

    const follow_following_box = target.closest('.follow_following_box');

    
      follow_following_box.dataset.active = follow === 'true' ? true : false;




    if (follow === 'true') return handle('user', 'follow-user', user);
    handle('user', 'unfollow-user', user);
  }

  _click_on_user_item(target, handle) {
    if (!target.closest('.preview-item') || target.closest('button')) return;

    const user = JSON.parse(target.closest('.preview-item').dataset.user);

    handle('user', 'show-user-profile', { avatar: user.avatar });
  }

  _click_on_more_user_btn(target, handle) {
    if (!target.closest('.show-more-people')) return;

    handle('show-more-users');
  }

  _handle_follow_container(target, handle) {
    this._click_on_follow_following_btn(target, handle);
    this._click_on_user_item(target, handle);
  }

  handle_sidebar(handle) {
    this._parentel.addEventListener('click', (e) => {
      const sidebar_box = e.target.closest('.sidebar-box');
      if (!sidebar_box) return;

      const { type } = sidebar_box.dataset;
      type === 'news'
        ? this._handle_news_container(e.target, handle)
        : this._handle_follow_container(e.target, handle);
    });
  }
}

export default sidebar_view;
