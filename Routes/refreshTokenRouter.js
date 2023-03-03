const express = require('express');
const tokenController = require('../Controller/refreshTokenController');

const refreshTokenRouter = express.Router();

refreshTokenRouter.get('/', tokenController.handleToken, tokenController.addToken);

module.exports = refreshTokenRouter