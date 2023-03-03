/* eslint-disable camelcase */
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const connectLivereload = require('connect-livereload');
const cors = require('cors');

const authRouter = require('./Routes/authRouter');
const userRouter = require('./Routes/user/0.baseRouter');
const viewRouter = require('./Routes/viewRouter/baseRouter');
const tweetRouter = require('./Routes/tweet/tweetRouter');
const comment_router = require('./Routes/comment_router');
const news_router = require('./Routes/news_router');
const message_router = require('./Routes/message_router');

const AppError = require('./utils/AppError');
const GlobalErrorHandler = require('./Controller/globalErrorHandler');

// start cleanup controller
require('./Controller/cleanup_controller');

const app = express();
app.use(connectLivereload());
app.use(cors('*'));

// set pug
app.set('view engine', 'pug');
app.set('views', './views');
// server static file
app.use(express.static(path.join(__dirname, 'public')));

// get req short url
app.use(morgan('dev'));
app.use(cookieParser());

// converting data coming to desired form
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set routes

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tweets', tweetRouter);
app.use('/api/v1/comments', comment_router);
app.use('/api/v1/news', news_router);
app.use('/api/v1/messages', message_router);

app.use('/', viewRouter);

// app.use('/maiRouter')

// arrow function simply return the function
app.use('*', (req, res, next) => {
  // next(new AppError(`Route doesn't exist ${req.originalUrl}`), 404)
  console.error(`Route doesn't exist ${req.originalUrl}`);
  // return sendReq(res, 400, `Route doesn't exist ${req.originalUrl}`);
  next();
});

app.use(GlobalErrorHandler);

module.exports = app;
