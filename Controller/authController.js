/* eslint-disable camelcase */
const User = require('../Model/user/userModel');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const sendReq = require('../utils/sendJSON');
const sendEmail = require('../utils/email');
const { generateHash } = require('../utils/cryptoHelper');

const passImfToNext = (req, user, statusCode, message) => {
  req.pass = true;
  req.user = user;
  req.statusCode = statusCode;
  req.message = message;
};

exports.isLoggedin = (req, res, next) => {
  // we first check for cookies
  const { jwt, refreshJwt } = req.cookies;

  if (!jwt || !refreshJwt) return next();
  if (req.user) return next();

  req.returnTo = req.originalUrl;
  return res.redirect('/api/v1/refreshToken');
};

exports.sendEmailFunc =
  (email_type, email_route, send_token) => async (req, res) => {
    const { user } = req;

    try {
      let verificationToken = '';

      if (send_token) {
        verificationToken = user.setTokenPropertiesAndgetTokenCode();
        await user.save();
      }

      await sendEmail(
        req,
        user,
        email_type,
        `${email_route}/${verificationToken}`,
        verificationToken
      );
    } catch (err) {
      console.log(err);
      // if error comes during sending of email
      // remove user token set propeties as there are no longer userful

      if (!send_token)
        return sendReq(res, err.statusCode, err.status, err.message);

      user.removeTokenProperties();

      // then save the user
      await user.save();
      return sendReq(res, err.statusCode, err.status, err.message);
    }

    return sendReq(res, 200, 'Check verification code at mailtrap');
  };

exports.removeVerificationTokenProperties = catchAsync(
  async (req, res, next) => {
    const { user } = req;
    user.removeTokenProperties();
    await user.save();
    return sendReq(res, 200);
  }
);

exports.verifyToken = (type, successMsg = null, errorMsg = 'try') =>
  catchAsync(async (req, res, next) => {
    const { token } = req.body;
    const tokenHash = generateHash(token);

    const user = await User.findOne({
      tokenHash,
      tokenExpiresIn: { $gte: new Date() },
    });

    if (!user)
      return next(
        new AppError(
          `Verification time is over!. Please ${errorMsg} again`,
          400
        )
      );

    if (type === 'signUp') user.verify = true;
    user.removeTokenProperties();
    await user.save();

    return sendReq(res, 200, successMsg);
  });

// initially call then roles wil be defined in parent function as varible inside it and due to closure(access to outer scope even  if function is removed from stack)
exports.restricTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(new AppError('Permission denied'));

    next();
  };

exports.logout = (req, res, next) => {
  res.clearCookie('refreshJwt', { httpOnly: true });
  res.clearCookie('jwt', { httpOnly: true });

  req.user = undefined;
  return sendReq(res, 200);
};

/////////////////////////////////////////////////////
// SIGNUP ****************************************************
exports.signUpCreateAccount = catchAsync(async (req, res, next) => {
  const { name, email, birthDate } = req.body;

  const avatar = email.split('@')[0].trim().slice(0, 5);

  await User.create({ name, email, birthDate, verify: false, avatar });
  return sendReq(res, 200);
});

exports.signUpCustomiseUserExperience = catchAsync(async (req, res, next) => {
  const { trackUserActivity } = req.body;
  const { email } = req.query;
  const user = await User.findOne({ email }).exec();

  user.trackUserActivity = trackUserActivity;
  await user.save();

  if (!user) return next(new AppError('User does not exist!', 400));
  const { name, birthDate } = user;

  return sendReq(res, 200, null, { name, birthDate });
});

exports.signUpSendVerificationCode = catchAsync(async (req, res, next) => {
  const { email } = req.query;

  const user = await User.findOne({ email }).exec();

  req.user = user;
  next();

  // 'signUp', `api/v1/auth/confirmSignUp/${token}`;
});

// deleting user
exports.signUpResetUserCredentials = catchAsync(async (req, res, next) => {
  const { email } = req.query;
  await User.findOneAndDelete({ email });
  return sendReq(res, 200);
});

// email verified
exports.signUpVerifyUser = catchAsync(async (req, res, next) => {
  const { token } = req.body;
  const tokenHash = generateHash(token);

  const user = await User.findOne({
    tokenHash,
    tokenExpiresIn: { $gte: new Date() },
  });

  if (!user)
    return next(
      new AppError(
        'Verification time is over!. Please apply for new verify code ',
        400
      )
    );

  user.verify = true;
  user.removeTokenProperties();
  await user.save();

  return sendReq(res, 200, 'signUp successful');
});

exports.signUpSetPassword = catchAsync(async (req, res, next) => {
  const { password } = req.body;
  const { email } = req.query;
  const user = await User.findOne({ email }).exec();

  user.password = password;
  user.hash_password = true;
  user.active = true;

  await user.save();

  user.removeUserCredentialfromReq();

  passImfToNext(req, user, 200, 'Sign Up Successfully');
  next();
});

