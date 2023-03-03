const express = require('express');
const authController = require('../../Controller/authController');
const userController = require('../../Controller/user/userController');
// const tweetLikeController = require('../../Controller/tweet/tweetLikeController')
const protect_router = require('../identify_and_protect_router/protect_router');
const is_logged_in_router = require('../identify_and_protect_router/is_login_router');

const userRouter = express.Router();
// User Router

userRouter.get(
  '/search/:name/:limit',
  is_logged_in_router,
  userController.search_users
);

userRouter.get(
  '/restrict-fields/:user_id',
  is_logged_in_router,
  userController.get_restrict_user
);

userRouter.use(protect_router);

userRouter.get(
  '/me/suggest-user-to-follow/:page/:limit',
  userController.api_get_most_followed_users
);

userRouter
  .route('/me')
  .get(userController.setUserId, userController.getUser)
  .patch(
    userController.uploadUserPhotoOrCoverPic,
    userController.resizeImages,
    userController.updateMe
  )
  .delete(userController.deleteMe);

userRouter.use('/', authController.restricTo('admin'));
userRouter
  .route('/')
  .get(userController.getAllUser)
  .patch(userController.updateAllUser)
  .post(userController.createUser);

userRouter
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);
module.exports = userRouter;
