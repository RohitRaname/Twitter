/* eslint-disable camelcase */
const try_catch = require('../../utils/tryCatchBlock');
const axios = require('axios');
const catchAsync = require('../../utils/catchAsync');
const sendReq = require('../../utils/sendJSON');

exports.format_news = (news) => {
  news.url =
    (news.description &&
      news.description
        .split(' ')
        .slice(0, 5)
        .map((word) => word.toLowerCase())
        .join('-')) ||
    news.title;

  // news.url = news.title;

  return {
    source: news.source.name,
    source_id: news.source.id,
    publishedAt: news.publishedAt,
    title: news.title,
    url: news.url,
    urlToImage: news.urlToImage,
    description:
      (news.description &&
        news.description.split(' ').slice(0, 10).join(' ')) ||
      news.title,
    content: (news.content && news.content.slice(0, 300)) || news.description,
  };
};

const get_news = try_catch(async (limit, category, page) => {
  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=${limit}&sortBy=popularity&page=${page}&apiKey=${process.env.NEWS_API}`;
  let news = await axios.get(url);
  if(news.data.status==="error") return false;

  news = news.data.articles.map((el) => this.format_news(el));

  return news;
},true);

// basic side news -----------------------------------------
exports.get_single_news = try_catch(async (index, category) => {
  const doc_arr = await get_news(4, category);
  if(!doc_arr) return false;
  return doc_arr.slice(index, index + 1)[0] ;
},true);

exports.get_multiple_news = try_catch(
  async (limit, category, page) => await get_news(limit, category, page)
);

exports.search_news = try_catch(async (category, word) => {
  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=1&sortBy=popularity&q=${word}&apiKey=${process.env.NEWS_API}`;
  let news = await axios.get(url);
  if(!news) return false;
  news = news.data.articles.map((el) => this.format_news(el));

  return news[0];
});

exports.api_get_multiple_news = catchAsync(async (req, res, next) => {
  const { page, category, limit } = req.params;
  const news = await this.get_multiple_news(limit, category, page || 0);
  return sendReq(res, 200, 'news', news);
});

exports.set_multiple_news_in_req = catchAsync(async (req, res, next) => {
  req.news = this.get_multiple_news(4,"business");
  next();
});

// types of news
