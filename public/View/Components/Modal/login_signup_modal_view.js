import ModalView from '../../Common/ModalView.js';

export default class Login_signup_modal_view extends ModalView {
  _parentEl = document.querySelector('.modal[data-modal="login-signup-modal"]');

  _modal_content_el = this._parentEl.querySelector(
    '.modal-signup-login-content'
  );

  _generate_content_markup(
    i_class,
    action_type,
    profile_username,
    main_description,
    side_description
  ) {
    return `<i
                    class="${i_class} mg-bg blue modal-add-user-icon"
                    aria-hidden="true"
                ></i>
                <h4 class="h-5 mg-lw">
                    <span>${action_type}</span>
                    <span>${profile_username}</span>
                    <span>${main_description}</span>
                </h4>
                <p class="t--md mg-sm">${side_description}</p>`;
  }

  update_modal_text_content_and_show(type, user_name) {
    user_name = user_name + ' ';

    let html;
    if (type === 'follow')
      html = this._generate_content_markup(
        'fa fa-user-plus',
        'Follow',
        user_name,
        'to see what they share on Twitter.',
        'Sign up so you never miss their Tweets.'
      );
    if (type === 'retweet')
      html = this._generate_content_markup(
        'fa fa-retweet',
        'Retweet',
        user_name,
        'to spread the word.',
        `When you join Twitter, you can share ${user_name}’s Tweet with your followers.`
      );
    if (type === 'comment')
      html = this._generate_content_markup(
        'fa fa-commenting',
        'Reply',
        user_name,
        'to join the conversation.',
        `Once you’ve joined Twitter, you’ll be able to respond to ${user_name}’s Tweet.`
      );
    if (type === 'like')
      html = this._generate_content_markup(
        'fa fa-heart',
        '',
        '',
        'Like a Tweet to share the love.',
        `Join Twitter now to let ${user_name} know you like their Tweet.`
      );
    if (type === 'bookmark')
      html = this._generate_content_markup(
        'fa fa-bookmark',
        'Bookmark',
        user_name,
        'Tweet now.',
        `Join Twitter now to let ${user_name} know you bookmark their Tweet.`
      );

    this._modal_content_el.innerHTML = '';
    this._modal_content_el.innerHTML = html;

    this.show();
  }

  handleAdditionalFuncs(target, handle) {
    const btn = target.closest('button');
    if (!btn) return;

    const { action } = btn.dataset;
    if (
      action === 'show-add-account-modal' ||
      action === 'redirect-to-signup-page'
    ) {
      this.hide();
      handle(action);
    }
  }
}
