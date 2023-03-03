import { update_modal } from '../Controller/Components/Modal/customize_twitter_modal_controller.js';

const apply_user_customization = () => {
  let { user_customization } = document.querySelector('body').dataset;

  if(!user_customization || user_customization ==="undefined") return;
  user_customization = JSON.parse(user_customization);

  // applying data on DOM
  const { color, font_size, theme } = user_customization;
  const body = document.documentElement;
  body.setAttribute('data-color', color);
  body.setAttribute('data-theme', theme);
  body.style.fontSize = font_size;

  // now apply customization on customization modal
  update_modal(user_customization);

  setTimeout(() => document.documentElement.classList.remove('waitload'), 1500);
};

apply_user_customization();
