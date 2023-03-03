class ParentPreview {
  // previewParentEl
  _parentEl;

  //   defined here --------------
  _parentBtn;
  _parentTextEl;
  _parentInputEl;

  _hide() {
    // this._parentBtn.dataset.active = false;
  }

  _hideOtherPreviewExceptCurOne() {
    const previewElsArr = [...document.querySelectorAll('.preview')];
    previewElsArr.forEach((el) => {
      if (el.dataset.type !== this._parentEl.dataset.type)
        el.closest('.preview-parent')
          ? (el.closest('.preview-parent').dataset.active = false)
          : '';
    });
  }

  _setDOMEls() {
    this._parentBtn = this._parentEl.closest('.preview-parent');
    this._parentTextEl = this._parentBtn.querySelector('.preview-parent-text');
    this._parentInputEl = this._parentBtn.querySelector(
      '.preview-parent-input'
    );
  }

  _set_item_active(el) {
    const cur_preview_item = el.closest('.preview-item');
    [...this._parentEl.querySelectorAll('.preview-item')].forEach((el) => {
      if (el !== cur_preview_item) return (el.dataset.active = false);
      el.dataset.active = true;
    });
  }

  handleAdditionalFunc() {}

  // // topParentFormEL will the create-Tweet form in which the preview exist
  // handlePreview(handle, ) {
  //   // this._parentEl = topParentFormEl.querySelector(this._parentElSelector);
  //   // // preventing addEvent to not add twice in one el

  //   // if (this._parentEl.dataset.clickEvent === 'true') return;
  //   // this._parentEl.dataset.clickEvent = 'true';
  //   document.addEventListener('click', (e) => {

  //     const target = e.target;

  //   if(  !this._target_checker(target)) return;

  //     this._set_item_active(target);

  //     this._hideOtherPreviewExceptCurOne();

  //     this._setDOMEls();

  //     this.handleAdditionalFunc(handle, target);

  //     // //  open new component from preview
  //     // if (target.closest('.preview-open-component')) {
  //     //   const { action } = target.closest('.preview-open-component').dataset;
  //     //   this._hide();
  //     //   return handle(action);
  //     // }

  //     // Select item and set value;
  //     const preview_item = target.closest('.preview-item');
  //     if (!preview_item) return;

  //     const { value } = preview_item.dataset;
  //     this._parentTextEl.textContent = value;
  //     this._parentInputEl.value = value;

  //     this._hide();
  //   });
  // }
}

export default ParentPreview;
