exports.getJoinUserPage = (req, res) =>
  res.render('pages/joinUser/joinPage.pug');
exports.show_signup_page_in_joinuser_page = (req, res) =>
  res.render('pages/joinUser/joinPage.pug',{show_signup:true});
