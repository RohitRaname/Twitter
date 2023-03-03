/* eslint-disable camelcase */
const express = require('express');
const user_mute_controller = require('../../Controller/user_activity/mute_user_controller');

const user_mute_router = express.Router();

user_mute_router.post('/add/:user_id', user_mute_controller.mute_user);
user_mute_router.delete('/remove/:user_id', user_mute_controller.unmute_user);
user_mute_router.get('/page/:page', user_mute_controller.api_get_muted_users);

// user_mute_router.get(
//   '/user/:user_id/page/:page',
//   user_mute_router.api_get_bookmark_tweets
// );

module.exports = user_mute_router;
