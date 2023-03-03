/* eslint-disable camelcase */
const mongoose = require('mongoose');

const try_catch = require('../utils/tryCatchBlock');

const get_bucket_new_page_number = try_catch(
  async (model, bucket_group_field, bucket_group_field_value) => {
    const doc = await model
      .findOne({
        [bucket_group_field]: bucket_group_field_value,
      })
      .sort({ page: -1 })
      .limit(1)
      .exec();
    if (!doc) return 0;
    return Number(doc.page) + 1;
  }
);

exports.check_doc_already_exist_in_bucket = try_catch(
  async (
    model,
    bucket_group_field,
    bucket_group_field_value,
    bucket_arr_field,
    bucket_arr_doc_id
  ) =>
    await model
      .findOne({
        [bucket_group_field]: bucket_group_field_value,
        [`${bucket_arr_field}._id`]: bucket_arr_doc_id,
      })
      .exec()
);

exports.update_relative_bucket_arr_count_in_user_doc = try_catch(
  async (user_id, bucket_count_field, count) => {
    await mongoose
      .model('user')
      .findOneAndUpdate(
        { _id: user_id },
        { $inc: { [bucket_count_field]: count } }
      );
  }
);

// add doc to bucket arr [{}]
exports.add_doc_to_bucket = async (
  model,
  bucket_group_field,
  bucket_group_field_value,
  bucket_arr,
  to_be_add_doc,
  update_user_doc_relative_count_field,
  user_id,
  user_bucket_count_field
) => {
  if (
    await this.check_doc_already_exist_in_bucket(
      model,
      bucket_group_field,
      bucket_group_field_value,
      bucket_arr,
      to_be_add_doc._id
    )
  )
    return;

  let doc_update = await model
    .findOneAndUpdate(
      {
        [bucket_group_field]: bucket_group_field_value,
        $expr: {
          $lt: [{ $size: `$${bucket_arr}` }, 50],
        },
      },
      {
        $push: { [bucket_arr]: to_be_add_doc },
      },
      { new: true }
    )
    .exec();

  if (doc_update) {
    if (update_user_doc_relative_count_field)
      this.update_relative_bucket_arr_count_in_user_doc(
        user_id,
        user_bucket_count_field,
        1
      );

    return doc_update[bucket_arr].slice(-1)[0];
  }
  const new_bucket_page_number = await get_bucket_new_page_number(
    model,
    bucket_group_field,
    bucket_group_field_value
  );

  doc_update = await model.create({
    [bucket_arr]: to_be_add_doc,
    [bucket_group_field]: bucket_group_field_value,
    page: new_bucket_page_number,
  });

  if (doc_update) {
    if (update_user_doc_relative_count_field)
      this.update_relative_bucket_arr_count_in_user_doc(
        user_id,
        user_bucket_count_field,
        1
      );
  }
  return doc_update[bucket_arr].slice(-1)[0];
};

exports.remove_doc_from_bucket = async (
  model,
  bucket_group_field,
  bucket_group_field_value,
  bucket_arr_field,
  bucket_arr_doc_id,
  update_user_doc_relative_count_field,
  user_id,
  user_bucket_count_field
) => {
  const update_doc = await model
    .findOneAndUpdate(
      {
        [bucket_group_field]: bucket_group_field_value,
        [`${bucket_arr_field}._id`]: bucket_arr_doc_id,
      },
      {
        $pull: { [bucket_arr_field]: { _id: bucket_arr_doc_id } },
      },
      { new: true }
    )
    .exec();

  if (!update_doc) {
    console.error('bucket doc does not exist', 400);
    return;
  }

  if (update_doc) {
    if (update_user_doc_relative_count_field)
      this.update_relative_bucket_arr_count_in_user_doc(
        user_id,
        user_bucket_count_field,
        -1
      );

    return update_doc;
  }
};

exports.remove_multiple_docs_from_bucket = async (
  model,
  bucket_group_field,
  bucket_group_field_value,
  bucket_arr_field,
  bucket_arr_doc_ids,
  update_user_doc_relative_count_field,
  user_id,
  user_bucket_count_field
) => {
  const update_doc = await model
    .updateMany(
      {
        [bucket_group_field]: bucket_group_field_value,
        [`${bucket_arr_field}._id`]: { $in: bucket_arr_doc_ids },
      },
      {
        $pull: { [bucket_arr_field]: { _id: { $in: bucket_arr_doc_ids } } },
      },
      { new: true }
    )
    .exec();

  if (!update_doc) {
    console.error('bucket doc does not exist', 400);
    return;
  }
  if (update_doc) {
    if (update_user_doc_relative_count_field)
      this.update_relative_bucket_arr_count_in_user_doc(
        user_id,
        user_bucket_count_field,
        -1
      );
    return update_doc;
  }
};
exports.remove_bucket_arr_all_docs = async (
  model,
  bucket_group_field,
  bucket_group_field_value,
  bucket_arr_field,
  update_user_doc_relative_count_field,
  user_id,
  user_bucket_count_field
) => {
  const update_doc = await model
    .updateMany(
      {
        [bucket_group_field]: bucket_group_field_value,
      },
      {
        $set: { [bucket_arr_field]: [] },
      },
      { new: true }
    )
    .exec();

  if (!update_doc) {
    console.error('bucket doc does not exist', 400);
    return;
  }
  if (update_doc) {
    if (update_user_doc_relative_count_field)
      this.update_relative_bucket_arr_count_in_user_doc(
        user_id,
        user_bucket_count_field,
        -1
      );
    return update_doc;
  }
};

