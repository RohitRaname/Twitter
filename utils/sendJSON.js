const sendReq = (res, statusCode, message, docs) => {
  let status;
  if (`${statusCode}`.startsWith('2')) status = 'success';
  else status = 'error';

  res.status(statusCode).json({
    status,
    message,
    docs,
  });
};

// exports.send = (res, statusCode, doc,message, doc) => {
//   let status;
//   if (`${statusCode}`.startsWith('2')) status = 'success';
//   else status = 'error';

//   res.status(statusCode).json({
//     status,
//     message,
//     doc,
//     ...doc,
//   });
// };

module.exports = sendReq;
