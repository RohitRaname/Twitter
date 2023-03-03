/* eslint-disable camelcase */
const express = require('express');
const settings_view_controller = require('../../Controller/view/settings_view_controller');

const settings_view_router = express.Router();

settings_view_router.get(
  '/',
  settings_view_controller.render_overview_settings_page
);

settings_view_router.get(
  '/account/protect',
  settings_view_controller.render_settings_account_protect_page
);
settings_view_router.get(
  '/account',
  settings_view_controller.check_if_user_has_given_permit_to_access_info,
  settings_view_controller.render_settings_account_page
);

settings_view_router.get(
  '/account/change-username',
  settings_view_controller.check_if_user_has_given_permit_to_access_info,
  settings_view_controller.render_settings_change_avatar
);

settings_view_router.get(
  '/account/change-email',
  settings_view_controller.check_if_user_has_given_permit_to_access_info,
  settings_view_controller.render_settings_change_email
);
settings_view_router.get(
  '/account/change-password',
  settings_view_controller.render_settings_change_password
);
settings_view_router.get(
  '/account/deactivate-account/0',
  settings_view_controller.render_settings_deactivate_account_0
);
settings_view_router.get(
  '/account/deactivate-account/1',
  settings_view_controller.render_settings_deactivate_account_1
);

module.exports = settings_view_router;
