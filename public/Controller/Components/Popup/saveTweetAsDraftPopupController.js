import SaveMultiTweetPopupView from '../../../View/Components/Popup/MultipleTweet/SaveMultiTweetPopupView.js';
import {
  controlSaveTweetAsDraft,
  clear_all_tweet_items_html,
} from '../Tweet/createMutltipleTweetsController.js';
import {
  getDraftTweetModalView,
  display_unsent_tweet_modal,
} from '../Modal/unsendTweetsController.js';

const saveMultiTweetAsDraftPopupEl = document.querySelector(
  '.popup[data-tweet-type="multiple-tweets"][data-action="save-tweet"]'
);

const controlPopup = async (action) => {
  // save draft tweet
  if (action === 'save-tweet-as-draft') {
    const res = await controlSaveTweetAsDraft();
    if (!res) return;

    
  }

  // remove all tweet items from multiple tweets form
  if (action === 'discard-tweet-and-show-unsent-tweet-modal') {
    clear_all_tweet_items_html();

    display_unsent_tweet_modal();
  }
};

if (saveMultiTweetAsDraftPopupEl) {
  const View = new SaveMultiTweetPopupView();

  View.addHandlerPopup(controlPopup);
}
