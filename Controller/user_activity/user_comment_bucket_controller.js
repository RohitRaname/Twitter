/* eslint-disable camelcase */
const mongoose = require('mongoose');
const catchAsync = require('../../utils/catchAsync');
const user_activity = require('../../Model/user/user_acitivity_model');
const bucket_controller = require('../bucket_controller');
const AppError = require('../../utils/AppError');
const sendReq = require('../../utils/sendJSON');
const { readable_time } = require('../../utils/helperFunction');
const try_catch = require('../../utils/tryCatchBlock');
const base_activity_controller = require('./base_activity_controller');
const notification_controller = require('../user/user_notification_controller');

const tweet_controller = require('../tweet/tweetController');

exports.add_comment_to_user_comment_bucket = try_catch(
  async (cur_user, comment, tweet_id, comment_tweet_user_id) => {
    // 1.add tweet_id to user bookmark

    let result;

    const add_comment_id_to_user_comment_arr =
      bucket_controller.add_doc_to_bucket(
        user_activity,
        'user_id',
        cur_user._id,
        'comment_id_arr',
        { _id: comment._id },
        false
      );

    const add_comment_tweet_to_user_comment_arr =
      bucket_controller.add_doc_to_bucket(
        user_activity,
        'user_id',
        cur_user._id,
        'comment_tweet_id_arr',
        { _id: tweet_id },
        false
      );

    let comment_interaction_notification;

    const comment_tweet = await mongoose
      .model('tweet')
      .findOne({ _id: tweet_id }, { user_id: 1 });

    if (cur_user._id.toString() !== comment_tweet_user_id.toString()) {
      // send like notification to user which tweet get liked
      const comment_interaction_notification_doc = {
        _id: comment._id,
        type: comment.parent_id ? 'reply-to-comment' : 'comment-on-tweet',
        user: {
          _id: cur_user._id,
          avatar: cur_user.avatar,
          name: cur_user.name,
          profilePic: cur_user.profilePic,
        },
        text: comment.text,
      };

      comment_interaction_notification =
        notification_controller.create_notification(
          comment_tweet.user_id,
          comment_interaction_notification_doc
        );
    }

    await Promise.all([
      add_comment_id_to_user_comment_arr,
      add_comment_tweet_to_user_comment_arr,
      comment_interaction_notification,
    ]);

    return result;
  }
);
exports.remove_comment_from_user_comment_bucket = try_catch(
  async (user_id, comment_id, tweet_id) => {
    // 1.add tweet_id to user bookmark

    let result;

    const remove_comment_id_from_user_comment_arr =
      bucket_controller.remove_doc_from_bucket(
        user_activity,
        'user_id',
        user_id,
        'comment_id_arr',
        comment_id,
        false
      );
    const remove_comment_tweet_from_user_comment_arr =
      bucket_controller.remove_doc_from_bucket(
        user_activity,
        'user_id',
        user_id,
        'comment_tweet_id_arr',
        tweet_id,
        false
      );

    await Promise.all([
      remove_comment_id_from_user_comment_arr,
      remove_comment_tweet_from_user_comment_arr,
    ]);

    return result;
  }
);

exports.add_or_remove_comment_to_user_like_comment_arr = try_catch(
  async (user_id, comment_id, value) =>
    value === 1
      ? await base_activity_controller.add_doc('like_comment_id_arr', user_id, {
          _id: comment_id,
        })
      : await base_activity_controller.remove_doc(
          'like_comment_id_arr',
          user_id,
          comment_id
        )
);

exports.add_or_remove_comment_to_user_bookmark_comment_arr = try_catch(
  async (user_id, comment_id, value) =>
    value === 1
      ? await base_activity_controller.add_doc(
          'bookmark_comment_id_arr',
          user_id,
          {
            _id: comment_id,
          }
        )
      : await base_activity_controller.remove_doc(
          'boomark_comment_id_arr',
          user_id,
          comment_id
        )
);

