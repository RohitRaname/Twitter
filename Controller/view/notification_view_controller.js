/* eslint-disable camelcase */
const catchAsync = require('../../utils/catchAsync');

const notification_controller = require('../user/user_notification_controller');

exports.render_notification_page = catchAsync(async (req, res) => {
  let notifications = await notification_controller.get_notifications(
    req.user._id,
    0,
    25
  );

  notifications = notifications.map((el) => {
    let url;
    const {
      type,
      _id,
      user: { avatar },
    } = el;

    if (type === 'tweet-create') url = `tweets/${_id}/comments/normal`;
    else if (type.includes('like')) url = `users/${avatar.slice(1)}`;
    else if (type.includes('comment')) url = `comments/${_id}/replies/normal`;
    else url = `users/${avatar.slice(1)}`;

    el.url = url;
    return el;
  });

  res.render('pages/notification_page', {
    notifications,
   ...req.restrict_user,
   login_user: req.login_user,
   page:"notification"


  });
});
