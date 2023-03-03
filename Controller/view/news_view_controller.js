/* eslint-disable camelcase */
const catchAsync = require('../../utils/catchAsync');
const {
  get_single_news,
  get_multiple_news,
  search_news,
} = require('../news/news');

exports.render_news_page = catchAsync(async (req, res) => {
  const { index } = req.params;
  const [news, to_follow_users] = await Promise.all([
    get_single_news(Number(index)),
    req.to_follow_users,
  ]);
  return res.render('pages/news_page', {
    news: news,
    to_follow_users,
    login_user: req.login_user,
  });
});
exports.render_search_news = catchAsync(async (req, res) => {
  const { category, search_word } = req.params;

  const [news, side_news, to_follow_users] = await Promise.all([
    search_news(category, search_word),
    req.side_news,
    req.to_follow_users,
  ]);
  return res.render('pages/news_page', {
    news: news,
    category: category,
    side_news,
    to_follow_users,
    login_user: req.login_user,
    ...req.restrict_user,
  });
});

// here we see the category
exports.render_explore_news = catchAsync(async (req, res) => {
  const { category } = req.params;

  const [news, to_follow_users] = await Promise.all([
    get_multiple_news(10, category || 'general', 0),
    req.to_follow_users,
  ]);
  return res.render('pages/explore_page', {
    news_arr: news,
    category: category,
    ...req.restrict_user,
    to_follow_users,
    login_user: req.login_user,
    page:"explore-news"

  });
});
