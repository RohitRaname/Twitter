/* eslint-disable camelcase */
const catchAsync = require('../../utils/catchAsync');
const user_activity = require('../../Model/user/user_acitivity_model');
const bucket_controller = require('../bucket_controller');
const AppError = require('../../utils/AppError');
const sendReq = require('../../utils/sendJSON');
const try_catch = require('../../utils/tryCatchBlock');
const { default: mongoose } = require('mongoose');

exports.add_user_to_circle = catchAsync(async (req, res, next) => {
  // 1.add tweet_id to user bookmark

  let result;
  const { user_id: add_to_circle_id } = req.params;
  const { add_user: to_be_add_user } = req.body;

  const add_to_bucket = bucket_controller.add_doc_to_bucket(
    user_activity,
    'user_id',
    req.user._id,
    'circle',
    to_be_add_user,
    false
  );

  const add_to_user = mongoose
    .model('user')
    .findOneAndUpdate(
      { _id: req.user._id },
      { $push: { circle_user_id_arr: to_be_add_user._id } }
    );
  await Promise.all([add_to_bucket, add_to_user]);
  return sendReq(res, 200, 'user added to circle', result);
});

exports.remove_user_from_circle = catchAsync(async (req, res, next) => {
  // 1.add tweet_id to user bookmark

  let result;
  const { user_id } = req.params;
  const remove_from_bucket = bucket_controller.remove_doc_from_bucket(
    user_activity,
    'user_id',
    req.user._id,
    'circle',
    user_id,
    false
  );

  const remove_from_user = mongoose
    .model('user')
    .findOneAndUpdate(
      { _id: req.user._id },
      { $pull: { circle_user_id_arr: user_id } }
    );
  await Promise.all([remove_from_bucket, remove_from_user]);

  return sendReq(res, 200, 'user removed from the circle', result);
});

exports.get_circle_users = try_catch(
  async (user_id, page, limit) =>
    await bucket_controller.get_bucket_embedded_latest_doc(
      user_activity,
      limit,
      page,
      'user_id',
      user_id,
      'circle',
      {}
    )
);

exports.get_all_circle_users = try_catch(
  async (user_id) =>
    await bucket_controller.get_bucket_arr_field_all_docs(
      user_activity,
      'user_id',
      user_id,
      'circle',
      {}
    )
);

exports.api_get_circle_users = catchAsync(async (req, res, next) => {
  const { page, limit } = req.params;
  const circle_users = await this.get_circle_users(req.user._id, page, limit);
  return sendReq(res, 200, 'circle users', circle_users);
});

exports.get_recommend_users = try_catch(async (req, res, next) => {
  // can be one letter due to user is searching
  const { name, limit, page } = req.params;

  if (!name) return sendReq(res, 200, []);
  let recommend_docs = await mongoose.model('user').aggregate([
    {
      $search: {
        compound: {
          should: [
            {
              autocomplete: {
                path: 'name',
                query: name,
                fuzzy: { prefixLength: 1 },
              },
            },
            {
              text: {
                path: 'name',
                query: name,
                score: { boost: { value: 2 } },
              },
            },
          ],
          minimumShouldMatch: 1,
        },
        returnStoredSource: true,
      },
    },

    { $skip: Number(page) * Number(limit) },

    { $limit: Number(limit) || 12 },
  ]);

  const circle_users = await this.get_all_circle_users(req.user._id);

  recommend_docs = recommend_docs.filter(
    (recommend) =>
      !circle_users.some((circle_user) => recommend._id.equals(circle_user._id))
  );

  return sendReq(res, 200, 'recommend', recommend_docs);
});
