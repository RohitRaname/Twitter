import { get } from '../api/api.js';
import { render_section_docs } from '../Components/user_profile/user_profile_controller.js';

const section_home = document.querySelector('.section-user-profile');

if (section_home) {
  const body = document.documentElement;
  let loaded = false;

  // load tweet when scroll get to bottom of page
  const load_tweets = async () => {
    const current_active_section = section_home
      .querySelector('.modal-change-section-btns').querySelector('button[data-active="true"]').dataset.section;

    const current_section_list = section_home.querySelector(
      `.post-list[data-type="${current_active_section}"]`
    );

    const no_more_docs_left = current_section_list.getAttribute(
      'data-no-more-tweets'
    );

    if (no_more_docs_left === 'true') return;

    const profile_user = JSON.parse(section_home.dataset.profileUser);

    if (
      body.scrollTop + body.clientHeight + 270 >
        document.documentElement.scrollHeight &&
      !loaded
    ) {
      loaded = true;

      const current_section_page_no = Number(current_section_list.dataset.page);
      const newPage = current_section_page_no + 1;

      const data = {
        section: current_active_section,
        profile_user: profile_user,
        section_page: newPage,
      };

      current_section_list.dataset.page = newPage;
      // data insert html then document.documentElement will update
      const docs = await render_section_docs(data);

      if (!docs || docs.length === 0)
        current_section_list.setAttribute('data-no-more-tweets', 'true');

      loaded = false;
    }
  };

  document.addEventListener('scroll', load_tweets);
}