exports.remove_multiple_comment_from_user_comment_bucket = try_catch(
  async (user_id, comment_id_arr, tweet_id) => {
    // 1.add tweet_id to user bookmark

    let result;

    const remove_comments_from_user_comment_arr =
      bucket_controller.remove_doc_from_bucket(
        user_activity,
        'user_id',
        user_id,
        'comment_id_arr',
        comment_id_arr,
        false
      );

    const remove_comment_tweet_from_user_comment_arr =
      bucket_controller.remove_doc_from_bucket(
        user_activity,
        'user_id',
        user_id,
        'comment_tweet_id_arr',
        tweet_id,
        false
      );

    await Promise.all([
      remove_comments_from_user_comment_arr,
      remove_comment_tweet_from_user_comment_arr,
    ]);

    if (!result)
      return new Error('comment_id not removed from user_comment_bucket');
    return result;
  }
);

// interaction means =>
exports.set_cur_user_interaction_with_given_comments = try_catch(
  (cur_user_activity_docs, view_user_comments) => {
    // 1.check cur_user can see the tweet  and if cur_user cant we dont need the tweet (that's why return)
    // point => if(target audience is circle then reply audience circle only)
    // 2.check cur_user can reply to tweet
    // 3.check cur_user is following  tweet user

    view_user_comments.map((comment_doc) => {
      const comment_id = comment_doc._id;

      comment_doc.ts_format = readable_time(comment_doc.ts);

      // check if tweet is bookmark by user
      comment_doc.bookmark_by_cur_user =
        tweet_controller.doc_exist_in_user_activities(
          cur_user_activity_docs,
          'bookmark_comment_id_arr',
          comment_id
        );

      comment_doc.comment_by_cur_user =
        tweet_controller.doc_exist_in_user_activities(
          cur_user_activity_docs,
          'comment_id_arr',
          comment_id
        );
      comment_doc.like_by_cur_user =
        tweet_controller.doc_exist_in_user_activities(
          cur_user_activity_docs,
          'like_comment_id_arr',
          comment_id
        );

      if (comment_doc.child_comments_count > 0) {
        const child_comment = comment_doc.reply;
        child_comment.ts_format = readable_time(child_comment.ts);

        child_comment.bookmark_by_cur_user =
          tweet_controller.doc_exist_in_user_activities(
            cur_user_activity_docs,
            'bookmark_comment_id_arr',
            comment_id
          );

        child_comment.comment_by_cur_user =
          tweet_controller.doc_exist_in_user_activities(
            cur_user_activity_docs,
            'comment_id_arr',
            comment_id
          );
        child_comment.like_by_cur_user =
          tweet_controller.doc_exist_in_user_activities(
            cur_user_activity_docs,
            'like_comment_id_arr',
            comment_id
          );
      }

      return comment_doc;
    });

    return view_user_comments;
  }
);

// cur_user is watching view_user comments => we need to see the view_user comments and also know which view_user comments are like by the cur_user or bookmark or the view_user-comments on which cur_user comments
exports.get_view_user_comments_with_cur_user_interaction = try_catch(
  async (cur_user_id, view_user_id, page = 0, limit) => {
    let results = await Promise.all([
      bucket_controller.get_bucket_ref_latest_doc(
        user_activity,
        'comments',
        limit,
        page,
        'user_id',
        view_user_id,
        'comment_id_arr',
        {}
      ),
      user_activity.find({ user_id: cur_user_id }),
    ]);

    let [view_user_comments, cur_user_activity_docs] = results;

    view_user_comments = this.set_cur_user_interaction_with_given_comments(
      cur_user_activity_docs,
      view_user_comments
    );

    return view_user_comments;
  }
);

exports.api_get_view_user_comments_and_modified_with_cur_user_interaction =
  catchAsync(async (req, res, next) => {
    const { view_user_id, page, limit } = req.params;

    const view_user_comments = req.login_user
      ? await this.get_view_user_comments_with_cur_user_interaction(
          req.user._id,
          view_user_id,
          page,
          limit
        )
      : await bucket_controller.get_bucket_ref_latest_doc(
          user_activity,
          'comments',
          limit,
          page,
          'user_id',
          view_user_id,
          'comment_id_arr',
          {}
        );
    return sendReq(res, 200, 'comments', view_user_comments);
  });
