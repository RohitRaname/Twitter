import {
  addClass,
  contains,
  removeClass,
  replaceClass,
} from '../../../utils/domHelper.js';
import AlertView from '../../Alert/AlertView.js';
import ChooseAudiencePreview from '../../Preview/1.ChooseAudiencePreview.js';
import ChoooseWhoCanReplyPreview from '../../Preview/2.chooseWhoCanReplyView.js';
// whenever a component is used twice we should make the component as common View for that component so another component just like can use the component

// Parent have all the method defined so that child can use all
class ParentCreateTweetView {
  _topParentEl;

  _parentEl;

  // imgs files arr => upload imgs;
  // _upload_img_files_arr;

  _textAreaEl;
  _percentageCircleControllerEl;

  _overlay;

  // BTNS -----------------------------------------------------------------
  _chooseAudienceBtn;
  _chooseWhoCanReplyBtn;
  _scheduleTweetBtn;
  _addMutlipleTweetBtn;

  _saveScheduleTweetBtn;

  _saveTweetBtn;

  // FORM -----------------------------------------------------------------
  _scheduleTweetForm;

  _createMutipleTweetsContainer;
  // INPUT ---------------------------------------------------------------
  _uploadImgInputEl;
  _uploadImgsMainContainerEl;

  _uploadImgsContainerEl;
  _uploadImgElsArr;

  _chooseAudienceBtnSpanEl;
  _chooseWhoCanReplyAudienceBtnSpanEl;

  // self defined -------------------------------------------
  _totalLength = 200;

  // _progress_line = this._topParentContainerEl.querySelector('.progress-line');

  // --------------------
  // CLASS
  _ScheduleView;

  setSomeOtherComponentClass() {}

  setUsedComponentClass() {
    // this._ScheduleView = new ScheduleTweetFormView();
    // this.setSomeOtherComponentClass();
  }

  setMoreDOMEls() {}

  _setDOMEls(target) {
    this._parentEl = target.closest('.form--createTweet');
    this.setMoreDOMEls(target);

    this._textAreaEl = this._parentEl.querySelector('.createTweet-textarea');

    this._saveTweetBtn = this._parentEl.querySelector(
      'button[data-action="save-tweet"]'
    );

    this._percentageCircleControllerEl =
      this._parentEl.querySelector('.circle');

    // this._overlay = this._parentEl.querySelector('.overlay');

    // BTNS -----------------------------------------------------------------
    this._chooseAudienceBtn = this._parentEl.querySelector(
      "button[data-action='choose-audience']"
    );

    this._chooseAudienceInput = this._chooseAudienceBtn?.querySelector('input');

    this._chooseWhoCanReplyBtn = this._parentEl.querySelector(
      "button[data-action='choose-whocan-reply']"
    );
    this._chooseWhoCanReplyInput =
      this._chooseWhoCanReplyBtn?.querySelector('input');

    this._scheduleTweetBtn = this._parentEl.querySelector(
      "button[data-action='schedule-post']"
    );
    this._addMutlipleTweetBtn = this._parentEl.querySelector(
      "button[data-action='add-another-tweet']"
    );

    this._saveScheduleTweetBtn = this._parentEl.querySelector(
      'button[data-action="save-schedule-tweet"]'
    );

    this._saveTweetBtn = this._parentEl.querySelector(
      "button[data-action='save-tweet']"
    );

    // FORM -----------------------------------------------------------------
    this._scheduleTweetForm = document.querySelector(
      '.form[data-action="schedule-post"]'
    );

    this._createMutipleTweetsContainer =
      document.querySelector('.createTweets');

    // INPUT ---------------------------------------------------------------

    this._tweet_type_input_el = this._parentEl.querySelector(
      'input[name="tweet_type"]'
    );

    this._uploadImgInputEl = this._parentEl.querySelector(
      'input[name="upload_image"]'
    );

    // OTHER --------------------------------------------------

    this._uploadImgsMainContainerEl = this._parentEl.querySelector(
      '.tweet-uploadImg__container'
    );

    this._uploadImgsContainerEl = this._parentEl.querySelector(
      '.tweet-uploadImg__content'
    );
    this._uploadImgElsArr = [
      ...this._uploadImgsContainerEl.querySelectorAll('.tweet-uploadImg'),
    ];

    this._scheduleTimingEl = this._parentEl.querySelector(
      '.createTweet-schedule-timing'
    );
    this._scheduleTimingSpanValueEl = this._parentEl.querySelector(
      '.createTweet-schedule-timing-value'
    );

    this._chooseAudienceBtnSpanEl =
      this._chooseAudienceBtn?.querySelector('span');
    this._chooseWhoCanReplyAudienceBtnSpanEl =
      this._chooseWhoCanReplyBtn?.querySelector('span');
  }



