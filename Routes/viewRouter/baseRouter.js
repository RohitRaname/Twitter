/* eslint-disable camelcase */
// eslint-disable-next-line camelcase
const express = require('express');

// router ---------------------------
const joinRouter = require('./join/1.joinRouter');
const signUpRouter = require('./join/2.signUpRouter');
const loginRouter = require('./join/3.loginRouter');
const forgotPasswordRouter = require('./join/4.forgotPasswordRouter');

// user-related
const comment_router = require('./comment_router');
const homeRouter = require('./homeRouter');
const user_router = require('./user_router');
const tweet_router = require('./tweet_view_router');
const news_view_router = require('./news_view_router');
const notification_view_router = require('./notification_router');
const bookmark_view_router = require('./bookmark_view_router');
const message_view_router = require('./message_view_router');
const settings_view_router = require('./settings_view_router');

const protect_router = require('../identify_and_protect_router/protect_router');
const is_logged_in_router = require('../identify_and_protect_router/is_login_router');

const other_view_router = require('./other_view_router');


const viewRouter = express.Router();

viewRouter.use('/join', joinRouter);
viewRouter.use('/signUp', signUpRouter);
viewRouter.use('/login', loginRouter);
viewRouter.use('/forgotPassword', forgotPasswordRouter);

// viewRouter.use('/n', non_login_user_view_router);

// only one 1 function

// more than 1 func
viewRouter.use('/news', is_logged_in_router, news_view_router);

// router easier with frontend technology not
viewRouter.use('/users', is_logged_in_router, user_router);
viewRouter.use('/tweets', is_logged_in_router, tweet_router);

viewRouter.use('/comments', is_logged_in_router, comment_router);

// can be access by login user
viewRouter.use(protect_router);
viewRouter.use('/notifications', notification_view_router);
viewRouter.use('/bookmarks', bookmark_view_router);
viewRouter.use('/messages', message_view_router);
viewRouter.use('/i', other_view_router);
viewRouter.use('/settings', settings_view_router);

viewRouter.use('/', homeRouter);

module.exports = viewRouter;
