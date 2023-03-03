import { get } from '../api/api.js';
import { controlRenderPostedTweet } from '../Components/Tweet/postedTweetController.js';

const section_home = document.querySelector('.section-home');

if (section_home) {
  const body = document.documentElement;
  let page = 0;
  let loaded = false;
  let doc_available = true;

  // load tweet when scroll get to bottom of page
  const load_tweets = async () => {
    if (
      body.scrollTop + body.clientHeight + 270 >
        document.documentElement.scrollHeight &&
      !loaded &&
      doc_available
    ) {
      loaded = true;
      page++;

      // data insert html then document.documentElement will update
      const res = await get(`tweets/recent/page/${page}`);
      const { recent_tweets } = res.data.docs.recent_tweets;
      if (Object.keys(recent_tweets).length < 25) doc_available = false;

      controlRenderPostedTweet(recent_tweets, true);

      loaded = false;
    }
  };

  document.addEventListener('scroll', load_tweets);
}
