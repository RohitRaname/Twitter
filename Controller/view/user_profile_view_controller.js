/* eslint-disable camelcase */
const { default: mongoose } = require('mongoose');
const user_activity = require('../../Model/user/user_acitivity_model');
const tweet_controller = require('../tweet/tweetController');
const catchAsync = require('../../utils/catchAsync');
const user_tweet_controller = require('../user_activity/user_posted_tweet_bucket_controller');
const {
  groupBy_multiple_or_single_tweets,
} = require('../tweet/tweetController');

const AppError = require('../../utils/AppError');
const try_catch = require('../../utils/tryCatchBlock');

exports.get_25_tweets = try_catch(async (user_id, page) => {
  const results = await Promise.all([
    user_tweet_controller.get_user_tweets(user_id, page, 25),
  ]);
  if (results[0].length === 0) return 'no-docs-left';
  return results[0];
});

exports.render_user_profile = catchAsync(async (req, res, next) => {
  const { avatar } = req.params;

  const is_me = avatar === (req.user && req.user.avatar.slice(1));

  let profile_user_mute = false;
  let block_by_cur_user = false;

  const profile_user = is_me
    ? req.user
    : await mongoose
        .model('user')
        .findOne({ avatar: `@${avatar}` })
        .exec();


  if (!profile_user)
    return res.render('pages/user_profile_page', {
      search_user: req.params.avatar,
      profile_user_exist: false,
      login_user: true,
      side_news: await req.side_news,
      to_follow_users: await req.to_follow_users,
      section: 'user-profile',

      ...req.restrict_user,
    });

  const profile_user_id = profile_user._id;
  const cur_user_id = req.user && req.user._id;

  const profile_user_pinned_tweet_id_arr =
    profile_user.pinned_tweet_id_arr || [];

  // check for block and mute case
  if (!is_me && req.login_user) {
    if (
      profile_user.blocked_user_id_arr.find(
        (id) => id === cur_user_id.toString()
      )
    )
      return next(new AppError('You are blocked by the user'));

    if (
      req.user.muted_user_id_arr.length > 0 &&
      req.user.muted_user_id_arr.find((id) => id === profile_user_id.toString())
    )
      profile_user_mute = true;

    if (
      req.user.blocked_user_id_arr.length > 0 &&
      req.user.blocked_user_id_arr.find(
        (id) => id === profile_user_id.toString()
      )
    )
      block_by_cur_user = true;
  }

  // pinned tweets
  let [
    pinned_tweets,
    cur_user_activity_docs,
    news,
    to_follow_users,
    tweet_with_upload_imgs,
  ] = await Promise.all([
    user_tweet_controller.get_pinned_tweets(profile_user_pinned_tweet_id_arr),
    (req.login_user &&
      user_activity.find({
        user_id: cur_user_id,
      })) ||
      [],
    req.side_news,
    req.to_follow_users,
    user_tweet_controller.get_tweet_with_upload_imgs(profile_user_id),
  ]);

  // tweets that user can see and set follow ,mute,like,bookmark,comment prop for by cur user
  const get_visible_tweets_data = user_tweet_controller.get_visible_tweets(
    req.user,
    cur_user_activity_docs,
    profile_user_id,
    0,
    25,
    profile_user_pinned_tweet_id_arr
  );

  const [data] = await Promise.all([get_visible_tweets_data]);

  const { tweets, page } = data;

  const cur_user_follow =
    req.login_user &&
    tweet_controller.doc_exist_in_user_activities(
      cur_user_activity_docs,
      'following',
      profile_user_id
    );

  const send_notification_to_cur_user =
    req.login_user &&
    tweet_controller.doc_exist_in_user_activities(
      cur_user_activity_docs,
      'get_notification_from_users',
      profile_user_id
    );

  pinned_tweets = groupBy_multiple_or_single_tweets(
    pinned_tweets,
    (item) =>
      `${item.user_id}-${new Date(item.ts).getDay()}-${new Date(
        item.ts
      ).getHours()}-${new Date(item.ts).getMinutes()}-${new Date(
        item.ts
      ).getSeconds()}`
  );

  return res.render('pages/user_profile_page', {
    tweets: tweets || [],

    login_user: req.login_user,
    profile_user_exist: true,

    posted_tweet_page: page || 0,
    comment_page: 0,
    liked_tweet_page: 0,
    profile_user: profile_user,

    pinned_tweets: pinned_tweets,
    is_me: is_me,
    only_tweet_with_upload_imgs: tweet_with_upload_imgs || [],

    side_news: news,
    to_follow_users: to_follow_users,

    // USER --------------------------
    restrict_profile_user: {
      avatar: profile_user.avatar,
      _id: profile_user._id,
      profilePic: profile_user.profilePic,
      name: profile_user.name,
      mute_by_cur_user: profile_user_mute,
      follow_by_cur_user: cur_user_follow,
      block_by_cur_user: block_by_cur_user,
      send_notification_to_cur_user: send_notification_to_cur_user,
    },

    ...req.restrict_user,

    section: 'user-profile',
  });
});

// {  const results = await Promise.all([
//   user_tweet_controller.get_user_tweets(profile_user_id, 0, 25),
//   user_activity.find({ user_id: cur_user_id }),
// ]);

// const tweets = results[0];
// const cur_user_activity_docs = results[1];

// console.log(tweets.length);

// //   eslint-disable-next-line no-restricted-syntax
// for (const tweet of tweets) {
//   const tweet_promise =
//     filter_visible_tweets_and_set_user_interaction_field_in_tweets(
//       cur_user_activity_docs,
//       tweet,
//       cur_user_id
//     );

//   visible_tweets.push(tweet_promise);
// }

// visible_tweets = await Promise.all(visible_tweets);

// while (
//   (await visible_tweets.length) < 25 &&
//   visible_tweets !== 'no-docs-left'
// ) {
//   page++;
//   const more_tweets = await this.get_25_tweets(profile_user_id, page);
//   visible_tweets.push(...more_tweets);
// }

// visible_tweets = visible_tweets.map((el) => {
//   el.ts_format = format_time(el.ts);
//   return el;
// });}
