
/* eslint-disable camelcase */
const section_message = document.querySelector('.message-content');

if (section_message) {
  const main_container = document.querySelector('.main-container');
  document.documentElement.style.overflowY = 'hidden';

  // phone queries we dont show users and message side by side
  if (document.documentElement.offsetWidth < 1000)
    document.querySelector('body').dataset.is_chat_users_list_page_showing= 'true';
  //   const main_content = document.querySelector('.main-content');

  //   main_content.style.left =
  //     nav.offsetLeft + nav.getBoundingClientRect().width + 'px';

  main_container.dataset.page = 'message';
}
