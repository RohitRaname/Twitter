import UnsentTweetModalView from '../../../View/Components/Modal/UnsentTweetModalView.js';
import { del, get } from '../../api/api.js';
import { show_delete_draft_tweet_popup_and_set_delete_tweetId_arr } from '../Popup/draftTweetPopupController.js';
import {
  controlSetUnsentTweetInMultiplTweetForm,
  getCreateMultipleTweetsView,
} from '../Tweet/createMutltipleTweetsController.js';

const UnsentDraftTweetModalEl = document.querySelector(
  ".modal[data-modal='unsent-tweets']"
);

let View;

// CSS --------------------------------------------------
// draft or schedule section along with docs
const update_unsent_tweetslist = (section, docs) => View.render(section, docs);

export const display_unsent_tweet_modal = () => {
  update_unsent_tweets('draft-tweets');
  update_unsent_tweets('schedule-tweets');
  View.show();
};

// render section only when draft are saved
export const update_unsent_tweets = async (section) => {
  if (section === 'draft-tweets') {
    const res = await get(`users/draft-tweets`);
    update_unsent_tweetslist('draft-tweets', res.data.docs || []);
  }

  if (section === 'schedule-tweets') {
    const res = await get(`users/schedule-tweets`);
    update_unsent_tweetslist('schedule-tweets', res.data.docs);
  }
};

const remove_tweet_item_from_section_DOM = (section, tweet_id) =>
  View.remove_section_item_el(section, tweet_id);

export const getDraftTweetModalView = () => View;

const display_delete_draft_tweet_popup_and_set_tweet_id_arr_in_popup = (
  tweet_arr
) => {
  show_delete_draft_tweet_popup_and_set_delete_tweetId_arr(tweet_arr);
};

/////////////////////////////////////////////////////
// controller function --------------------------------------

// insert draft tweet into multiple tweet form
export const controlInsertTweetIntoCreateTweetsModal = (tweetObj) => {
  controlSetUnsentTweetInMultiplTweetForm(tweetObj);
  View.hide();
};

export const delete_unsent_tweets = async (tweet_arr) => {
  const delete_tweet_promise_arr = [];

  for (const tweet of tweet_arr) {
    const { tweet_id, tweet_type } = tweet;
    delete_tweet_promise_arr.push(del(`tweets/${tweet_id}/type/${tweet_type}`));

    const section = tweet_type.includes('draft')
      ? 'draft-tweets'
      : 'schedule-tweets';
    remove_tweet_item_from_section_DOM(section, tweet_id);
  }

  await Promise.all(delete_tweet_promise_arr);
};

export const controlDraftTweetModal = (action, data) => {
  if (action === 'insert-tweet-in-multiple-tweets-form')
    controlInsertTweetIntoCreateTweetsModal(data);

  // to delete unsent tweet we first show  a popup and if user yes then we delete the tweets
  if (action === 'delete-tweets')
    display_delete_draft_tweet_popup_and_set_tweet_id_arr_in_popup(data);

  // if (action === 'save-tweet') controlSaveTweetAsDraft(data);

  // if (action === 'redirect-to-home') go_to_home();

  // render docs of sections(draft or schedule tweets)
  // if (action === 'redirect-to-section') update_unsent_tweets(data.section);
};

if (UnsentDraftTweetModalEl) {
  View = new UnsentTweetModalView();
  View.addHandlerModal(controlDraftTweetModal);
}
