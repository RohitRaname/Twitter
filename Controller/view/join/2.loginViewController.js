exports.getConfirmLogin = (req, res) => {
  const { q } = req.query;
  return res.render('pages/joinUser/login/1.enterPassword.pug', { q });
};
