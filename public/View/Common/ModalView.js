import { contains, replaceClass } from '../utils/domHelper.js';

class ModalView {
  _parentEl;
  _parentElNoOfSections;
  _currentActiveSectionEl;
  _deleteBtn;

  _view_user_id;
  _modal_container;

  hide() {
    replaceClass(this._parentEl, 'view', 'hidden');

    this.reset();
    document.documentElement.style.overflowY = 'unset';
  }

  show(section) {
    replaceClass(this._parentEl, 'hidden', 'view');
    // this._parentEl.classList.remove('hide');
    document.documentElement.style.overflowY = 'hidden';

    if (!section) return;

    [...this._parentEl.querySelectorAll('section')].forEach((el) => {
      if (el.dataset.section === section)
        el.classList.replace('hidden', 'display');
      else el.classList.replace('display', 'hidden');
    });

    [
      ...this._parentEl.querySelectorAll(
        'button[data-btn="change-section-btn"]'
      ),
    ].forEach((el) => {
      if (el.dataset.section === section) el.dataset.active = true;
      else el.dataset.active = false;
    });
  }

  render(section, doc_arr, first_section = false, clear_html = true) {
    const insert_list_el = this._parentEl
      .querySelector(`section[data-section=${section}]`)
      .querySelector('.modal-list');

    if (clear_html) insert_list_el.innerHTML = '';
    const html = doc_arr
      .map((doc) => this._generate_markUp(doc, first_section))
      .join('');
    insert_list_el.insertAdjacentHTML('afterbegin', html);
  }

  add_item_to_section_list(section, item, remove_btn) {
    const section_list = this._parentEl
      .querySelector(`section[data-section=${section}]`)
      .querySelector('.modal-list');
    const item_html = this._generate_markUp(item.dataset, remove_btn);
    section_list.insertAdjacentHTML('afterbegin', item_html);
  }

  _handleBackBtn(target, handle) {
    const btn = target.closest('button[data-action="back"]');
    if (!btn) return;
    this.hide();
  }

  _getCurSectionAllItemEls() {
    return [...this._currentActiveSectionEl.querySelectorAll('.modal-item')];
  }

  _getCurActiveSectionEl() {
    return this._sectionElArr.filter((el) => contains(el, 'display'))[0];
  }

  _getCurSectionAllActiveItemEls() {
    return [
      ...this._currentActiveSectionEl.querySelectorAll(
        '.modal-item[data-active="true"]'
      ),
    ];
  }

  //
  handleSelectItems(target, handle) {}

  hideModalWhenOverlayIsClicked(target, handle) {
    if (!target.closest('.overlay')) return;

    // this.hide();
    this.hide();
  }

  reset() {}

  _handleChangeSectionBtns(target, handle) {
    const btn = target.closest('button[data-btn="change-section-btn"]');
    if (!btn) return;

    const { section } = btn.dataset;

    handle('redirect-to-section', {
      section: section,
      user_id: this._view_user_id,
    });

    // active click section
    this._sectionElArr.forEach((el) => {
      if (el.dataset.section === section) replaceClass(el, 'hidden', 'display');
      else replaceClass(el, 'display', 'hidden');
    });

    // active click btn
    this._changeSectionBtnArr.forEach((el) => {
      if (el !== btn) el.dataset.active = false;
      else btn.dataset.active = true;
    });

    // unactive previous section item els
    // this.reset();
  }

  _setDOMEls() {
    // no of sections
    this._parentElNoOfSections = this._parentEl.dataset.sections;

    this._modal_container = this._parentEl.querySelector('.modal-container');

    this._sectionElArr = [...this._parentEl.querySelectorAll('.modal-section')];

    this._changeSectionBtnArr = [
      ...this._parentEl.querySelectorAll(
        'button[data-btn="change-section-btn"]'
      ),
    ];

    // current display section
    this._currentActiveSectionEl = this._parentEl.querySelector(
      '.modal-section.display'
    );

    this._deleteBtn = this._parentEl.querySelector(
      'button[data-action="delete"]'
    );

    this._selectAllBtn = this._parentEl.querySelector(
      'button[data-action="select-all"]'
    );
    this._unSelectAllBtn = this._parentEl.querySelector(
      'button[data-action="unselect-all"]'
    );
  }

  setClass() {}

  handleAdditionalFuncs() {}

  // load like 12 users at a time when scrolling
  load_more_docs(handle) {
    this._modal_container.addEventListener('scroll', async () => {
      const current_sectionel = this._getCurActiveSectionEl();
      const current_section = current_sectionel.dataset.section;

      let { noMoreDocs, page, docsLoading } = current_sectionel.dataset;

      if (noMoreDocs === 'true' || docsLoading === 'true') return;

      if (
        this._modal_container.scrollHeight >
          this._modal_container.clientHeight &&
        docsLoading === 'false'
      ) {
        page = Number(page) + 1;
        current_sectionel.setAttribute('data-page', page);
        current_sectionel.setAttribute('data-docs-loading', true);

        const first_section =
          this._parentEl.querySelector('.modal-section').dataset.section;

        const is_first_section = first_section === current_section;

        const docs = await handle('load-more-docs', current_sectionel.dataset);

        if (docs.length === 0)
          current_sectionel.setAttribute('data-no-more-docs', true);

        this.render(current_section, docs, is_first_section, false);

        current_sectionel.setAttribute('data-docs-loading', false);
      }
    });
  }

  handleModal(handle) {
    this._setDOMEls();

    this._parentEl.addEventListener('click', (e) => {
      const target = e.target;

      this._setDOMEls();

      this._handleChangeSectionBtns(target, handle);

      this.hideModalWhenOverlayIsClicked(target, handle);

      // handle backbtns
      this._handleBackBtn(target, handle);

      this.handleSelectItems(target, handle);

      this.handleAdditionalFuncs(target, handle);

      // change between section

      // select all btn

      // delete btn
    });
  }
}

export default ModalView;
