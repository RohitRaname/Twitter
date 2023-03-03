const express = require('express');
const authRouter = express.Router();
const authController = require('../Controller/authController');
const userController = require('../Controller/user/userController');
const refreshTokenController = require('../Controller/refreshTokenController');

/////////////////////////////////////////////////////
// SIGNUP STAGES *******************************
/////////////////////////////////////////////////////
authRouter.post('/signUpCreateAccount', authController.signUpCreateAccount);
authRouter.post(
  '/signUpCustomiseUserExperience',
  authController.signUpCustomiseUserExperience
);

authRouter.get(
  '/signUpSendVerificationCode',
  authController.signUpSendVerificationCode,
  authController.sendEmailFunc('signUp', 'api/v1/auth/signUpVerifyUser', true)
);
// authRouter.get(
//   '/signUpResetUserCredentials',
//   authController.signUpSendVerificationCode,
//   authController.sendEmailFunc('signUp', 'api/v1/auth/confirmSignUp', true)
// );

// means to delete
authRouter.get(
  '/signUpResetUserCredentials',
  authController.signUpResetUserCredentials
);

authRouter.post('/signUpVerifyUser', authController.signUpVerifyUser);
authRouter.post(
  '/signUpSetPassword',
  authController.signUpSetPassword,
  refreshTokenController.sendToken
);

// LOGIN ***********************************************************
authRouter.post(
  '/loginIdentifyUser',
  userController.findUserbyNameOrEmail,
  authController.loginIdentifyUser
);
authRouter.post(
  '/loginConfirm',
  authController.confirmLogin,
  refreshTokenController.sendToken
);

//////////////////////////////////////////////////////
// FORGOT PASSWORD ****************************************************
authRouter.post(
  '/forgotPasswordCheckUserExist',
  userController.findUserbyNameOrEmail,
  authController.forgotPasswordFindAccount
);

// need to do from here tommorow
authRouter.post(
  '/forgotPasswordUserEmailExist',
  authController.forgotPasswortCheckEmailExist
);

authRouter.post(
  '/forgotPasswordSendVerification',
  userController.findUserbyEmail,
  authController.sendEmailFunc('reset', 'api/v1/auth/forgotPassword', true)
);

authRouter.post(
  '/forgotPasswordVerifyAccount',
  authController.verifyToken('resetPassword')
);

// check verification token  send to verify email

authRouter.post(
  '/forgotPasswordResetPassword',
  userController.findUserbyEmail,
  authController.forgotResetPassword,
  refreshTokenController.sendToken
);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
authRouter.post(
  '/removeVerificationTokenProperties',
  userController.findUserbyEmail,
  authController.removeVerificationTokenProperties
);
// authRouter.post('/signUp', authController.signUp);
authRouter.get('/logout', authController.logout);
authRouter.post('/forgotPassword', authController.forgotPassword);

authRouter.get(
  '/login',
  authController.login,
  refreshTokenController.sendToken
);
// authRouter.get(
//   '/confirmSignUp/:token',
//   authController.confirmSignUp,
//   refreshTokenController.sendToken
// );
authRouter.post(
  '/resetPassword/:token',
  authController.resetPassword,
  refreshTokenController.sendToken
);

authRouter.use(
  refreshTokenController.protect,
  refreshTokenController.addTokenIfNeeded
);

authRouter.post(
  '/confirm-password/:user_id/:password',
  authController.confirm_user_password
);

authRouter.patch(
  '/updateMyPassword',
  authController.updateMyPassword,
  refreshTokenController.sendToken
);
authRouter.delete(
  '/deactivate-account/me/:password',
  authController.deactivate_account
);
authRouter.post(
  '/me/add-another-account',
  authController.add_another_account_to_user
);

authRouter.get(
  '/me/switch-account/:user_avatar',
  authController.switch_account,
  refreshTokenController.sendToken
);
authRouter.get('/me/logout-all-accounts', authController.logout_all_accounts);

module.exports = authRouter;