///////////////////////////////////////////////////////
// LOGIN **********************************************************
exports.loginIdentifyUser = catchAsync(async (req, res, next) => {
  const { nameOrEmail } = req.body;
  // const user = await User.findOne({
  //   $or: [{ name: nameOrEmail }, { email: nameOrEmail }],
  // });
  // if (!user) return next(new AppError('User does not exist', 404));
  return sendReq(res, 200, null, { nameOrEmail });
});

exports.confirmLogin = catchAsync(async (req, res, next) => {
  const { nameOrEmail, password } = req.body;


  const user = await User.findOne(
    { $or: [{ name: nameOrEmail }, { email: nameOrEmail }] },
    { password: 1 }
  );


  if (!user) return next(new AppError('User does not exist', 400));

  if (!(await user.isValidPassword(password, user.password)))
    return next(new AppError('Password is invalid', 400));

  req.user = user;
  next();
});

///////////////////////////////////////////////////////
// FORGOT PASSWORD
exports.forgotPasswordFindAccount = catchAsync(async (req, res, next) => {
  const { nameOrEmail } = req.body;

  // eslint-disable-next-line no-unneeded-ternary
  const userSubmittedEmail = req.user.email === nameOrEmail ? true : false;

  return sendReq(res, 200, null, { q: nameOrEmail, userSubmittedEmail });
});

exports.forgotPasswortCheckEmailExist = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const { name } = req.query;

  const user = await User.findOne({
    email,
    name,
  });

  if (!user) return next(new AppError('User with Email does not exist', 404));

  return sendReq(res, 200, null, { email });
});

exports.forgotResetPassword = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).exec();

  user.password = password;

  await user.save();

  user.removeUserCredentialfromReq();

  req.user = user;
  next();
});

// /
// /
// /
// ******************************
////////////////////////////////////////////////////////
// used by admin directly

exports.login = catchAsync(async (req, res, next) => {
  // find user in db

  const { email, password } = req.body;

  const user = await User.findOne(
    { email },
    {
      password: 1,
    }
  );

  if (!user) return next(new AppError('User does not exist', 400));

  if (!(await user.isValidPassword(password, user.password)))
    return next(new AppError('Invalid Password'), 400);

  req.password = undefined;

  passImfToNext(req, user, 200, 'Login Successfull');

  next();
});
exports.signUp = catchAsync(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword)
    return next(new AppError('password and confirmPassword do not match', 400));

  const user = new User({
    name,
    email,
    password,
    role: 'user',
    active: true,
    register: false,
  });

  const verificationToken = user.setTokenPropertiesAndgetToken();

  await user.save(); // Email send
  // if the erro arrises

  try {
    await sendEmail(
      req,
      user,
      'signUp',
      `api/v1/auth/confirmSignUp/${verificationToken}`
    );
  } catch (err) {
    console.log(err);
    // if error comes during sending of email

    // remove user token set propeties as there are no longer userful
    user.removeTokenProperties();

    // then save the user
    // await user.save({ validateBeforeSave: false });
    return sendReq(res, err.statusCode, err.status, err.message);
  }

  req.user = undefined;

  return sendReq(res, 200, 'Go to mailTrap for futher verification');
});

exports.confirmSignUp = catchAsync(async (req, res, next) => {
  // token hash

  // find user token match and token expire time greater or equal to now

  const { token } = req.params;
  const tokenHash = generateHash(token);

  // find user and check if current time is smaller than hash expires in
  const user = await User.findOne(
    {
      tokenHash,
      tokenExpiresIn: { $gte: new Date() },
    },
    {
      name: 1,
      email: 1,
      role: 1,
      invalidRefreshTokenTries: 1,
    }
  ).exec();

  if (!user)
    return next(
      new AppError(
        'Verification time limit expired! Please try to signUp again',
        400
      )
    );

  user.register = true;

  // remove token properties
  user.removeTokenProperties();
  await user.save({ validateBeforeSave: true });

  // Setting some credentials
  passImfToNext(req, user, 200, 'SignUp Verification Successfull');

  // Sending refresh JWTS
  return next();
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  // check if email exists
  const user = await User.findOne({ email }).exec();
  if (!user) return next(new AppError('User does not exist!', 404));

  // set tokhenHash and tokenExpiresIn
  const resetToken = user.setTokenPropertiesAndgetToken();


  // save
  await user.save({ validateBeforeSave: false });

  // send email
  try {
    await sendEmail(req, user, 'reset', `resetPassword/${resetToken}`);
  } catch (err) {
    // if error occurs retry if more than 3 retry clear the user token properties
    user.removeTokenProperties();
    await user.save({ validateBeforeSave: false });

    // send Error Req
    return sendReq(res, err.statusCode, err.message);
  }

  // if success show user mesage on screen
  return sendReq(res, 200, 'Go to Your Mailtrap for further process..');

  // if exist so we will send a reset password email
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // if find update password
  const { password, confirmPassword } = req.body;

  if (!password || !confirmPassword)
    return next(
      new AppError(' password and confirmPassword are required', 400)
    );

  if (password !== confirmPassword)
    return next(
      new AppError('Password And Confirm Password do not match', 400)
    );

  // hash token and find it in database
  const { token } = req.params;
  const tokenHash = generateHash(token);

  // find User
  const user = await User.findOne({
    tokenHash,
    tokenExpiresIn: { $gt: Date.now() },
  }).exec();

  // if not find return err
  if (!user) {
    return next(
      new AppError(
        'reset Password verification time  expires! Please try again to forgot password ',
        400
      )
    );
  }

  user.password = password;
  user.removeTokenProperties();
  await user.save();

  passImfToNext(req, user, 200, 'Password Updated Successfully');
  next();
});

