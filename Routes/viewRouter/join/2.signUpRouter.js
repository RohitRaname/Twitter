const express = require('express');
const signUpViewController = require('../../../Controller/view/join/1.signUpViewController');

const signUpRouter = express.Router();

signUpRouter.get(
  '/2',
  signUpViewController.setNameEmailBirthFromReq,
  signUpViewController.signUpConfirmAccountCredentials
);

signUpRouter.use(signUpViewController.setEmailFromReq);
signUpRouter.get('/1', signUpViewController.signUpCustomiseUserExperience);
signUpRouter.get('/3', signUpViewController.signUpEmailVerification);
signUpRouter.get('/4', signUpViewController.signUpSetPassword);
signUpRouter.get('/5', signUpViewController.signUpSetProfile);
signUpRouter.get('/6', signUpViewController.signUpSetBio);

module.exports = signUpRouter;
