/* eslint-disable camelcase */
const mongoose = require('mongoose');
const try_catch = require('../../utils/tryCatchBlock');
const { get_multiple_news, search_news } = require('../news/news');

const {
  get_pinned_tweets,
  groupBy_multiple_or_single_tweets,
} = require('../user_activity/user_posted_tweet_bucket_controller');

const {get_user_profile_data}=require('../non_user_controller')

// new_user => non-login-user

exports.render_home_page = try_catch(async (req, res) => {
  const news = (await get_multiple_news(10, req.params.category, 0)) || [];

  return res.render('pages/non_login_user/home_page', {
    news_arr: news,
    category: req.params.category,
    non_login_user: true,
  });
});

exports.render_click_news = try_catch(async (req, res) => {
  const { category, search_word } = req.params;
  const news = await search_news(category, search_word);
  return res.render('pages/non_login_user/click_news_page', {
    news: news,
    category: req.params.category,
    non_login_user: true,
  });
});

exports.render_user_profile = try_catch(async (req, res, next) => {
  const { avatar } = req.params;

  const profile_user = await mongoose
    .model('user')
    .findOne({ avatar: `@${avatar}` })
    .exec();

  const profile_user_id = profile_user._id;

  const profile_user_pinned_tweet_id_arr =
    profile_user.pinned_tweet_id_arr || [];

  // check for block and mute case

  // pinned tweets
  let [pinned_tweets, side_news, to_follow_users] = await Promise.all([
    get_pinned_tweets(profile_user_pinned_tweet_id_arr),
    req.side_news,
    req.to_follow_users,
  ]);

  // tweets that user can see and set follow ,mute,like,bookmark,comment prop for by cur user


  const data= await get_user_profile_data(profile_user_id,0,profile_user_pinned_tweet_id_arr)

  const { tweets, page, only_tweet_with_upload_imgs_arr } = data;


   pinned_tweets = groupBy_multiple_or_single_tweets(
    pinned_tweets,
    (item) =>
      `${item.user_id}-${new Date(item.ts).getDay()}-${new Date(
        item.ts
      ).getHours()}-${new Date(item.ts).getMinutes()}-${new Date(
        item.ts
      ).getSeconds()}`
  );


  return res.render('pages/non_login_user/profile_page', {
    tweets: tweets || [],

    posted_tweet_page: page || 0,
    comment_page: 0,
    liked_tweet_page: 0,
    profile_user: profile_user,

    pinned_tweets: pinned_tweets,
    only_tweet_with_upload_imgs: only_tweet_with_upload_imgs_arr || [],

    side_news: side_news,
    to_follow_users: to_follow_users,

    // USER --------------------------
    restrict_profile_user: {
      avatar: profile_user.avatar,
      _id: profile_user._id,
      profilePic: profile_user.profilePic,
      name: profile_user.name,
    },

    ...req.restrict_user,

    section: 'user-profile',

    non_login_user: true,
  });
});
