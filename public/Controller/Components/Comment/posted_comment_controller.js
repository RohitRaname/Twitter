import posted_comment_list_view from '../../../View/Components/Comment/posted_commentlist_view.js';
import { display_create_comment_form } from './create_child_comment_controller.js';
import { post, del, get } from '../../api/api.js';
import { update_login_signup_modal_content_and_show } from '../Modal/login_signup_modal_controller.js';
const comment_list = document.querySelector('.comment-list');
const login_user = document.querySelector('body[data-login-user="true"]');
let View;

export const insert_comment_in_comment_list = (comment) =>
  View.insert_comment_in_comment_list(comment);
export const remove_comment_from_comment_list = (comment) =>
  View.remove_comment_from_comment_list(comment);

export const render_comments = (comment_arr, return_html) =>
  View.render_comments(comment_arr, return_html);


  export const update_posted_comment_btn_count_and_active_state = (
    btn_type,
    count,
    active_state
  ) =>
    View.update_posted_tweet_btn_count_and_active_state(
      btn_type,
      count,
      active_state
    );

// tweet present in comment page at top (header)
export const update_top_main_comment_or_tweet_stat_count = (type, value) =>
  View.update_top_main_comment_or_tweet_stat_count(type, value);

export const update_posted_comment_stats_count = (comment_id, type, value) =>
  View.update_posted_comment_stats_count(comment_id, type, value);

// load like 5 comment replies below parent Comment and insert them in same group as parent comment
export const load_comment_few_replies = async (comment_id, page) => {
  const res = await get(`comments/${comment_id}/replies/page/0/limit/6`);

  View.insert_multiple_comment_in_comment_group(comment_id, res.data.docs);
};
export const redirect_to_comment_page = async (
  comment_id,
  show_comment_with_gallery
) => {
  location.assign(
    `/comments/${comment_id}/replies/${show_comment_with_gallery}`
  );
};

const control_posted_comment = (action, data) => {
  if (
    !login_user &&
    ['like', 'retweet', 'comment', 'bookmark'].some((el) => el === data.action)
  )
    return update_login_signup_modal_content_and_show(
      data.action,
      data.post_user_name
    );

  // pass comment to create comment form
  if (action === 'add-reply-to-comment') {

    display_create_comment_form(data);
  }

  if (action === 'like-post') {
    post(`comments/${data.post_id}/like`);

    update_top_main_comment_or_tweet_stat_count('like', 1);
  }
  if (action === 'unlike-post') {
    del(`comments/${data.post_id}/unlike`);

    update_top_main_comment_or_tweet_stat_count('like', -1);
  }
  if (action === 'bookmark-post') {
    post(`comments/${data.post_id}/bookmark`);
  }
  if (action === 'unbookmark-post') {
    del(`comments/${data.post_id}/unbookmark`);
  }

  // display some replies of parent comment
  if (action === 'load-comment-replies')
    load_comment_few_replies(data.comment_id, data.page);

  // render new page with comment all replies
  if (action === 'redirect-to-post')
    redirect_to_comment_page(data.post_id, data.show_comment_with_gallery);
};

if (comment_list) {
  View = new posted_comment_list_view();
  View.add_handler_comments(control_posted_comment);
}
