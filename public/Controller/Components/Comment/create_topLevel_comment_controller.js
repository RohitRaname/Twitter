import create_comment_form_view from '../../../View/Components/Comment/create_top_level_comment_form.js';
import { insert_comment_in_comment_list } from './posted_comment_controller.js';
import { update_posted_tweet_btn_count_and_active_state } from '../Tweet/postedTweetController.js';

import { post } from '../../api/api.js';

let View;

const comment_section = document.querySelector('.comment-form-container');

const reset_comment_form = () => View.reset();

const control_create_top_level_comment = async (
  action,
  tweet_or_comment_id,
  comment_data
) => {
  let res;

  if (action === 'save-comment') {
    res = await post(`comments/tweet/${tweet_or_comment_id}`, comment_data);
  }

  if (action === 'save-comment-reply')
    res = await post(`comments/${tweet_or_comment_id}`, comment_data);

  if (!res) return;
  reset_comment_form();

  insert_comment_in_comment_list(res.data.docs);
};

if (comment_section) {
  View = new create_comment_form_view();
  View.add_handler_comment(control_create_top_level_comment);
}
