const express = require('express');
const forgotPasswordController = require('../../../Controller/view/join/3.forgotPasswordController');

const forgotPasswordRouter = express.Router();

forgotPasswordRouter.get(
  '/0',
  forgotPasswordController.getFindAccountByUserOrEmail
);
forgotPasswordRouter.get('/00', forgotPasswordController.getFindAccountByEmail);
forgotPasswordRouter.get(
  '/1',
  forgotPasswordController.getSendVerificationToken
);
forgotPasswordRouter.get('/2', forgotPasswordController.getverifyAccount);
forgotPasswordRouter.get('/3', forgotPasswordController.getResetPassword);

module.exports = forgotPasswordRouter;
