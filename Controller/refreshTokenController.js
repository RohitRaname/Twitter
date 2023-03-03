const User = require('../Model/user/userModel');
const sendReq = require('../utils/sendJSON');
const refreshTokenModel = require('../Model/refreshTokenModel');
const catchAsync = require('../utils/catchAsync');
const { generateTokens } = require('../utils/jwtToken');
const { cookiesOptions } = require('../utils/cookie');
const { decodeToken } = require('../utils/jwtToken');

const deleteToken = async (userID) => {
  await refreshTokenModel.findOneAndDelete({ user: userID }).exec();
};

const createToken = async (userID, token) => {
  await refreshTokenModel.create({ user: userID, refreshToken: token }).exec();
};

const updateToken = async (userID, token) => {
  await refreshTokenModel
    .findOneAndUpdate({ user: userID }, { refreshToken: token })
    .exec();
};

const createOrUpdateToken = async (userID, token) => {
  await refreshTokenModel
    .findOneAndUpdate(
      { user: userID },
      { user: userID, refreshToken: token },
      { upsert: true }
    )
    .exec();
};

// /api/v1/token/stolen'
// '/api/v1/token/send'
// '/api/v1/token/check'

const handleStolenToken = async (req, res) => {
  const jwt = decodeToken(req.cookies.jwt, process.env.JWT_SECRET);
  const { id } = jwt;

  const user = await User.findById(id).exec();
  if (user) {
    await refreshTokenModel.findOneAndDelete({ user: user.id }).exec();
    user.invalidRefreshTokenTries = Number(user.invalidRefreshTokenTries) + 1;

    if (user.invalidRefreshTokenTries >= 2) user.blackList = true;
    await user.save({ validateBeforeSave: false });
  }

  return res.redirect('/logout');
};

const handlePasswordChangedAtValid = async (res, user, decodedToken) => {
  const passwordChangedAt = +new Date(user.passwordChangedAt);
  const tokenCreationTime = Number(decodedToken.iat) * 1000;

  if (passwordChangedAt > tokenCreationTime) {
    return res.redirect('/logout');
  }

  return true;
};

const handleUserValid = async (res, jwt, optionalUserID) => {
  let userID, token;

  if (optionalUserID) {
    token = jwt;
    userID = optionalUserID;
  } else {
    token = await decodeToken(jwt, process.env.JWT_SECRET);
    userID = token.id;
  }

  // check if user exist in db
  const user = await User.findOne({
    _id: userID,
    blackList: false,
    invalidRefreshTokenTries: { $lt: 2 },
    verify: true,
  }).exec();

  if (!user) {
    return res.redirect('/logout');
  }
  const passwordChangeAtTimingIsValid = await handlePasswordChangedAtValid(
    res,
    user,
    token
  );
  if (!passwordChangeAtTimingIsValid) return res.redirect('/logout');

  return user;
};

const blackListUserIfTokenInvalidPassesMaxTries = async (
  res,
  user,
  token,
  refreshJwt
) => {
  if (!token || token.refreshToken !== refreshJwt) {
    let invalidTokenTries = +user.invalidRefreshTokenTries;
    invalidTokenTries += 1;

    if (invalidTokenTries >= 2) {
      user.blackListUser = true;
      user.invalidTokenTries = invalidTokenTries;
      user.save({ validateBeforeSave: false }).exec();
      return res.redirect('/logout');
    }
  }

  return true;
};

const handleRefreshJwt = async (res, refreshJwt) => {
  const decodedToken = await decodeToken(
    refreshJwt,
    process.env.REFRESH_JWT_SECRET
  );

  const userID = decodedToken.id;

  const user = await handleUserValid(res, decodeToken, userID);
  if (!user) return;

  const token = await refreshTokenModel.findOne({ user: userID }).exec();

  const isUserBlacklisted = await blackListUserIfTokenInvalidPassesMaxTries(
    res,
    user,
    token,
    refreshJwt
  );
  if (!isUserBlacklisted) return;

  //  hacked made cookie
  if (!token) return res.redirect('/logout');

  // resued old cookie
  if (token.refreshToken !== refreshJwt) {
    await deleteToken(userID);
    return res.redirect('/logout');
  }

  return user;
};

exports.protect = catchAsync(async (req, res, next) => {
  const { jwt, refreshJwt } = req.cookies;

  let user;

  // if no cookie exist mean this is a new user or a old user which has not login from a long time
  // if we have no cookies then login

  if (!jwt && !refreshJwt) return res.redirect('/news/explore/general');

  // if we have only jwt no refresh that means it is stolen
  if (jwt && !refreshJwt) return await handleStolenToken(req, res);

  if (!jwt && refreshJwt) user = await handleRefreshJwt(res, refreshJwt);

  if (jwt && refreshJwt) user = await handleUserValid(res, jwt);

  // reached here mean user is valid(jwt + refresh case)
  if (!user) return;

  req.user = user;
  req.login_user = true;

  if (jwt && refreshJwt) req.userBothJwtAreValid = true;

  next();
});

exports.isLoggedIn = catchAsync(async (req, res, next) => {
  const { jwt, refreshJwt } = req.cookies;
  let user;

  // if no cookie exist mean this is a new user or a old user which has not login from a long time
  // if we have no cookies then login

  if (!jwt && !refreshJwt) {
    req.login_user = false;
    return next();
  }

  // if we have only jwt no refresh that means it is stolen
  if (jwt && !refreshJwt) return await handleStolenToken(req, res);

  if (!jwt && refreshJwt) user = await handleRefreshJwt(res, refreshJwt);

  if (jwt && refreshJwt) user = await handleUserValid(res, jwt);

  // reached here mean user is valid(jwt + refresh case)
  if (!user) return;

  req.user = user;
  req.login_user = true;

  if (jwt && refreshJwt) req.userBothJwtAreValid = true;

  next();
});

exports.addTokenIfNeeded = catchAsync(async (req, res, next) => {

  if ((req.user && req.userBothJwtAreValid) || !req.login_user) return next();
  const { id } = req.user;

  // create token
  const { jwtToken, refreshJwtToken } = generateTokens(id);

  //   let save the new refresh token
  await createOrUpdateToken(id, refreshJwtToken);

  // create cookie
  const { refreshCookieOptions, jwtCookieOptions } = cookiesOptions();
  res.cookie('refreshJwt', refreshJwtToken, refreshCookieOptions);
  res.cookie('jwt', jwtToken, jwtCookieOptions);

  // resetting some properties
  req.userBothJwtAreValid = false;

  return next();

  // Now need to clear some variables for future safe req here properties dont repeat
});

exports.sendToken = catchAsync(async (req, res) => {
  const { _id } = req.user;

  // create token
  const { jwtToken, refreshJwtToken } = generateTokens(_id);

  //   let save the new refresh token
  await createOrUpdateToken(_id, refreshJwtToken);

  // create cookie
  const { refreshCookieOptions, jwtCookieOptions } = cookiesOptions();
  res.cookie('refreshJwt', refreshJwtToken, refreshCookieOptions);
  res.cookie('jwt', jwtToken, jwtCookieOptions);

  // To send response to server
  req.user = undefined;

  return sendReq(res, req.statusCode || 200, req.message);
});
