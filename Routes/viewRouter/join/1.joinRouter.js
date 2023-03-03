const express = require('express');
const joinUserController = require('../../../Controller/view/join/0.joinUserViewController');

const joinRouter = express.Router();

joinRouter.get('/', joinUserController.getJoinUserPage);
joinRouter.get('/signup', joinUserController.show_signup_page_in_joinuser_page);

module.exports = joinRouter;
