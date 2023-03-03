import AbsDropdownView from '../../Common/AbsDropdownView.js';

class RetweetQuoteTweetDropdown extends AbsDropdownView {
  _parentEl = document.querySelector(
    '.dropdown[data-type="retweet_quote_post"]'
  );
  _dropdownListEl = this._parentEl.querySelector('.dropdown-list');
  _dropdown_content = this._parentEl.querySelector('.dropdown-content');

  _posted_tweet_el;
  _posted_tweet_retweet_btn;

  set_retweet_id_in_retweet_btn_for_future_remove(retweet_id) {
    this._posted_tweet_retweet_btn.dataset.retweet_id = retweet_id;
  }

  handle_dropdown_options(handle) {
    // handle dropdown option
    this._parentEl.addEventListener('click', (e) => {
      const list_item = e.target.closest('.dropdown-item');
      if (!list_item) return;

      const { action, value } = list_item.dataset;

      // 0.if dropdown item clicked,pass the value and hide dropdown

      const post_data = JSON.parse(this._parentEl.dataset.post);

      // setting dom_els
      this._posted_tweet_el = document
        .querySelector('.postedTweet-list')
        .querySelector(`.postedTweet[data-post-id="${post_data._id}"]`);
      this._posted_tweet_retweet_btn = this._posted_tweet_el.querySelector(
        'button[data-action="retweet"]'
      );

      let data = {};

      // set the tweet_type (quote or retweet)
      data.tweet_type = action;

      // post data
      if (action === 'quote') {
        data.posted_tweet = post_data;
      }

      if (action === 'retweet') {
        data.tweet_id = post_data._id;
        data.value = value;
        data.insert_retweet = value === 'true' ? true : false;

    

      }

      // tweet or comment
      const type = post_data.format;

      handle(type, action, data);

      return this.hide();
    });
  }
}

export default RetweetQuoteTweetDropdown;
