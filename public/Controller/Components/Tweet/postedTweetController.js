import PostedTweetView from '../../../View/Components/Tweet/posted_tweetlist_view.js';
import { display_post_options_dropdown } from '../Dropdown/other_user_post_options_controller.js';
import { display_cur_user_post_options_dropdown } from '../Dropdown/cur_user_post_options_dropdown_controller.js';
import { post, del } from '../../api/api.js';
import { create_tweet_item_in_multiple_tweets } from '../Tweet/createMutltipleTweetsController.js';

// FOR +>>>>> non-login-user
import { update_login_signup_modal_content_and_show } from '../Modal/login_signup_modal_controller.js';

let View;
const postedTweetListEl = document.querySelector('.postedTweet-list');

const login_user = document.querySelector('body[data-login-user="true"]');

export const remove_tweet_itemel_from_postedtweetlist = (
  tweetel,
  optional_tweetid
) => View.remove_tweet_item_from_postedtweetlist(tweetel, optional_tweetid);

export const remove_retweet_item_el_from_postedtweetlist = (retweet_id) =>
  View.remove_retweet_item_from_list(retweet_id);

export const controlRenderPostedTweet = (
  tweet,
  scroll_load_tweets = false,
  return_html = false
) => View.render(tweet, scroll_load_tweets, return_html);

export const return_single_tweet_markup = (tweet_arr) =>
  View.return_single_tweet_markup(tweet_arr);

export const update_single_tweet_itemel_post_attr = (tweet_id, field, value) =>
  View.update_single_tweet_item_data_attr(tweet_id, field, value);

// multiple tweet
export const update_dom_posted_tweet_el_dataset_post_attr = (
  user_id,
  field,
  value,
  tweet_id
) =>
  View.update_dom_posted_tweet_el_dataset_post_attr(
    user_id,
    field,
    value,
    tweet_id
  );

export const update_posted_tweet_btn_count_and_active_state = (
  btn_type,
  count,
  active_state
) =>
  View.update_posted_tweet_btn_count_and_active_state(
    btn_type,
    count,
    active_state
  );

const like_unlike_tweet = (action, data) => {
  if (action === 'like-post')
    post(`users/like-tweets/add/tweet/${data.post_id}`);
  if (action === 'unlike-post')
    del(`users/like-tweets/remove/tweet/${data.post_id}`);
};
const bookmark_unbookmark_tweet = (action, data) => {
  if (action === 'bookmark-post')
    post(`users/bookmark-tweets/add/tweet/${data.post_id}`);
  if (action === 'unbookmark-post')
    del(`users/bookmark-tweets/remove/tweet/${data.post_id}`);
};

const redirect_to_user = (user_avatar) =>
  location.assign(`/users/${user_avatar.slice(1)}`);

const redirect_to_tweet_comments = (tweet_id, show_comment_with_gallery) =>
  location.assign(`/tweets/${tweet_id}/comments/${show_comment_with_gallery}`);

const controlPostedTweets = (action, data) => {
  if (
    !login_user &&
    ['like', 'retweet', 'comment', 'bookmark'].some((el) => el === data.action)
  )
    return update_login_signup_modal_content_and_show(
      data.action,
      data.post_user_name
    );

  like_unlike_tweet(action, data);

  bookmark_unbookmark_tweet(action, data);

  if (action === 'redirect-to-user') redirect_to_user(data.avatar);

  if (action === 'redirect-to-post')
    redirect_to_tweet_comments(data.post_id, data.show_comment_with_gallery);

  // tweet-id
  if (action === 'add-comment-on-tweet')
    create_tweet_item_in_multiple_tweets(data);

  if (!login_user) return;

  if (action === 'display-post-options-dropdown')
    display_post_options_dropdown('tweet', data);

  if (action === 'display-cur-user-post-options-dropdown')
    display_cur_user_post_options_dropdown('tweet', data);
};

if (postedTweetListEl) {
  View = new PostedTweetView();
  View.addHandlerPostedTweet(controlPostedTweets);
}
