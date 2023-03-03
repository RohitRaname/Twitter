import user_profile_view from '../../../View/Components/user_profile/user_profile_view.js';
import { post, del, get } from '../../api/api.js';
import { display_follow_following_modal } from '../Modal/followOrfollowingModalController.js';
import { display_user_profile_options_dropdown } from '../Dropdown/user_profile_dropdown_controller.js';
import {
  controlRenderPostedTweet,
  return_single_tweet_markup,
  update_dom_posted_tweet_el_dataset_post_attr,
} from '../Tweet/postedTweetController.js';

import { show_user_profile_modal } from './edit_user_profile_controller.js';
import { update_login_signup_modal_content_and_show } from '../Modal/login_signup_modal_controller.js';
import { render_comments } from '../Comment/posted_comment_controller.js';

const user_profile_section = document.querySelector('.section-user-profile');
let view;

const login_user = document.querySelector('body[data-login-user="true"]');

// update-profile-user-data
//  && depend all tweet {mute,follow,block option}
export const update_cur_user_data_in_section_dataset = (data) => {
  view.update_user_data_in_section_dataset_attr(data);
};

// update-profile-user-data
export const update_cur_user_data_field_in_section_dataset = (field, value) => {
  view.update_user_data_field_in_section_dataset_attr(field, value);
};

export const set_follow_or_following_button_active_state = (
  cur_user_follow_view_user
) =>
  view.set_follow_or_following_button_active_state(cur_user_follow_view_user);

export const render_section_docs = async (data) => {
  const { section, profile_user, section_page } = data;

  const { _id: user_id } = profile_user;

  let result_docs;

  let res;
  if (section === 'my-tweets') {
    res = await get(`users/tweets/${user_id}/${section_page}`);
    if (res.data.docs) return [];
    const { tweets, page } = res.data.docs;
    if (tweets.length === 0) return;

    const html = controlRenderPostedTweet(tweets, true, true);
    view.render_section(section, html, true, page);
    result_docs = tweets;
  }
  if (section === 'my-liked-tweets') {
    res = await get(`users/like-tweets/${user_id}/${section_page}`);


    let docs = res.data.docs;
    if (docs.length === 0) return;

    const { cur_user_mute, cur_user_follow } = profile_user;
    docs = docs.map((doc) => {
      doc.cur_user_mute = cur_user_mute;
      doc.follow_by_cur_user = cur_user_follow;
      return doc;
    });

    const html = return_single_tweet_markup(docs, false);
    view.render_section(section, html);
    result_docs = docs;
  }
  if (section === 'my-comments') {
    res = await get(`users/comments/user/${user_id}/${section_page}/25`);
    result_docs = res.data.docs;
    if (result_docs.length === 0) return;
    const html = render_comments(res.data.docs, true);
    view.render_section(section, html);
  }

  return result_docs;
};

const control_user_profile_section = (action, data) => {

  


  if (!login_user && (action === 'follow-user' || action === 'unfollow-user'))
    return update_login_signup_modal_content_and_show('follow', data.name);

  if (action === 'display-user-profile-dropdown')
    display_user_profile_options_dropdown(data);

  if (action === 'follow-user') {
    post(`users/following/follow/${data._id}`, { add_user: data });
    update_dom_posted_tweet_el_dataset_post_attr(
      data._id,
      'follow_by_cur_user',
      true
    );
  }
  if (action === 'unfollow-user') {
    del(`users/following/unfollow/${data._id}`);
    update_dom_posted_tweet_el_dataset_post_attr(
      data._id,
      'follow_by_cur_user',
      false
    );
  }


  if (action === 'add-user-to-notification-users') {
    update_cur_user_data_in_section_dataset(data.profile_user_data);
    post(
      `users/notifications/me/from/${data.profile_user_id}`,
      data.profile_user_data
    );
  }
  if (action === 'remove-user-from-notification-users') {
    update_cur_user_data_in_section_dataset(data.profile_user_data);

    del(`users/notifications/me/from/${data.profile_user_id}`);
  }

  if (action === 'show-following')
    display_follow_following_modal('following', data, 0);
  if (action === 'show-followers')
    display_follow_following_modal('followers', data, 0);

  if (action === 'render-section') render_section_docs(data);

  if (action === 'show-edit-profile-modal') show_user_profile_modal();
};

if (user_profile_section) {
  view = new user_profile_view();
  view.add_handler_user_profile_view(control_user_profile_section);
}
