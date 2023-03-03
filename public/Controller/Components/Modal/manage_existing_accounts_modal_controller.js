import manage_existing_account_modal_view from '../../../View/Components/Modal/manage_existing_accounts_modal_view.js';

import { get } from '../../api/api.js';

import { show_add_existing_account_modal } from './add_existing_account_modal_controller.js';

let View;
const manage_existing_account_modal = document.querySelector(
  '.modal[data-modal="manage-existing-accounts"]'
);

export const show_manage_existing_account_modals = () => View.show();

const control_modal = async (action, data) => {

  if (action === 'log-all-accounts') {
   await get('auth/me/logout-all-accounts');
    location.assign('/');
  }
  if (action === 'show-add-existing-account-modal')
    show_add_existing_account_modal();

  if (action === 'switch-account') {
    await get(`auth/me/switch-account/${data.avatar}`);
    location.assign('/');
  }
};

if (manage_existing_account_modal) {
  View = new manage_existing_account_modal_view();
  View.add_handler_modal(control_modal);
}
