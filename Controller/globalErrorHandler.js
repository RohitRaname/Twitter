const AppError = require('../utils/AppError');

function sendProdError(req, res, err) {
  // api error => operational and programming
  // view error => operational and programming
  // console.log('Error 💣💥', err);

  if (req.url.startsWith('/api')) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        message: err.message,
      });
    }

    // No imformation should be elak
    return res.status(500).render('pages/error_page', {
      status: 'fail',
      msg: 'Something went wrong',
    });
  }

  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: 'Something went wrong',
      message: err.message,
    });
  }

  return res.status(500).render('pages/error_page', {
    status: 'Something went wrong',
    msg: 'Please try again',
  });
}
// start with err

// two version of error handler
// in development
// in production

// error are of two types
// 1.programming error => mongoose connection error and some synchronous code error or left async function
// 2.operational error => made by user like giving wrong imformation or accessing wrong route

function handleDuplicateKeyError(err) {
  let fields = Object.keys(err.keyValue);
  if (fields.length > 1) fields = fields.join('&');
  fields = fields[0];
  return new AppError(`${fields} already exist`, 409);
}

function handleJWTError(err) {
  return new AppError('Invalid token, please log in again', 401);
}
function handleJWTExpired(err) {
  return new AppError('Expired token, Please log in again', 401);
}

function handleValidationError(err) {
  let fields = Object.keys(err.errors);
  const msg = fields.map((key) => err.errors[key].message).join('. ');
  return new AppError(msg, 400);
}

function handleCastError(err) {
  let value;
  const fields = Object.keys(err.errors);
  if (fields.length === 0) value = err.errors[fields[0]].value;
  if (fields.length > 0)
    value = err.errors.map((mov, i) => mov[fields[i]].value);

  const msg = fields.map((mov, i) => `${mov}:${value[i]} cast error`).join('.');

  return new AppError(msg, 400);
}

const globalErrorHandler = (err, req, res, next) => {
  // Internal error like that we can control or not
  // control : error made by us
  // can control also network failure or too much time taken by to make req or mongoose connectionf failed

  // return res.status(err.statusCode).json({ err });

  err.status = err.status || 'fail';
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'fail';

  console.log(err);

  // send user the error with what they have done wrong
  // as much as less imformation
  // console.log({ ...err });

  // console.log(err);
  // if (process.env.NODE_ENV === 'development')
  //   return res.status(err.statusCode).json({ err });

  // 500 error
  if (err.code === 11000) err = handleDuplicateKeyError(err);
  if (err.name === 'CastError') err = handleCastError(err);
  if (err.name === 'ValidationError') err = handleValidationError(err);
  if (err.name === 'JsonWebTokenError') err = handleJWTError(err);
  if (err.name === 'TokenExpiredError') err = handleJWTExpired(err);

  // console.log(error);
  // now handling mongoose validation error and
  // Programming error
  // Like
  // - mongoose connection timout
  //  - like validator error index error token error
  // const msg = handleProgrammingError(err,res);

  // if error made by code then handle it and make site down and show me the error in development phase
  // return res.status(err.statusCode).json({ err });

  sendProdError(req, res, err);

  // return res.status(400).json({ err });
};

module.exports = globalErrorHandler;

// we need to take care of user error (400) and some internal error(500)