  emptyAllInputsValue(defer_img_files_remove = false) {
    // parent el
    this._parentEl.setAttribute('data-active', false);
    this._parentEl.setAttribute('data-tweet-schedule', false);
    this._parentEl.setAttribute('data-tweet-empty', true);

    // schedule timing label
    addClass(this._scheduleTimingEl, 'hidden');
    this._scheduleTimingSpanValueEl.value = '';

    // btns
    this._chooseAudienceBtn.dataset.active = false;
    this._chooseWhoCanReplyBtn.dataset.active = false;

    this._chooseAudienceBtn.className = 'btn--inline preview-parent';
    this._chooseWhoCanReplyBtn.className = 'btn--span preview-parent';

    this._chooseAudienceBtnSpanEl.textContent = 'Everyone';
    this._chooseWhoCanReplyAudienceBtnSpanEl.textContent = 'Everyone can reply';

    this._chooseWhoCanReplyBtn.disabled = false;

    this._chooseWhoCanReplyInput.value = 'everyone';
    this._chooseAudienceInput.value = 'everyone';

    this._textAreaEl.value = '';

    this._uploadImgsMainContainerEl.classList.add('hidden');
    this._uploadImgElsArr.forEach((el) => (el.src = ''));

    // percent complete circle
    this._percentageCircleControllerEl.setAttribute(
      'stroke-dasharray',
      `0,100`
    );

    if (defer_img_files_remove) return;
    // input values
    [...this._parentEl.querySelectorAll('input')].forEach(
      (el) => (el.value = '')
    );
    this._uploadImgInputEl.value = '';
    this._uploadImgInputEl.files = undefined;
    // img

    this._chooseAudienceInput.value = 'everyone';
    this._chooseWhoCanReplyInput.value = 'everyone';

    this._tweet_type_input_el.value = 'text';
  }

  // CSS ----------------------------------------
  _autoIncreaseTextareaHeight() {
    // this._textAreaEl.style.height =
    //   this._textAreaEl.clientHeight + this._textAreaEl.scrollTop + 'px';

    if (this._textAreaEl.dataset.scrollEvent === 'true') return;

    this._textAreaEl.dataset.scrollEvent = 'true';
    this._textAreaEl.addEventListener('scroll', function () {
      this.style.height = this.clientHeight + this.scrollTop + 'px';
    });
  }

  _showTextWordLimitAndEnableSubmitBtn() {
    if (this._textAreaEl.dataset.inputChangeEvent === 'true') return;

    this._textAreaEl.dataset.inputChangeEvent = 'true';

    this._textAreaEl.addEventListener('input', () => {
      const length = this._textAreaEl.value.trim().length;

      this._saveTweetBtn.disabled = length === 0 ? true : false;
      this._parentEl.dataset.tweetEmpty = length === 0 ? true : false;

      const percentage = Math.floor(((length || 0) / this._totalLength) * 100);
      this._percentageCircleControllerEl.setAttribute(
        'stroke-dasharray',
        `${percentage},100`
      );
    });
  }