exports.updateMyPassword = catchAsync(async (req, res, next) => {

  const { password, newPassword, confirmNewPassword } = req.body;

  if (newPassword !== confirmNewPassword)
    return next(new AppError('Passwords do no match'));

  // is already loginned mean we know who he is through our jwt tokens
  const user = await User.findById(req.user._id).select('password').exec();



  if (!(await user.isValidPassword(password, user.password)))
    return next(new AppError('Password is incorrect', 400));

  // user valid
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  passImfToNext(req, user, 200, 'Password Updated Successfully');
  next();
});

////////////////////////////////////////////////////////////////////////////////
// SETTINGS
///////////////////////////////////////////////////////////////////////////////

exports.confirm_user_password = catchAsync(async (req, res, next) => {
  const { password, user_id } = req.params;
  const { page } = req.body;

  const user = await User.findOne({ _id: user_id }, { password: 1 });


  if (!user) return next(new AppError('User does not exist', 400));

  if (!(await user.isValidPassword(password, user.password)))
    return next(new AppError('Password is invalid', 400));

  if (page === 'settings')
    await User.findOneAndUpdate(
      { _id: user_id },
      { $set: { settings_page_permit: true } }
    );

  return sendReq(res, 200, 'password confirmed');
});

exports.deactivate_account = catchAsync(async (req, res, next) => {
  const { password } = req.params;

  const user = await User.findOne(
    { _id: req.user._id },
    { password: 1 }
  ).exec();


  if (!user) return next(new AppError('User does not exist', 400));

  if (!(await user.isValidPassword(password, user.password)))
    return next(new AppError('Password is invalid', 400));

  await User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: { active: false } }
  ).exec();

  res.clearCookie('refreshJwt', { httpOnly: true });
  res.clearCookie('jwt', { httpOnly: true });

  req.user = undefined;

  return sendReq(res, 200, 'account deactivated');
});

// user can multiple gmail connected to one account and they can switch bw the accounts without sign in if they are loggined to multiple accounts
exports.add_another_account_to_user = catchAsync(async (req, res, next) => {
  const { password, name_or_email } = req.body;



  const user = await User.findOne(
    { $or: [{ avatar: `@${name_or_email}` }, { email: name_or_email }] },
    { password: 1, avatar: 1, profilePic: 1, name: 1, _id: 1 }
  ).exec();


  if (!user) return next(new AppError('User does not exist', 400));

  if (user.avatar === req.user.avatar)
    return next(new AppError('Account already added!', 400));

  if (!(await user.isValidPassword(password, user.password)))
    return next(new AppError('Password is invalid', 400));

  const adding_account_to_cur_user = User.findOneAndUpdate(
    { _id: req.user._id, 'other_accounts.avatar': { $ne: user.avatar } },
    {
      $addToSet: {
        other_accounts: {
          name: user.name,
          avatar: user.avatar,
          profilePic: user.profilePic,
          _id: user._id,
        },
      },
    }
  ).exec();

  const adding_account_to_other_user = User.findOneAndUpdate(
    { _id: user._id, 'other_accounts.avatar': { $ne: req.user.avatar } },
    {
      $addToSet: {
        other_accounts: {
          name: req.user.name,
          avatar: req.user.avatar,
          profilePic: req.user.profilePic,
          _id: req.user._id,
        },
      },
    }
  ).exec();

  const adding_accounts = await Promise.all([
    adding_account_to_cur_user,
    adding_account_to_other_user,
  ]);


  if (!adding_accounts[0])
    return next(new AppError('Account already added!', 400));

  return sendReq(res, 200, 'account added to user', {
    _id: user._id,
    name: user.name,
    avatar: user.avatar,
    profilePic: user.profilePic,
  });
});

// switch to user other-accounts that is in user
exports.switch_account = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ avatar: req.params.user_avatar }).exec();
  req.user = user;
  next();
});

// remove user all other accounts
exports.logout_all_accounts = catchAsync(async (req, res, next) => {
  await User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: { other_accounts: [] } }
  ).exec();

  res.clearCookie('refreshJwt', { httpOnly: true });
  res.clearCookie('jwt', { httpOnly: true });

  return sendReq(res, 200, 'logout');
});
