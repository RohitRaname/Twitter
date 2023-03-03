import sidebar_view from '../../View/Layouts/sidebar_view.js';
import { post, del, get_view_req } from '../api/api.js';
const sidebar = document.querySelector('.sidebar');
import { update_login_signup_modal_content_and_show } from '../Components/Modal/login_signup_modal_controller.js';

export const control_sidebar_follow_container = (action, user) => {

  if (action === 'show-signup-login-modal')
    update_login_signup_modal_content_and_show('follow', user.name);

  if (action === 'follow-user')
    post(`users/following/follow/${user._id}`, { add_user: user });

  if (action === 'unfollow-user') del(`users/following/unfollow/${user._id}`);

  if (action === 'show-user-profile')
    location.assign(`/users/${user.avatar.slice(1)}`);

  if (action === 'show-more-users');
};

const control_sidebar_news_container = (action, news) => {
  if (action === 'show-news-in-detail')
    location.assign(`/news/explore/${news.category}/${news.word}`);
  if (action === 'show-more-news-in-new-page')
    location.assign('/news/explore/business');
};

const control_sidebar = (section, action, data) => {
  // const user_id = user._id;

  if (section === 'user') control_sidebar_follow_container(action, data);
  if (section === 'news') control_sidebar_news_container(action, data);
};

if (sidebar) {
  const view = new sidebar_view();
  view.handle_sidebar(control_sidebar);
}
