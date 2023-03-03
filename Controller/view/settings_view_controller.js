/* eslint-disable camelcase */
const mongoose= require('mongoose')
const crypto = require('crypto');
const sendReq = require('../../utils/sendJSON');

const catchAsync = require('../../utils/catchAsync');

exports.render_overview_settings_page = catchAsync(async (req, res) => {
  await mongoose.model('user').findOneAndUpdate(
    { _id: req.user._id },
    { $set: { settings_page_permit: false } }
  );
  res.render('pages/settings/overview_settings_page', {
    ...req.restrict_user,
    page: 'settings-overview',
    login_user: req.login_user,
  });
});

exports.check_if_user_has_given_permit_to_access_info = (req,res,next)=>{
  
  if (!req.user.settings_page_permit)
  return res.redirect('/settings/account/protect');
  return next()
}

exports.render_settings_account_protect_page = catchAsync(async (req, res) => {
  res.render('pages/settings/account_info/protect_page', {
    ...req.restrict_user,
    page: 'settings-protect-account-info',
    login_user: req.login_user,
  });
});

// this route can only be accessed by user if they input the password then redirect to this route
exports.render_settings_account_page = catchAsync(async (req, res) => {
  res.render('pages/settings/account_info/account_info_page', {
    ...req.restrict_user,
    page: 'settings-account-info',
    user: req.user,
    login_user: req.login_user,
  });
});

exports.render_settings_change_avatar = catchAsync(async (req, res) => {
  // avatar suggestions
  const suggestions = [];

  for (let i = 0; i < 5; i++)
    suggestions.push(
      `${req.user.avatar}${crypto.randomBytes(2).toString('hex')}`
    );

  res.render('pages/settings/account_info_sub_pages/change_username', {
    ...req.restrict_user,
    user: req.user,
    suggestions,
    page: 'settings-change-username',
    login_user: req.login_user,
  });
});

exports.render_settings_change_email = catchAsync(async (req, res) => {
  // avatar suggestions
  res.render('pages/settings/account_info_sub_pages/change_email', {
    ...req.restrict_user,
    user: req.user,
    page: 'settings-change-email',
    login_user: req.login_user,
  });
});

exports.render_settings_change_password = catchAsync(async (req, res) => {
  // avatar suggestions
  res.render('pages/settings/account_info_sub_pages/change_password', {
    ...req.restrict_user,
    user: req.user,
    page: 'settings-change-password',
    login_user: req.login_user,
  });
});

exports.render_settings_deactivate_account_initial = catchAsync(
  async (req, res) => {
    // avatar suggestions
    res.render('pages/settings/account_info_sub_pages/deactivate_account', {
      ...req.restrict_user,
      user: req.user,
      page: 'settings-deactivate-account',
      login_user: req.login_user,
    });
  }
);
exports.render_settings_deactivate_account_0 = catchAsync(async (req, res) => {
  // avatar suggestions
  res.render('pages/settings/account_info_sub_pages/deactivate_account/0', {
    ...req.restrict_user,
    user: req.user,
    page: 'settings-deactivate-account-0',
    login_user: req.login_user,
  });
});
exports.render_settings_deactivate_account_1 = catchAsync(async (req, res) => {
  // avatar suggestions
  res.render('pages/settings/account_info_sub_pages/deactivate_account/1', {
    ...req.restrict_user,
    user: req.user,
    page: 'settings-deactivate-account-1',
    login_user: req.login_user,
  });
});
