import ModalView from '../../Common/ModalView.js';
class explore_view {
  _parentel = document.querySelector('.explore-news');
  _news_type_section = this._parentel.querySelector(
    '.modal-change-section-btns'
  );
  _new_list_container = this._parentel.querySelector('.modal-container');
  _search_dropdown = document
    .querySelector('.section-explore-news')
    .querySelector('.search-dropdown');
  _hide_search_dropdown_btn = document
    .querySelector('.section-explore-news')
    .querySelector('button[data-action="hide-dropdown"]');

  constructor() {
    this._click_on_hide_dropdown_btn();
  }

  // phone media query => show hide btn as dropdown covers the fullpage
  _click_on_hide_dropdown_btn(target) {
    this._hide_search_dropdown_btn?.addEventListener('click', () => {
      this._search_dropdown.dataset.active = false;
      document
        .querySelector('body')
        .setAttribute('data-show_search_dropdown', false);
    });
  }

  _get_current_category() {
    return this._parentel.querySelector('.modal-section').dataset.section;
  }
  _get_current_page() {
    return this._parentel.querySelector('.modal-section').dataset.page;
  }

  render_section(arr_data, page = 1) {
    const modal_section = this._parentel.querySelector('.modal-section');
    const modal_list = this._parentel.querySelector('.modal-list');
    modal_section.dataset.page = page;

    const list_markup = arr_data
      .map(
        (el, i) => `
      <li class="preview-item" >
        <div class="preview-details"><div class="preview-extra">${el.source}</div>
          <div class="preview-title">${el.description}</div>
        </div>
          <div class="preview-upload-img">
          <img src=${el.urlToImage} alt=""></div>
      </li>
      `
      )
      .join(' ');

    modal_list.insertAdjacentHTML('beforeend', list_markup);
  }

  // click on section btn
  _change_news_category(target, handle) {
    const btn = target.closest('[data-btn]');
    if (!btn) return;

    if (btn.dataset.active === 'true') return;
    const { section } = btn.dataset;

    // // active click btn
    const all_btns = [...this._parentel.querySelectorAll('[data-btn]')];
    all_btns.forEach((el) => {
      if (el === btn) {
        el.dataset.active = true;
        return;
      }
      el.dataset.active = false;
    });

    // // display correct section
    const current_section = this._parentel.querySelector(
      `.modal-section[data-section=${section}]`
    );

    // const all_sections = [...this._parentel.querySelectorAll('.modal-section')];
    // all_sections.forEach((el) => {
    //   if (el === current_section) {
    //     el.classList.remove('hidden');
    //     return;
    //   } else el.classList.add('hidden');
    // });

    // check section is data-news-set
    const section_news_set =
      current_section && current_section.getAttribute('data-news-set');

    if (section_news_set === 'true') return;

    handle('change-news-category', { category: section });
  }

  _click_on_news_item(target, handle) {
    if (!target.closest('.preview-item')) return;
    const { section } = target.closest('section').dataset;
    const { word } = target.closest('.preview-item').dataset;
    handle('show-click-news', { category: section, word: word });
  }

  handle_news_section(handle) {
    this._parentel.addEventListener('click', (e) => {
      const target = e.target;
      this._change_news_category(target, handle);
      this._click_on_news_item(target, handle);
    });
  }

  // load more news
  load_more_news(handle) {
    let load = false;
    const current_category = this._get_current_category();

    document.addEventListener('scroll', async () => {
      if (
        document.documentElement.scrollTop +
          document.documentElement.clientHeight +
          270 >
          document.documentElement.scrollHeight &&
        !load
      ) {
        load = true;
        let page = Number(this._get_current_page()) + 1;
        if (page === 1) page = 2;

        const docs = await handle('load-more-news', {
          category: current_category,
          page: page,
        });
        this.render_section(docs, page);

        load = false;
      }
    });
  }
}

export default explore_view;
