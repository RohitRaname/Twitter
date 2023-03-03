import { get } from '../../api/api.js';

import explore_view from '../../../View/Components/explore/explore_news_view.js';

const explore_news_section = document.querySelector('.section-explore-news');

const handle_news_section = async (action, data) => {
  const is_non_login_user = document.querySelector(
    'body[data-non-login-user="true"]'
  );
  const route = is_non_login_user ? 'n' : 'news';

  if (action === 'change-news-category')
    location.assign(`/${route}/explore/${data.category}`);
  if (action === 'show-click-news')
    location.assign(`/${route}/explore/${data.category}/${data.word}`);
  if (action === 'load-more-news') {
    const res = await get(`news/${data.category}/${data.page}/10`);
    return res.data.docs;
  }
};

if (explore_news_section) {
  const view = new explore_view();
  view.handle_news_section(handle_news_section);
  view.load_more_news(handle_news_section);
}
