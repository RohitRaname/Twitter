import CreateMultipleTweetsView from '../../../View/Components/Tweet/2.CreateMultipleTweetsView.js';
import { display_unsent_tweet_modal } from '../Modal/unsendTweetsController.js';
import { post, patch } from '../../api/api.js';
const createMultipleTweetsEl = document.querySelector('.createTweets');
import { controlRenderPostedTweet,update_posted_tweet_btn_count_and_active_state } from './postedTweetController.js';
import { insert_comment_in_comment_list, } from '../Comment/posted_comment_controller.js';

let View;

// CSS -----------------------------
export const display_create_multiple_tweets = () => View._show();
export const hide_create_multiple_tweets_form = () => View._hide();
const set_progress_line_percent = (percent) =>
  View.set_progress_line_percent(percent);

export const create_tweet_item_in_multiple_tweets = (posted_tweet) => {
  View.insert_tweet_in_multiple_tweets_list(posted_tweet, true);
  View._show();
};

export const clear_all_tweet_items_html = () => View.clear_all_tweet_items();

// set upload imgs in src and input value from single create tweet form
export const controlSetUploadImgInMultipleTweetImgEls = () => {
  View.setUploadImgInMultipleTweetImgEls(true);
};

// set tweet(draft or schedule) from  unsent tweet modal in multiple tweet form
export const controlSetUnsentTweetInMultiplTweetForm = (tweetObj) => {
  View._show();
  View.setUnsentTweetInMultiplTweetForm(tweetObj);
};

export const getCreateMultipleTweetsView = () => View;

// save text tweet,draft-text tweet,schedule-text tweet
export const control_save_text_tweet = async (data) => {
  const { formdata } = data;

  const res = await post(`tweets/text`, formdata);
  if (!res) return;

  return res.data.docs;
};

// save comment tweet,draft-comment tweet,schedule-comment tweet
const control_save_tweet_top_level_comment = async (data) => {
  let res;

  const { formdata, reference_tweet_id, comment_type } = data;

  if (comment_type === 'comment') {
    // res = await post(`tweets/${reference_tweet_id}/comments`, formdata);

    update_posted_tweet_btn_count_and_active_state('write-comment', 1, true);
    res = await post(`comments/tweet/${reference_tweet_id}`, formdata);
  } else if (comment_type === 'draft-comment')
    // res = await post(
    //   `tweets/${reference_tweet_id}/comments/type/draft`,
    //   formdata
    // );
    res = await post(
      `comments/tweet/${reference_tweet_id}/type/draft`,
      formdata
    );
  else if (comment_type === 'schedule-comment')
    res = await post(
      `comments/tweet/${reference_tweet_id}/type/schedule`,
      formdata
    );

  if (!res) return;
  return res.data.docs;
};

// save quote tweet,draft-quote tweet,schedule-comment tweet
const control_save_quote_tweet = async (data) => {
  const { formdata } = data;

  const res = await post(`tweets/quote`, formdata);

  if (!res) return;
  return res.data.docs;
};

const control_save_multiple_tweets = async (data) => {
  let docs;
  try {
    const tweets_save = [];

    for (const key of Object.keys(data)) {
      const tweet = data[key];

      const { tweet_type } = tweet;
      if (tweet_type === 'text')
        tweets_save.push(control_save_text_tweet(tweet));

      if (tweet_type === 'quote')
        tweets_save.push(control_save_quote_tweet(tweet));

      if (tweet_type === 'comment')
        tweets_save.push(control_save_tweet_top_level_comment(tweet));
    }

    docs = await Promise.all(tweets_save);
  } catch (err) {
    console.error('multiple tweets not saved');
    return;
  }


  return docs;
};

// save draft or update the draft tweet
export const controlSaveTweetAsDraft = async () => {
  const tweet = View.get_last_left_tweet_data();
  const { tweet_type, tweet_previous_type, tweet_id } = tweet;

  let response_tweet_doc;

  // tweet_id is present means tweet exist in unsent tweet so we are updating it
  if (tweet_id && tweet_previous_type)
    response_tweet_doc = await patch(
      `tweets/unsent-tweet/${tweet_id}`,
      tweet.formdata
    );
  // if tweet id not present, new draft are created
  else {
    if (tweet_type === 'text')
      response_tweet_doc = await control_save_text_tweet(tweet);
    if (tweet_type === 'comment')
      response_tweet_doc = await control_save_tweet_top_level_comment(tweet);
    if (tweet_type === 'quote')
      response_tweet_doc = await control_save_quote_tweet(tweet);
  }

  if (response_tweet_doc) {
    display_unsent_tweet_modal();
  }
};

// create new tweets or post draft tweet and delete them from draft tweets
const controlMultipleTweets = async (action, data) => {
  let res_docs;
  if (action === 'save-text') res_docs = await control_save_text_tweet(data);
  if (action === 'save-comment') {
    res_docs = await control_save_tweet_top_level_comment(data);

    if (document.querySelector('.section-comment')) {
      insert_comment_in_comment_list(res_docs);
    }
  }
  if (action === 'save-quote') res_docs = await control_save_quote_tweet(data);
  if (action === 'save-all-tweets')
    res_docs = await control_save_multiple_tweets(data);
  if (action === 'show-unsent-tweet-modal') display_unsent_tweet_modal();

  if (
    ['save-text', 'save-comment', 'save-quote', 'save-all-tweets'].some(
      (el) => el === action
    ) &&
    res_docs
  ) {
    // unsent tweet update
    // render_section('schedule-tweets');
    // render_section('draft-tweets');
    set_progress_line_percent(100);
    setTimeout(() => hide_create_multiple_tweets_form(), 300);

    // insert new created tweet in home page tweet list
    if (
      ['save-text', 'save-quote', 'save-all-tweets'].find((el) => el === action)
    ) {
      controlRenderPostedTweet(res_docs);
    }

    // display_unsent_tweet_modal();
  }

  if (!res_docs) {
    set_progress_line_percent(0);
  }
};

if (createMultipleTweetsEl) {
  View = new CreateMultipleTweetsView();
  View.add_handler_tweets(controlMultipleTweets);
}
