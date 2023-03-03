import { get } from '../api/api.js';
import { render_comments } from '../Components/Comment/posted_comment_controller.js';
/* eslint-disable camelcase */
const comment_section = document.querySelector('.section-comment');

if (comment_section) {
  if (document.documentElement.offsetWidth < 1200)
    comment_section.dataset.galleryMode = false;

  const comment_page_type = comment_section.dataset.pageType;
  comment_section.addEventListener('click', (e) => {
    if (e.target.closest('.btn--back')) {
      if (comment_page_type === 'tweet_and_comments') location.assign('/');
      else {
        const tweet_id =
          comment_section.querySelector('.comment-tweet').dataset.tweetId;

        location.assign(`/tweets/${tweet_id}/comments/normal`);
      }
    }

    if (e.target.closest('button[data-action="redirect-to-home-page"]'))
      location.assign('/');

    if (e.target.closest('button[data-action="full-screen"]'))
      comment_section.setAttribute('data-gallery-full-screen', true);

    if (e.target.closest('button[data-action="mini-screen"]'))
      comment_section.setAttribute('data-gallery-full-screen', false);
  });

  const tweet_comment_el = comment_section.querySelector('.comment-tweet');
  const body = document.documentElement;
  let page = 0;
  let loaded = false;
  let doc_available = true;

  // load tweet when scroll get to bottom of page
  const load_comments = async () => {
    if (
      body.scrollTop + body.clientHeight + 270 >
        document.documentElement.scrollHeight &&
      !loaded &&
      doc_available
    ) {
      loaded = true;
      page++;

      let url;

      if (comment_page_type === 'tweet_and_comments') {
        const { tweetId } = tweet_comment_el.dataset;
        url = `tweets/${tweetId}/comments/page/${page}/limit/25`;
      } else {
        const { commentId } = tweet_comment_el.dataset;
        url = `comments/${commentId}/page/${page}/limit/25`;
      }

      // data insert html then document.documentElement will update
      const res = await get(url);
      const docs = res.data.docs;
      if (docs.length < 25) doc_available = false;

      render_comments(docs);

      loaded = false;
    }
  };

  document.addEventListener('scroll', load_comments);
}
