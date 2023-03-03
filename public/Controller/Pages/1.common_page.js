window.addEventListener('scroll', () => {
  console.log('scroll');

  const height = document.documentElement.scrollHeight + 'px';
  document.querySelector('.main-content').style.height = height;
});

document.querySelector('.mobile-nav-btn')?.addEventListener('click', (e) => {
  document.querySelector('.mobile-nav').dataset.active = true;
});

window.addEventListener('resize', (e) => {
  console.log('resize');

  const main_content = document.querySelector('.main-content');
  const nav = document.querySelector('.nav__content');
  const sidebar = document.querySelector('.sidebar-content');

  const { left, right } = main_content.getBoundingClientRect();
  nav.style.left = left - 8 - nav.getBoundingClientRect().width + 'px';
  sidebar.style.left = right + 20 + 'px';
});

// export const load_docs_scroll_reach_page_end = (url,limit,doc_access_field,render_doc_func)=>{

//     const body = document.documentElement;
//     let page = 0;
//     let loaded = false;
//     let doc_available = true;

//     // load tweet when scroll get to bottom of page
//     const load_docs = async () => {
//         if (
//             body.scrollTop + body.clientHeight + 270 >
//             document.documentElement.scrollHeight &&
//     !loaded &&
//     doc_available
//   ) {
//       loaded = true;
//       page++;

//       // data insert html then document.documentElement will update
//       const res = await get(`tweets/recent/page/${page}`);
//       console.log(res);
//       const { recent_tweets } = res.data.docs.recent_tweets;
//       if (Object.keys(recent_tweets).length < 25) doc_available = false;

//       controlRenderPostedTweet(recent_tweets, true);

//       loaded = false;
//     }
// };

// document.addEventListener('scroll', load_docs);
// }
