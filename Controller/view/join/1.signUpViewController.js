// SIGN UP *******************************************

exports.setEmailFromReq = (req, res, next) => {
    const { email } = req.query;
    req.email = email;
    next();
  };
  
  exports.setNameEmailBirthFromReq = (req, res, next) => {
    const { email, name, birthDate } = req.query;
    req.email = email;
    req.name = name;
    req.birthDate = birthDate;
    next();
  };
  
  
  exports.signUpCustomiseUserExperience = (req, res) =>
    res.render('pages/joinUser/signUp/1.customiseExperience.pug', {
      user: { email: req.email },
    });
  
  exports.signUpConfirmAccountCredentials = (req, res) =>
    res.render('pages/joinUser/signUp/2.confirmAccount.pug', {
      user: { email: req.email, name: req.name, birthDate: req.birthDate },
    });
  
  exports.signUpEmailVerification = (req, res) =>
    res.render('pages/joinUser/signUp/3.emailVerification.pug', {
      user: { email: req.email },
    });
  
  exports.signUpSetPassword = (req, res) =>
    res.render('pages/joinUser/signUp/4.setPassword.pug', {
      user: { email: req.email },
    });
  
  exports.signUpSetPassword = (req, res) =>
    res.render('pages/joinUser/signUp/4.setPassword.pug', {
      user: { email: req.email },
    });
  
  exports.signUpSetProfile = (req, res) =>
    res.render('pages/joinUser/signUp/5.setProfile.pug', {
      user: { email: req.email },
    });
  
  exports.signUpSetBio = (req, res) =>
    res.render('pages/joinUser/signUp/6.setBio.pug', {
      user: { email: req.email },
    });
  