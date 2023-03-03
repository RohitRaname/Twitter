// tryCatchBlock
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const ApiFeatures = require('../utils/apiFeatures');

const sendReq = require('../utils/sendJSON');

const searchOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findOne({
      $text: { $search: req.params.search },
    }).exec();

    if (!doc) return next(new AppError('document does not exist', 404));

    return sendReq(res, 200, doc);
  });

// if this is coming from view dont send the data back send it back to next
const searchAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const docs = await Model.find(
      { $text: { $search: req.params.word } },
      { score: { $meta: 'textScore' } }
    ).sort({ score: -1 });
    if (!docs) return next(new AppError('docs not found', 404));

    if (req.passDocs) return docs;
    return sendReq(res, 200, docs);
  });

const getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id).exec();

    if (!doc) return next(new AppError('document does not exist', 404));

    if (req.passDocs) return doc;

    return sendReq(res, 200, 'doc', doc);
  });

const getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    let query = Model.find();
    if (req.populateOptions) query = query.populate(req.populateOptions);

    const apiObj = new ApiFeatures(query, req.query)
      .filter()
      .sort()
      .pagination()
      .limitFields();
    const docs = await apiObj.query;

    if (!docs) return next(new AppError('docs not found', 404));

    if (req.passDocs) {
      req.docs = docs;
      return next();
    }

    return sendReq(res, 200, 'docs', { total: docs.length, docs });
  });

// async function return promise but setTimout does not return promise

const createOne = (Model) =>
  catchAsync(async (req, res) => {
    const doc = await Model.create(req.body);

    const message = `${doc.constructor.modelName} is created`;

    return sendReq(res, 201, message, doc);
  });

const updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      // run validator not middleware
      runValidators: true,

      // return new updated obj
      new: true,
    }).exec();

    if (!doc) return next(new AppError('No doc found with this id', 404));

    const message = `${doc.constructor.modelName} is updated successfully`;

    return sendReq(res, 200, message, doc);
  });
const updateAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.updateMany(
      {},
      { $set: req.body },
      {
        // run validator not middleware
        runValidators: true,

        // return new updated obj
        new: true,
      }
    ).exec();

    if (!doc) return next(new AppError('No doc found with this id', 404));

    return sendReq(res, 200, 'update all docs', doc);
  });

const deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findOneAndDelete({ _id: req.params.id }).exec();
    if (!doc) return next(new AppError('No doc found with this id', 404));

    const message = `${doc.constructor.modelName} is deleted successfully`;

    // 204 return no content
    return sendReq(res, 200, doc, message);
  });
const deleteAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.deleteMany({}).exec();
    if (!doc) return next(new AppError('No doc found with this id', 404));

    const message = `all docs is deleted successfully`;

    // 204 return no content
    return sendReq(res, 200, message, []);
  });

module.exports = {
  searchOne,
  searchAll,
  getOne,
  getAll,
  createOne,
  updateOne,
  updateAll,
  deleteOne,
  deleteAll,
};

// updates are same
