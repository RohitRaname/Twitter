/* eslint-disable camelcase */
const multer = require('multer');
const AppError = require('./AppError');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) cb(null, true);
  else cb(new AppError('Not an image! Please upload only images', 400), false);
};

const upload = multer({
  storage: multerStorage,
  filter: multerFilter,
});

exports.single_field_single_img= (img_field) => upload.single(img_field);
exports.single_field_with_multiple_imgs = (img_field, limit) =>
upload.array(img_field, limit);

exports.multiple_field_with_multiple_imgs = (field_and_limit) =>
upload.fields([field_and_limit])
