import { get } from '../../api/api.js';

import user_logout_dropdown_view from '../../../View/Components/Dropdown/user_logout_dropdown_view.js';
import { show_add_existing_account_modal } from '../Modal/add_existing_account_modal_controller.js';
import { show_manage_existing_account_modals } from '../Modal/manage_existing_accounts_modal_controller.js';

let View;
const user_logout_dropdown = document.querySelector(
  '.dropdown[data-type="user-logout"]'
);

export const insert_account_in_logout_dropdownlist = (accounts_arr) =>
  View.insert_item_to_dropdownlist(accounts_arr);

const control_dropdown = async (action, data) => {
  if (action === 'logout-user') {
    await get('auth/logout');
    location.assign('/');
  }
  if (action === 'show-add-existing-account-modal')
    show_add_existing_account_modal();

  if (action === 'switch-account') {
    await get(`auth/me/switch-account/${data.data.avatar}`);
    location.assign('/');
  }

  if (action === 'show-manage-existing-accounts')
    show_manage_existing_account_modals();
};

if (user_logout_dropdown) {
  View = new user_logout_dropdown_view();
  View.addHandlerDropdown(control_dropdown);
}
