import { delete_unsent_tweets } from '../Modal/unsendTweetsController.js';
import DiscardDraftTweetPopupView from '../../../View/Components/Popup/DraftUnsentTweet/DraftTweetPopup.js';

let View;

const discart_draft_tweet_popup_el = document.querySelector(
  '.popup[data-tweet-type="draft-tweets"][data-action="delete-unsent-tweets"]'
);

export const controlDraftTweetPopup = (action, tweet_arr) => {
  if (action === 'delete-unsent-tweets') delete_unsent_tweets(tweet_arr);
};

export const show_delete_draft_tweet_popup_and_set_delete_tweetId_arr = (
  tweet_arr
) => View.show(tweet_arr);

// Working
// -- show a popup
// -- have two option => 1) delete selected draft tweet
// --                 => 2) cancel

if (discart_draft_tweet_popup_el) {
  View = new DiscardDraftTweetPopupView();
  View.handlePopup(controlDraftTweetPopup);
}