  _getAllInputsValue(parentEl) {
    if (parentEl) this._parentEl = parentEl;

    const _textAreaEl = this._parentEl.querySelectorAll('textarea');
    const inputEls = this._parentEl.querySelectorAll('input');
    let data = [..._textAreaEl, ...inputEls];

    data = data.reduce((acc, input) => {
      if (input.value === 'undefined') return acc;

      if (input.name !== 'upload_image' && input.value && input.value !== '') {
        acc[input.name] = input.value;
        return acc;
      }

      if (input.name === 'upload_image') {
        // changing this to upload_imgs
        acc['upload_imgs'] = input.files || input.upload_imgs;
      }
      // acc[input.name] =input.value
      return acc;
    }, {});

    return data;
  }

  // Handle Btn $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
  _setUploadImgsAndshow(type, imgArrOptional = false) {
    // imgType => img or files

    this._parentEl.dataset.tweetEmpty = 'false';
    // this._upload_img_files_arr = [];

    // for multiple tweet to minimize text area height
    this._parentEl.setAttribute('data-tweet-img-set', true);

    this._saveTweetBtn.disabled = false;

    const img_files =
      type === 'files' ? [...this._uploadImgInputEl.files] : imgArrOptional;
    if (img_files.length > 4) new AlertView().render('Max no. of images is 4!');


    const limit_img_files = img_files.slice(0, 4);

    // this._uploadImgInputEl.dataset.files = JSON.stringify(limit_img_files);
    // this._upload_img_files_arr = limit_img_files;

    // displaying submit img by setting into img src
    limit_img_files.reduce((count, file, i) => {
      const imgEl = this._uploadImgElsArr[i];

      const imgParentEl = imgEl.closest('figure');

      removeClass(imgParentEl, 'hidden');
      // CSS
      imgEl.src =
        type === 'files' ? URL.createObjectURL(file) : `/img/tweet/${file}`;

      if (type === 'files') {
        imgEl.onload = function () {
          URL.revokeObjectURL(imgEl.src); // free memory
        };
      }
    }, 0);

    removeClass(this._uploadImgsMainContainerEl, 'hidden');

    this._uploadImgsContainerEl.dataset.items = limit_img_files.length;

    if (contains(this._parentEl, 'createTweets-item'))
      this.addAdditionalCodeToShowUploadImgFunc();

  }

  _handleUploadImg() {
    if (this._uploadImgInputEl.dataset.changeEvent === 'true') return;

    this._uploadImgInputEl.dataset.changeEvent = 'true';

    // adding img input files event
    this._uploadImgInputEl.addEventListener(
      'change',
      this._setUploadImgsAndshow.bind(this, 'files')
    );

    // editing the submit imgs
    this._uploadImgsContainerEl.addEventListener('click', (e) => {
      const removeImgBtn = e.target.closest('button[data-action="remove-img"]');
      if (!removeImgBtn) return;

      //  remove img
      const clickedImgFigEl = removeImgBtn.closest('figure');
      clickedImgFigEl.classList.add('hidden');

      // remove img from input files also
      const removeImgIndex = this._uploadImgElsArr.findIndex(
        (el) => el === clickedImgFigEl.querySelector('img')
      );

      // let imgFiles = JSON.parse(this._uploadImgInputEl.dataset.files);

      // this._upload_img_files_arr.splice(removeImgIndex, 1);

      // this._uploadImgInputEl.dataset.files = JSON.stringify(imgFiles);

      // get remaining images
      const remainingImg_count = [
        ...this._uploadImgsContainerEl.querySelectorAll('figure'),
      ].filter((el) => !el.classList.contains('hidden')).length;

      if (remainingImg_count === 0) {
        // this._upload_img_files_arr = [];
        addClass(this._uploadImgsMainContainerEl, 'hidden');
      }

      if (this._textAreaEl.value === 0) {
        this._parentEl.dataset.active = false;
        this._parentEl.dataset.tweetEmpty = true;
        this._saveTweetBtn.disabled = true;
      }

      // set new grid
      this._uploadImgsContainerEl.dataset.items = remainingImg_count;
    });
  }

