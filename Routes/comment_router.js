/* eslint-disable camelcase */
const comment_router = require('express').Router({ mergeParams: true });
const comment_controller = require('../Controller/comment_controller');
const tweet_controller = require('../Controller/tweet/tweetController');
const refreshTokenController = require('../Controller/refreshTokenController');
const protect_router = require('./identify_and_protect_router/protect_router');
const is_logged_in_router = require('./identify_and_protect_router/is_login_router');

const multer = require('../utils/multer');

// return tweet comments (redirect from tweet router)
comment_router.get(
  '/page/:page/limit/:limit',
  is_logged_in_router,
  comment_controller.api_get_tweet_comments
);

// return comment replies
comment_router.get(
  '/:comment_id/replies/page/:page/limit/:limit',
  is_logged_in_router,
  comment_controller.api_get_comment_replies
);

comment_router.use(protect_router);

// comment => top level comments
// reply => comment child comments(reply)

// user and admin can access this
comment_router
  .route('/:comment_id')
  .delete(comment_controller.api_delete_comment)
  .patch(comment_controller.api_update_comment)
  .post(
    multer.single_field_with_multiple_imgs('upload_imgs', 4),
    comment_controller.resizeImages,
    comment_controller.api_create_comment
  );

comment_router.post(
  '/tweet/:tweet_id/type/:comment_type',
  multer.single_field_with_multiple_imgs('upload_imgs', 4),
  comment_controller.resizeImages,
  tweet_controller.delete_unsent_tweet_if_posted,
  comment_controller.create_draft_or_schedule_comment
);

comment_router.patch(
  '/unsent-tweet/:tweet_id',
  multer.single_field_with_multiple_imgs('upload_imgs', 4),
  comment_controller.resizeImages,
  tweet_controller.update_unsent_tweet
);

comment_router.post('/:comment_id/like', comment_controller.like_comment);
comment_router.delete('/:comment_id/unlike', comment_controller.unlike_comment);

comment_router.post(
  '/:comment_id/bookmark',
  comment_controller.bookmark_comment
);
comment_router.delete(
  '/:comment_id/unbookmark',
  comment_controller.unbookmark_comment
);

comment_router
  .route('/tweet/:tweet_id')
  // .delete(comment_controller.delete_all_comments)
  .post(
    multer.single_field_with_multiple_imgs('upload_imgs', 4),
    comment_controller.resizeImages,
    tweet_controller.delete_unsent_tweet_if_posted,
    comment_controller.api_create_comment
  );
module.exports = comment_router;
