import CreateTweetView from '../../../View/Components/Tweet/1.CreateTweetView.js';
import { post, get } from '../../api/api.js';
import { try_catch } from '../../../View/utils/helper.js';
import { controlRenderPostedTweet } from './postedTweetController.js';

import {
  controlSetUploadImgInMultipleTweetImgEls,
  display_create_multiple_tweets,
  create_tweet_item_in_multiple_tweets,
} from './createMutltipleTweetsController.js';
import { set_tweet_choose_audience_btn_text_and_its_input_value } from '../Preview/0.chooseAudiencePreviewController.js';
import { set_reply_btn_text_And_value_in_tweet } from '../Preview/1.chooseWhoCanReplyPreviewController.js';

let View;

const createTweetForm = document.querySelector('.createTweet-main');

const resetCreateTweetForm = () => View.emptyAllInputsValue();

export const control_save_text_tweet = async (data) => {
  const { formdata, tweet_type } = data;

  const res = await post(`tweets/text`, formdata);
  if (!res) return;
  const { docs } = res.data;

  resetCreateTweetForm();

  if (tweet_type === 'schedule-text') return;
  controlRenderPostedTweet(docs);
};

const getRecentTweets = try_catch(async () => {
  const recent_tweets = await get('tweets');
});

const controlCreateTweetForm = (action, data) => {

  if (action === 'save-tweet' || action === 'save-schedule-tweet')
    control_save_text_tweet(data);

  // set choose btn and reply btn text and input value in multiple tweets when we are going for multiple tweets
  if (action === 'set-choose-audience-btn-text-and-value-in-multiple-tweets') {
    const { tweets, value } = data;
    tweets.forEach((tweet) =>
      set_tweet_choose_audience_btn_text_and_its_input_value(value, tweet)
    );
  }
  if (action === 'set_who_can_reply_btn_text_And_value_in_multiple-tweet') {
    const { tweets, value } = data;
    tweets.forEach((tweet) =>
      set_reply_btn_text_And_value_in_tweet(value, tweet)
    );
  }

  if (action === 'show-create-multiple-tweet-form')
    display_create_multiple_tweets();

  if (action === 'show-upload-img-in-multiple-tweet-form') {
    controlSetUploadImgInMultipleTweetImgEls(true);
  }


  // modified
  if (action === 'set-tweet-data-in-multiple-tweets')
    create_tweet_item_in_multiple_tweets(data);
};

if (createTweetForm) {
  View = new CreateTweetView();
  View.addHandlerTweet(controlCreateTweetForm);
}