// embedded docs in bucket field
exports.get_bucket_embedded_latest_doc = try_catch(
  async (
    model,
    limit,
    page,
    bucket_group_field,
    bucket_group_field_value,
    bucket_field_arr,
    additional_filter
  ) => {
    const tweets = await model.aggregate([
      {
        $match: {
          [bucket_group_field]: mongoose.Types.ObjectId(
            bucket_group_field_value
          ),
          ...additional_filter,
        },
      },
      { $project: { [bucket_field_arr]: 1, _id: 0 } },

      { $sort: { page: -1 } },

      // { $unwind: `$${bucket_field_arr}` },

      { $skip: Number(page) * Number(limit) },

      { $limit: Number(limit) },
    ]);

    return tweets.length > 0 ? tweets[0][bucket_field_arr].reverse() : [];
  }
);

// reference docs in reference field
exports.get_bucket_ref_latest_doc = try_catch(
  async (
    model,
    from_model,
    limit,
    page,
    bucket_group_field,
    bucket_group_field_value,
    bucket_field_arr,
    additional_filter
  ) => {


    
    const agg_docs = await model.aggregate([
      {
        $match: {
          [bucket_group_field]: mongoose.Types.ObjectId(
            bucket_group_field_value
          ),
          ...additional_filter,
        },
      },
      { $project: { [bucket_field_arr]: 1 } },

      { $sort: { page: -1 } },

      { $unwind: `$${bucket_field_arr}` },

      { $skip: Number(page) * Number(limit) },

      { $limit: Number(limit) },

      { $project: { _id: 0 } },

      {
        $lookup: {
          from: from_model,

          let: { doc_id: `$${bucket_field_arr}._id` },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$active', true] },
                    { $eq: ['$_id', '$$doc_id'] },
                  ],
                },
              },
            },
          ],

          as: 'matched',
        },
      },

      { $replaceWith: { $mergeObjects: [{ $first: '$matched' }] } },

      { $sort: { ts: -1 } },
    ]);


    return agg_docs.filter((obj) => Object.keys(obj).length > 0);
  }
);

// same as get_bucket_embedded_latest_doc no limit
exports.get_bucket_arr_field_all_docs = try_catch(
  async (
    model,

    bucket_group_field,
    bucket_group_field_value,
    bucket_field_arr,
    additional_filter
  ) => {
    const result = await model.aggregate([
      {
        $match: {
          [bucket_group_field]: mongoose.Types.ObjectId(
            bucket_group_field_value
          ),
          ...additional_filter,
        },
      },
      { $project: { [bucket_field_arr]: 1, _id: 0 } },

      { $sort: { page: -1 } },

      { $unwind: `$${bucket_field_arr}` },

      { $group: { _id: null, docs: { $push: `$${bucket_field_arr}` } } },

      { $project: { docs: 1, _id: 0 } },
    ]);

    return result.length > 0 ? result[0].docs.reverse() : [];
  }
);

// return one doc
exports.get_bucket_embedded_doc = try_catch(
  async (
    model,
    bucket_group_field,
    bucket_group_field_value,
    bucket_arr_field,
    bucket_doc_id
  ) => {
    // aggregate dont convert id on its own so we need to convert id on its own

    const doc = await model.aggregate([
      {
        $match: {
          [bucket_group_field]: mongoose.Types.ObjectId(
            bucket_group_field_value
          ),
          // [`${bucket_arr_field}._id`]: bucket_doc_id,
        },
      },

      { $project: { [bucket_arr_field]: 1, _id: 0 } },
      {
        $set: {
          [bucket_arr_field]: {
            $filter: {
              input: `$${bucket_arr_field}`,
              cond: {
                $eq: ['$$this._id', mongoose.Types.ObjectId(bucket_doc_id)],
              },
            },
          },
        },
      },
    ]);

    return doc[0][bucket_arr_field][0];
  }
);

exports.update_bucket_doc = try_catch(
  async (
    model,
    bucket_group_field,
    bucket_group_field_value,
    bucket_arr_field,
    bucket_arr_doc_id,
    update_obj
  ) => {
    const result = await model.findOneAndUpdate(
      {
        [bucket_group_field]: bucket_group_field_value,
        [`${bucket_arr_field}._id`]: bucket_arr_doc_id,
      },
      {
        $set: update_obj,
      }
    );


    return result[bucket_arr_field].find((el) =>
      el._id.equals(bucket_arr_doc_id)
    );
  }
);

// arr with doc exist in bucket arr field
exports.given_doc_arr_exist_in_bucket = try_catch(
  async (
    model,
    bucket_group_field,
    bucket_group_field_value,
    bucket_arr_field,
    given_doc_arr,
    field_set
  ) => {
    const bucket_docs = await this.get_bucket_arr_field_all_docs(
      model,
      bucket_group_field,
      bucket_group_field_value,
      bucket_arr_field,
      {}
    );

    const docs = given_doc_arr.map((doc) => {
      doc[field_set] = bucket_docs.some((el) => el._id.equals(doc._id));
      return doc;
    });

    return docs;
  }
);
