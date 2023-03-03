import create_child_comment_view from '../../../View/Components/Comment/create_child_comment_form.js';

import { post } from '../../api/api.js';
import {
  insert_comment_in_comment_list,
  update_top_main_comment_or_tweet_stat_count,
  update_posted_comment_btn_count_and_active_state,
} from './posted_comment_controller.js';

let View;

const comment_section = document.querySelector('.createComments');

export const display_create_comment_form = (comment, comment_type) =>
  View.display_create_comment_form(comment, comment_type);

const control_create_child_comment = async (
  action,
  page,
  comment_id,
  comment_data

) => {

  // create comment' comment (parent comment-> child comment create)
  if (action === 'save-comment-reply') {
    const res = await post(`comments/${comment_id}`, comment_data);
    update_posted_comment_btn_count_and_active_state('write-comment',1,true)
  update_top_main_comment_or_tweet_stat_count('write-comment',1)
    if (res) {
      // we dont total tweet comment count when we comment on a comment
      View.set_progress_line_percent(100);
      setTimeout(() => {
        View._hide();

        if (page === 'comment_and_replies') {
          insert_comment_in_comment_list(res.data.docs);
        }
      }, 300);
    } else {
      View.set_progress_line_percent(0);
    }
  }
};

if (comment_section) {
  View = new create_child_comment_view();
  View.add_handler_comment(control_create_child_comment);
}
