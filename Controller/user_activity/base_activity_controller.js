/* eslint-disable camelcase */
const UserActivity = require('../../Model/user/user_acitivity_model');
const catchAsync = require('../../utils/catchAsync');
const sendReq = require('../../utils/sendJSON');
const try_catch = require('../../utils/tryCatchBlock');
const bucket_controller = require('../bucket_controller');

exports.get_user_activity_all_bucket_docs = try_catch(
  async (user_id) =>
    await UserActivity.aggregate([
      { $match: { user_id: user_id } },

      { $unwind: '$' },
    ])
);

// not time waste on tweet and other things except song and coding

exports.add_doc = try_catch(
  async (field, user_id, doc_add) =>{
    await bucket_controller.add_doc_to_bucket(
      UserActivity,
      'user_id',
      user_id,
      field,
      doc_add,
      false
      )
    }
);

exports.remove_doc = try_catch(
  async (field, user_id, doc_id) =>
    await bucket_controller.remove_doc_from_bucket(
      UserActivity,
      'user_id',
      user_id,
      field,
      doc_id,
      false
    )
);
exports.get_embedded_docs = try_catch(
  async (user_id, page, limit, field) =>
    await bucket_controller.get_bucket_embedded_latest_doc(
      UserActivity,
      limit,
      page,
      'user_id',
      user_id,
      field,
      {}
    )
);

exports.remove_all_docs =  try_catch(
  async (field, user_id) =>
    await bucket_controller.remove_bucket_arr_all_docs(
      UserActivity,
      "user_id",
      user_id,
      field,
    false
    )
);

exports.api_add_doc = (field) =>
  catchAsync(async (req, res) => {
    const add_doc = await this.add_doc(field, req.user._id, req.body);

    return sendReq(res, 200, 'doc added', add_doc);
  });

exports.api_remove_doc = (field) =>
  catchAsync(async (req, res) => {
    const add_doc = await this.remove_doc(field, req.user._id, {_id:req.params.id});
    return sendReq(res, 200, 'doc removed', add_doc);
  });

exports.api_remove_all_docs = (field) =>
  catchAsync(async (req, res) => {
    await this.remove_all_docs(field, req.user._id);
    return sendReq(res, 200, 'all docs removed');
  });

exports.api_get_embedded_docs = (field) =>
  catchAsync(async (req, res) => {
    const { page, limit } = req.params;
    const docs = await this.get_embedded_docs(req.user._id, page, limit, field);
    return sendReq(res, 200, 'embeded_docs', docs);
  });

  