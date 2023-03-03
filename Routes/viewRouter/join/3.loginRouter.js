const express = require('express');
const loginController = require('../../../Controller/view/join/2.loginViewController');

const loginRouter = express.Router();

loginRouter.get('/confirmUser', loginController.getConfirmLogin);

module.exports = loginRouter;
