import RetweetQuoteTweetDropdown from '../../../View/Components/Dropdown/RetweetQuotePostDropdown.js';
import { post, del } from '../../api/api.js';
import {
  update_posted_tweet_btn_count_and_active_state,
  controlRenderPostedTweet,
  remove_retweet_item_el_from_postedtweetlist
} from '../Tweet/postedTweetController.js';
import { create_tweet_item_in_multiple_tweets } from '../Tweet/createMutltipleTweetsController.js';

const retweeetQuoteTweetDropdown = document.querySelector(
  '.dropdown[data-type="retweet_quote_post"]'
);

let View;
const control_tweet_options = async (action, data) => {
  if (action === 'retweet') {
    let res;
    if (data.insert_retweet) {
      res = await post(`tweets/retweet/${data.tweet_id}`, data.post);
      update_posted_tweet_btn_count_and_active_state('retweet', 1, true);
      View.set_retweet_id_in_retweet_btn_for_future_remove(res.data.docs._id);

      controlRenderPostedTweet(res.data.docs);
    }

    // delete retweet
    else {
      del(`users/tweets/remove/${data.tweet_id}/undo-retweet`);
      remove_retweet_item_el_from_postedtweetlist(data.tweet_id)
      update_posted_tweet_btn_count_and_active_state('retweet', -1, false);
    }

    if (!res) return;
  }

  if (action === 'quote') {
    create_tweet_item_in_multiple_tweets(data);

    // display quote multiple tweet form
  }
};
const control_comment_options = (action, data) => {};

const controlRetweetQuotePostOptions = (post_type, action, post_data) => {
  post_type === 'tweet'
    ? control_tweet_options(action, post_data)
    : control_comment_options(action, post_data);
};

if (retweeetQuoteTweetDropdown) {
  View = new RetweetQuoteTweetDropdown();
  View.addHandlerDropdown(controlRetweetQuotePostOptions);
}