  _handleScheduleTweetBtn(target) {
    const scheduleTweetBtn = target.closest(
      "button[data-action='schedule-post']"
    );

    if (!scheduleTweetBtn) return;
    if (scheduleTweetBtn.disabled) return;

    // // const View = new ScheduleTweetFormView();
    // this._ScheduleView.show();
    // this._ScheduleView.handleScheduleForm(this._parentEl);
    // this._ScheduleView.setScheduleDateLabel(new Date());
    // replaceClass(this._scheduleTweetForm, 'hidden', 'view');
  }
  _showTweetFullOptionsWhenUserClick() {
    this._parentEl.dataset.active = true;
  }

  // FUNCTION TO ADD ON OWN VIEW
  handleAddMultipleTweetsBtn() {
    // written in its own View Component
  }

  additionalHandleFuncs() {
  }

  // return current click tweet item el
  getTweetDataAsFormData(dataobj) {
    const data = dataobj ? dataobj : this._getAllInputsValue();
    
    data.post = data.schedule_post_time ? false : true;
    data.upload_imgs = [...data.upload_imgs];

    // check for draft tweet
    if (this._parentEl.dataset.tweetId)
    data.tweet_id = this._parentEl.dataset.tweetId;
    
    // setting upload_img
    // data.upload_imgs = this._upload_img_files_arr;
    
    // delete data.upload_image;

    const form_data = new FormData();

    // loop
    Object.keys(data).forEach((key) => {
      if (data[key] === null || data[key] === '' || data[key] === 'undefined')
        return;

      // if (key === 'upload_imgs') return;
      const value = data[key];
      if (typeof value === 'object') {
        value.forEach((el) => form_data.append(key, el));
      } else form_data.append(key, value);
    });

    // taking care of upload_imgs
    // if (data.upload_imgs && data.upload_imgs.length > 0)
    //   data.upload_imgs.forEach((img) => form_data.append('upload_imgs', img));

    return form_data;
  }

  // Submit data to db(single tweet)
  handleSaveTweet(target, handle) {
    const tweetBtn = target.closest('button[data-action="save-tweet"]');
    if (!tweetBtn) return;


    const form_data = this.getTweetDataAsFormData();
    const data = {};
    data.tweet_type = this._tweet_type_input_el.value;
    data.formdata = form_data;

    handle('save-tweet', data);
  }
  _handleSaveScheduleTweet(target, handle) {
    const btn = target.closest('button[data-action="save-schedule-tweet"]');
    if (!btn) return;
    const form_data = this.getTweetDataAsFormData();
    const data = {};
    data.tweet_type = this._tweet_type_input_el.value;
    data.formdata = form_data;

    handle('save-tweet', data);
  }




  // handle unsent tweet
  handleTweetTopParentEl(target) {}
  // API ***********************************************

  // addHandlerSubmitForm(handle) {
  //   this._saveTweetBtn.addEventListener('click', () => {
  //     const data = this._getAllInputsValue();
  //     // update user bio
  //     // then go to next page
  //   });
  // }

  handleTweet(handle) {
    this._topParentEl.addEventListener('click', (e) => {
      const target = e.target;

      ///////////////////////////////////////////////////////
      // - HANDLE TWEET ITEM PARENT EL => CREATETWEETS
      ///////////////////////////////////////////////////////
      this.handleTweetTopParentEl(target, handle);

      //////////////////////////////////////////////////////////
      // - HANDLE TWEET ITEM
      //////////////////////////////////////////////////////////
      if (!target.closest('.form--createTweet')) return;

      this._setDOMEls(target);

      // set some used class component

      this._showTweetFullOptionsWhenUserClick(target);

      // function which depend on click event
      // this._handleChooseTargetAudienceBtn(target);
      // this._handleChooseWhoCanReplyBtn(target);
      this._handleScheduleTweetBtn(target);

      // function depend on other event
      // so need to check if they are already add or not
      this._autoIncreaseTextareaHeight();
      this._showTextWordLimitAndEnableSubmitBtn();
      this._handleUploadImg();

      // HANDLE FUNCTION TO ADD ON OWN COMPONENT VIEW
      this.handleSaveTweet(target, handle);
      this.handleAddMultipleTweetsBtn(target, handle);
      this._handleSaveScheduleTweet(target, handle);
      this.additionalHandleFuncs(target, handle);
    });
  }
}

export default ParentCreateTweetView;
