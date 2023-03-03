import { get, del, post } from '../../api/api.js';
import search_menu_view from '../../../View/Components/common_different_components/search_menu_view.js';

let view;
const search_menu = document.querySelector('.search');

const login_user = document.querySelector('body').dataset.loginUser === 'true';


const render_search_users = async (word) => {

  const res = await get(`users/search/${word}/12`);

  let docs = res.data.docs;
  if (!Array.isArray(docs) && Object.keys(res.data.docs).length === 0) return;

  // making user into search_keyword doc
  docs = docs.map((doc) => {
    const new_doc = {
      type: 'user',
      user: doc,
    };

    return new_doc;
  });

  docs.unshift({ type: 'text', text: word });

  view.render(docs, true);
};

const search_content = async (action, data) => {

  if (action === 'search-users') render_search_users(data.word);
};

const control_searchlist = async (action, data) => {
  if (action === 'open-user-profile') {
    if (!login_user) await post(`users/search-keywords/add`, data);
    location.assign(`/users/${data.user.avatar.slice(1)}`);
  }
  if (action === 'search-related-tweets') {
    if (!login_user) await post(`users/search-keywords/add`, data);

    location.assign(`/tweets/search/${data.text}`);
  }
  if (!login_user) return;
  if (action === 'remove-search-tag')
    del(`users/search-keywords/remove/${data._id}`);
  if (action === 'remove-search-all-tag')
    del(`users/search-keywords/remove-all`);
};

if (search_menu) {
  view = new search_menu_view();

  view.add_handler_search_content(search_content);
  view.add_handler_searchlist(control_searchlist);
}
