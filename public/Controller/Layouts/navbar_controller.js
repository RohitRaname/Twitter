import navbar_view from '../../View/Layouts/navbar_view.js';
import { create_tweet_item_in_multiple_tweets } from '../Components/Tweet/createMutltipleTweetsController.js';

const navbar = document.querySelector('.nav');

const control_nav = (action) => {
  if (action === 'show-multiple-create-tweet-form')
    create_tweet_item_in_multiple_tweets({
      text: '',
      tweet_type: 'text',
      target_audience: 'everyone',
      audience_can_reply: 'everyone',
      upload_imgs: [],
    });
};




if (navbar) {
  const view = new navbar_view();
  view.add_handler_nav(control_nav);
  view.set_cur_section_nav_item_active(document.querySelector('.section').dataset.section)
}
