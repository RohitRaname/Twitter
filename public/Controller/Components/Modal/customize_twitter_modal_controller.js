import { patch } from '../../api/api.js';

import customize_twitter_modal_view from '../../../View/Components/Modal/customize_twitter_modal_view.js';

let view;

const customize_twitter_modal = document.querySelector(
  '.modal[data-modal="customise-twitter-view"]'
);

export const show_customize_twitter_modal = () => view.show();
export const update_modal = (user_customize_data) =>
  view.update_modal(user_customize_data);

const control_customize_twitter_modal = (action, data) => {

  if (action === 'save-changes') patch('users/me', { customization: data });
};

if (customize_twitter_modal) {
  view = new customize_twitter_modal_view();
  view.add_handler_modal(control_customize_twitter_modal);
}
