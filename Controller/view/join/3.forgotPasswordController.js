const { addHashToEmail } = require('../../../utils/helperFunction');

exports.getFindAccountByUserOrEmail = (req, res) =>
  res.render('pages/joinUser/forgotPassword/0.findAccount.pug');
exports.getFindAccountByEmail = (req, res) =>
  res.render('pages/joinUser/forgotPassword/0.findAccountByEmail.pug');
exports.getSendVerificationToken = (req, res) => {
  // email
  let { q } = req.query;
  q = addHashToEmail(q);

  res.render('pages/joinUser/forgotPassword/1.sendVerification.pug', {
    email: q,
  });
};
exports.getverifyAccount = (req, res) => {
  // email
  const { q } = req.query;

  res.render('pages/joinUser/forgotPassword/2.verifyAccount.pug', {
    email: q,
  });
};
exports.getResetPassword = (req, res) => {
  // email
  const { q } = req.query;
  res.render('pages/joinUser/forgotPassword/3.resetPassword.pug', { email: q });
};
