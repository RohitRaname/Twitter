import create_single_post_view from './create_single_post_view.js';

import AlertView from '../Components/Alert/AlertView.js';

class create_multiple_post_view extends create_single_post_view {
  _topParentEl;
  _topParentContainerEl;

  _progress_line;

  _tweetListEl;
  _overlay;
  _saveAllTweetsBtn;

  _save_tweet_popup = document.querySelector(
    '.popup[data-action="save-tweet"]'
  );
  _unsent_tweet_modal = document.querySelector(
    '.modal[data-modal="unsent-tweets"]'
  );

  _unsent_tweet_btn;
  multiple_post_form=true


  // CLASS __________________________________
  _DiscardTweetPopupView;
  _SaveMultiTweetPopupView;

  constructor() {
    super();
    this._hideParentWhenOverlayIsClicked();
  }

  // create markup

  // text, schedule, retweet, comment
  generate_tweet_markUp(first_tweet_item, tweet, cur_user, tweet_num) {
    let html, posted_tweet_html, quote_html;
    let {
      // my response field
      tweet_type,
      text,
      audience_can_reply,
      schedule_post_time,
      target_audience,
      upload_imgs,

      // response to tweet => quote or comment tweet
      posted_tweet,

      // comment-tweet

      // qoute-tweet

      // posted tweet => quote tweet or comment tweet case
    } = tweet;

    // set basic field
    target_audience = target_audience ? target_audience : 'everyone';
    audience_can_reply = audience_can_reply ? audience_can_reply : 'everyone';

    const img_files = upload_imgs ? [...upload_imgs] : [];

    if (tweet_type === 'comment') {
      const posted_user = posted_tweet.user;
      posted_tweet_html = ` 
         <div class="tweet postedTweet" data-comment-avatar=${
           posted_user.avatar
         }>
            <div class="tweet-container tweet-reply-content tweet-line"><img class="tweet-img img--md" src="/img/users/${
              posted_user.profilePic || 'default.png'
            }"/>
              <div class="tweet-content tweet-reply-detail">
                <div class="tweet-user__info preview-item" data-no-hover-change="">
                  <p class="tweet-user__name ">${posted_user.name}</p>
                  <p class="tweet-user__verified"></p>
                  <p class="tweet-user__email t--md">${posted_user.avatar}</p>
                  <p class="tweet-user__postTime t--md ">${
                    posted_tweet.ts_format || ''
                  }</p>
                </div>
                <p class="p--md mg-sm">${posted_tweet.text}</p>
                <div class="tweet-message mg-lw t--md">Replying to <span class="blue"> ${
                  posted_tweet.reply_to || posted_tweet.user.avatar
                } </span></div>
              </div>
            </div>
        </div>`;
    }

    if (tweet_type === 'quote') {
      quote_html = `
            <article class="quotetweet-posted-tweet p-sm" data-tweet-id=${
              posted_tweet._id
            }><img class="tweet-img img--lw" src="../../img/users/${
        posted_tweet.user.profilePic || 'default.png'
      }" />
                <div class="tweet-content">
                    <div class="tweet-user__info f-sl f-3">
                      <p class="tweet-user__name h-8 mg-0" href="">${
                        posted_tweet.user.name
                      }</p>
                      <p class="tweet-user__verified"></p>
                      <p class="tweet-user__email t--md" href="/">${
                        posted_tweet.user.avatar
                      }</p>
                      <p class="tweet-user__postTime t--md">${
                        posted_tweet.ts_format
                      }</p>
                    </div>
                  </div>
                  <div class="tweet-message p--md">
                   ${posted_tweet.text}
                </div>
          </article>
              `;
    }

    html = `
    <form
      class="form form--createTweet createTweets-item "
      onsubmit="return false;"
      data-action="create-tweet"
      data-active="true"
      data-tweet-schedule=${schedule_post_time ? true : false}
      data-tweet-type=${tweet_type}
      data-tweet-empty="${text ? false : true}"
      data-tweet-new="${
        first_tweet_item ? false : true
      }"                           
      data-tweet-in-use="true"
      data-tweet-mini="${false}"
      data-tweet-num="${tweet_num + 1}"
      data-tweet-img-set="false"
      data-hide-tweet-track-line="${first_tweet_item ? true : false}"


      data-posted-tweet=${JSON.stringify(posted_tweet)}
    >

      ${tweet_type === 'comment' ? posted_tweet_html : ''}

    <div class="createTweet">
      <input type="text" name="tweet_type" class="hidden" value=${tweet_type}>
      
      <input type="text" name="tweet_id" placeholder="tweet_id will be present when tweet is draft_tweet or schedule_tweet and now we are posting it" class="hidden" value=${
        tweet._id
      }>

      <input type="text" name="tweet_previous_type" placeholder="when tweet is draft_tweet or schedule_tweet and now we are posting it" class="hidden" value=${
        tweet.tweet_previous_type
      }>


      <button class="btn--icon-color hidden" data-action="remove-tweet">
          <i class="fa fa-times" aria-hidden="true"></i>
        </button>
        <div class="createTweet-container">
          <a href="/me"
            ><img
              class="createTweet-user__img img--md"
              src="../../img/users/${cur_user.profilePic || 'default.png'}"
              alt="user photo"
          /></a>
          <div class="createTweet-schedule-timing t--sm f-sm f-3 ${
            schedule_post_time ? '' : 'hidden'
          }">
            <i class="fas fa-calendar" aria-hidden="true"></i>
            <p>Will send on<span class="createTweet-schedule-timing-value">${new Date(
              schedule_post_time
            ).toLocaleString()}</span></p>
          </div>
          <button
            class="btn--inline preview-parent  ${
              first_tweet_item ? '' : 'hidden'
            }  ${
      target_audience === 'everyone'
        ? 'btn--inline-primary'
        : 'btn--inline-secondary'
    }"
            data-action="choose-audience"
            data-active="false"
          >
            <span class="preview-parent-text">${
              target_audience || 'everyone'
            }</span
            ><input
              class="hidden preview-parent-input"
              type="text"
              name="target_audience"
              value="${target_audience || 'everyone'}"
            /><i class="fas fa-angle-down" aria-hidden="true"></i>
          </button>
          <header class="createTweet-header mg-v-sl">
            <div class="form-group mg-lw">
              <textarea
                class="createTweet-textarea"
                placeholder="${
                  tweet_type === 'text' || tweet_type === 'schedule'
                    ? "What's happening?"
                    : tweet_type === 'comment'
                    ? 'Tweet your reply'
                    : 'Add another comment'
                }"
                data-scroll-event="false"
                data-input-change-event="false"
                name="text"
                maxlength="200"
                value=${text || ''}
              >${text || ''}</textarea>
            </div>
            <div class="tweet-uploadImg__container mg-lw hidden">
              <div class="tweet-uploadImg__content grid--collage" data-items=${
                upload_imgs?.length || 0
              }>

              ${[0, 1, 2, 3]
                .map((i) => {
                  if (img_files[i])
                    return `
                  <figure class="tweet-uploadImg__fig ">
                      <button class="btn--icon-dull pos-tl" data-action="remove-img">
                      <i class="fa fa-times" aria-hidden="true"></i></button
                      ><img class="tweet-uploadImg" src=${
                        typeof upload_imgs[i] === 'object'
                          ? URL.createObjectURL(upload_imgs[i])
                          : upload_imgs[i]
                      } alt="" />
                  </figure>`;

                  return `              
                  <figure class="tweet-uploadImg__fig hidden">
                      <button class="btn--icon-dull pos-tl" data-action="remove-img">
                      <i class="fa fa-times" aria-hidden="true"></i></button
                      ><img class="tweet-uploadImg" src="" alt="" />
                  </figure>`;
                })
                .join('')}

      
              </div>
            </div>


            
            ${tweet_type === 'quote' ? quote_html : ''}


            <button
              class="btn--span preview-parent"
              data-action="choose-whocan-reply"
              data-active="false"
              data-restrict="${audience_can_reply === 'circle' ? true : false}"
            >
              <i class="fas fa-globe-americas" aria-hidden="true"></i
              ><i class="hidden fas fa-lock" aria-hidden="true"> </i
              ><span class="preview-parent-text">${
                audience_can_reply || 'Everyone'
              } can reply</span
              ><input
                class="hidden preview-parent-input"
                type="text"
                name="audience_can_reply"
                value="${audience_can_reply || 'everyone'}"
              />
            </button>
            <div class="line-col-end line-dim">&nbsp;</div>
          </header>
          <footer class="createTweet-footer">
            <div class="createTweet-btns">
              <button class="createTweet-btn btn--icon-color" data-action="add-img">
                <label for="tweet-upload-image-${tweet_num + 1}"></label
                ><i class="fa fa-file-image-o" aria-hidden="true"></i
                ><input
                  class="createTweet-input hidden"
                  id="tweet-upload-image-${tweet_num + 1}"
                  type="file"
                  accept="image/*"
                  data-change-event="false"
                  name="upload_image"
                  multiple=""
                  value="${
                    upload_imgs &&
                    upload_imgs.length > 0 &&
                    typeof upload_imgs[0] === 'string'
                      ? upload_imgs
                      : ''
                  }"
                /></button
              ><button
                class="createTweet-btn btn--icon-color"
                data-action="schedule-post"
                disable=""
              >
                <label><i class="fa fa-clock-o" aria-hidden="true"></i></label
                ><input class="createTweet-input hidden" type="text"  value=${schedule_post_time} name="schedule_post_time" />
              </button>
            </div>
            <div class="createTweet-btns createTweet-btns--submit">
              <button class="btn--percent-box" data-action="tweet-text-limit">
                <div class="flex-wrapper">
                  <div class="single-chart">
                    <svg class="circular-chart orange" viewBox="0 0 36 36">
                      <path
                        class="circle-bg"
                        d="M18 2.0845                                                    a 15.9155 15.9155 0 0 1 0 31.831                                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                      ></path>
                      <path
                        class="circle"
                        stroke-dasharray="2, 100"
                        d="M18 2.0845                                                    a 15.9155 15.9155 0 0 1 0 31.831                                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                      ></path>
                    </svg>
                  </div>
                </div>
              </button>
              <div class="line-v"></div>
              <button class="btn--icon-color" data-action="add-another-tweet" ${
                tweet_type === 'comment' ? 'hidden' : ''
              }>
                <i class="fa fa-plus" aria-hidden="true"></i></button
              ><button
                class="btn--primary btn--sm"
                data-action="save-tweet"
                ${text ? '' : 'disabled'}
              >
              ${tweet_type === 'comment' ? 'Reply' : 'Tweet'}</button
              ><button
                class="btn--primary hidden btn--sm hidden"
                data-action="save-all-tweets"
              >
                Tweet all</button
              ><button
                class="btn--primary btn--sm hidden"
                data-action="save-schedule-tweet"
              >
                Schedule
              </button>
            </div>
          </footer>
        </div>
    </div>
  </form>
  `;

    return html;
  }

  // insert new tweet in tweet list and also check for if it is first tweet(then activate schedule timer btn )
  insert_tweet_in_multiple_tweets_list(
    tweet,
    first_tweet_item = false,
    clear_html
  ) {
    const tweets_present_count = this._getTotalCountOfTweetItemInUse();

    const cur_user = JSON.parse(
      document.querySelector('.section').dataset.curUser
    );

    const html = this.generate_tweet_markUp(
      first_tweet_item,
      tweet,
      cur_user,
      tweets_present_count
    );

    if (clear_html) this._tweetListEl.innerHTML = '';

    this._tweetListEl.insertAdjacentHTML('beforeend', html);

    // if tweet item is first
    this._toggle_schedule_timer_btn();
    this._setDOMEls(
      this._topParentContainerEl.querySelector('.createTweets-item')
    );

    // if we are comment on comment then we need to hide hide_unsent_tweet_btn_and_schedule_tweet_btn

    // if (tweet.hide_unsent_tweet_btn_and_schedule_tweet_btn) {
    //   this._unsent_tweet_btn.remove();
    //   this._parentEl.querySelector(
    //     'button[data-action="schedule-post"]'
    //   ).style.display = 'none';
    // }
  }

  setSomeOtherComponentClass() {
    // this._DiscardTweetPopupView = new DiscardTweetPopupView();
    // this._SaveMultiTweetPopupView = new SaveMultiTweetPopupView();
  }

  setMoreDOMEls() {
    this._saveAllTweetsBtn = this._parentEl.querySelector(
      'button[data-action="save-all-tweets"]'
    );
  }

  _hide() {
    document.documentElement.style.overflowY = 'unset';
    this._tweetListEl.innerHTML = '';
    this._topParentEl.classList.replace('view', 'hidden');
    this._progress_line.setAttribute('data-progress-state', 'initial');
  }
  _show() {
    document.documentElement.style.overflowY = 'hidden';
    this._topParentEl.classList.replace('hidden', 'view');
  }

  clear_all_tweet_items() {
    this._tweetListEl.innnerHTML = '';
  }

  _getAllTweetItems() {
    return [...this._topParentEl.querySelectorAll('.createTweets-item')];
  }

  _getTotalCountOfTweetItemInUse() {
    return this._getAllTweetItems().filter(
      (el) => el.dataset.tweetInUse === 'true'
    ).length;
  }

  _getCurrentActiveTweetItem() {
    return this._topParentEl.querySelector(
      '.createTweets-item[data-active="true"]'
    );
  }

  _setDatasetObjInEl(tweet_item, dataset_obj) {
    Object.keys(dataset_obj).forEach((key) => {
      tweet_item.dataset[key] = dataset_obj[key];
    });
  }

  _setTweetItemActive(cur_tweet_item) {
    const dataset = {
      active: true,
      tweetMini: false,
      tweetInUse: true,
      // hideTweetTrackLine: false,
    };
    this._setDOMEls(cur_tweet_item);

    this._setDatasetObjInEl(cur_tweet_item, dataset);

    this._getAllTweetItems().forEach((el) => {
      if (el !== cur_tweet_item) {
        el.dataset.active = false;
        el.dataset.tweetMini = true;
        el.dataset.hideTweetTrackLine = false;
      }
    });

    //////////////////////////////////////////////////////////////////////////////////
    // hide last active tweet item track line
    const lastTweetItemInUseEl = [
      ...this._topParentContainerEl.querySelectorAll(
        '.createTweets-item[data-tweet-in-use="true"]'
      ),
    ].slice(-1)[0];

    cur_tweet_item.dataset.hideTweetTrackLine =
      lastTweetItemInUseEl === cur_tweet_item;

    cur_tweet_item.classList.remove('hidden');
  }

  _active_tweet_when_clicked(target, optionalItem = false) {
    if (target.closest('button[data-action="add-another-tweet"]')) return;
    const tweet_item = optionalItem
      ? optionalItem
      : target.closest('.createTweets-item');
    if (!tweet_item && !optionalItem) return;

    this._setTweetItemActive(tweet_item);
  }

  _switchBwTweetBtnAndTweetAllBtn() {
    // this._tweetListEl.dataset.multipleTweets =
    //   this._getTotalCountOfTweetItemInUse() > 1 ? 'true' : 'false';

    // this._tweetListEl.dataset.multipleTweets
    //   ? this._saveAllTweetsBtn.removeAttribute('disabled')
    //   : this._saveAllTweetsBtn.setAttribute('disabled');
  }

  _hideParentWhenOverlayIsClicked() {
    if (!this._overlay) return;
    this._overlay.addEventListener('click', () => {
      // return this._DiscardTweetPopupView.show();

      this._hide();
      // this.emptyAllInputsValue();
    });
  }

  _remove_tweet_item(target) {
    const removeTweetItemBtn = target.closest(
      'button[data-action="remove-tweet"]'
    );
    if (!removeTweetItemBtn) return;

    // remove tweet
    const to_be_remove_tweet_item =
      removeTweetItemBtn.closest('.createTweets-item');
    to_be_remove_tweet_item.remove();

    const last_tweet_item = this._getAllTweetItems().slice(-1)[0];

    this._setTweetItemActive(last_tweet_item);

    // if tweet is one left then set list multiple-tweets attribute to false
    if (this._getTotalCountOfTweetItemInUse() === 1) {
      this._tweetListEl.dataset.multipleTweets = 'false';

      last_tweet_item
        .querySelector('button[data-action="choose-audience"]')
        .classList.remove('hidden');
    }
  }

  ////////////////////////////////////////////////////
  // -  TWEET ITEM ADDITIONAL FUNCTION
  ////////////////////////////////////////////////////
  // add new tweet in list
  handleAddMultipleTweetsBtn(target) {
    const btn = target.closest("button[data-action='add-another-tweet']");
    if (!btn) return;

    // we can do this by displaying the left tweet

    // lets get the last item
    const total_tweets = this._getTotalCountOfTweetItemInUse();
    if (total_tweets === 5) return new AlertView().render('Max Tweet Limit 5');

    this.insert_tweet_in_multiple_tweets_list({
      text: '',

      audience_can_reply: 'everyone',
      target_audience: 'everyone',
      upload_imgs: [],
      tweet_type: 'text',
    });

    const last_tweet_item = this._getAllTweetItems()[total_tweets];
    this._setTweetItemActive(last_tweet_item);
  }

  addAdditionalCodeToShowUploadImgFunc() {
    this._makeHeaderStickyWhenHeightOverflowContainer();
  }

  // scrollHeight
  _makeHeaderStickyWhenHeightOverflowContainer(setTrue = false) {
    // scrollHeight increase when content of container is overflowing

    if (
      this._topParentContainerEl.scrollHeight >
        this._topParentContainerEl.clientHeight ||
      setTrue
    )
      this._topParentContainerEl.dataset.stickyHeader = 'true';
  }

  _handleUnsentTweetBtn(target, handle) {
    const btn = target.closest('button[data-action="show-unsent-tweets"]');
    if (!btn) return;

    // if tweet in use === 1 then if clicked on unsent tweet allow to save tweet
    if (
      this._getTotalCountOfTweetItemInUse() === 1 &&
      this._textAreaEl.value &&
      this._textAreaEl.value !== ''
    ) {
      return replaceClass(this._save_tweet_popup, 'hidden', 'view');
    }
    handle('show-unsent-tweet-modal');
  }

  // toggle schedule timer btn when only 1 tweet is present
  _toggle_schedule_timer_btn() {
    const total_tweets_count = this._getAllTweetItems();
    const first_tweet_schedule_timer_btn =
      this._getAllTweetItems()[0].querySelector(
        'button[data-action="schedule-post"]'
      );

    total_tweets_count === 1
      ? first_tweet_schedule_timer_btn.removeAttribute('disable')
      : first_tweet_schedule_timer_btn.setAttribute('disable', '');
  }

  // FUNCTION WORKING ON TWEET ITEM
  additionalHandleFuncs(target, handle) {
    // CSS ------------------------------------------------------------
    this._makeHeaderStickyWhenHeightOverflowContainer();

    // active item on clicking (unhide the hidden item els)
    this._active_tweet_when_clicked(target);

    // toggle bw schedule timing btn classlist hidden true or false
    this._toggle_schedule_timer_btn(target);

    // change tweet btn to tweet all when no of tweets is more than one on active tweet item
    this._switchBwTweetBtnAndTweetAllBtn();

    this._remove_tweet_item(target);

    // HANDLE -----------------------------------------------
    this._handleSaveMultipleTweets(target, handle);
  }

  _hide_form_when_back_btn_clicked(target) {
    if (target.closest('button[data-action="close-modal"]')) this._hide();
  }

  // FUNCTION ON TWEET TOP PARENT E
  handleTweetTopParentEl(target, handle) {
    this._handleUnsentTweetBtn(target, handle);
    this._hide_form_when_back_btn_clicked(target)
  }

  // add one more empty tweet in tweet  list
  addHandlerMultipleTweets(handle) {
    this.setUsedComponentClass();

    this.handleTweet(handle);
    this._makeHeaderStickyWhenHeightOverflowContainer();
  }

  // ------------------------------------------------------
  // To set Changes in multiple tweets from controller
  _setItemActiveAndItsDOMElsForAccessAndReturnEl(firstTweet) {
    const activeTweetItemEl = firstTweet
      ? this._topParentEl.querySelector('.createTweets-item')
      : this._topParentEl.querySelector(
          '.createTweets-item[data-active="true"]'
        );

    // to access it dom elements of createTweet item
    this._setDOMEls(activeTweetItemEl);

    // to show tweet item as active
    this._active_tweet_when_clicked(activeTweetItemEl);

    return activeTweetItemEl;
  }

  // if first tweet item true means set image in first tweet item
  setUploadImgInMultipleTweetImgEls(firstTweet, imgArr) {
    this._setItemActiveAndItsDOMElsForAccessAndReturnEl(firstTweet);

    // if arr is img not files then it means it is from unsent Tweets ,if  arr is of img files then arr is from single create tweet
    imgArr
      ? this._setUploadImgsAndshow('img', imgArr)
      : this._setUploadImgsAndshow('files');

    if (firstTweet) {
      this._makeHeaderStickyWhenHeightOverflowContainer(true);
    }
  }

  setUnsentTweetInMultiplTweetForm(tweetObj) {
    const { tweet_type } = tweetObj;
    tweetObj.tweet_previous_type = tweet_type;

    if (tweet_type.includes('comment')) {
      tweetObj.tweet_type = 'comment';
      this.insert_tweet_in_multiple_tweets_list(tweetObj, true, true);
    }

    if (tweet_type.includes('text') || tweet_type.includes('quote')) {
      this._getAllTweetItems().forEach((item) => {
        item.dataset.active = false;
        item.dataset.tweetMini = true;
      });

      tweetObj.tweet_type = tweet_type.includes('text') ? 'text' : 'quote';

      // check if first item is comment type then we need to remove the first item
      const first_tweet_item_type =
        this._getAllTweetItems()[0].dataset.tweetType;

      if (first_tweet_item_type === 'comment')
        this.insert_tweet_in_multiple_tweets_list(tweetObj, true, true);
      else {
        // delete the second last tweet item
        const last_tweet_item_el = this._getAllTweetItems().slice(-1)[0];
        last_tweet_item_el.remove();
        this.insert_tweet_in_multiple_tweets_list(tweetObj);
      }
    }
  }

  // return all needed data
  get_tweet_data(tweet, set_tweet_type_as_draft) {
    let data = this._getAllInputsValue(tweet);
    let dataobj = {};
    if (data.schedule_post_time && !set_tweet_type_as_draft)
      data.tweet_type = 'schedule-' + data.tweet_type;

    let { tweet_type } = data;

    if (set_tweet_type_as_draft) {
      data.tweet_type = 'draft-' + tweet_type;
      tweet_type = data.tweet_type;
    }

    // text or schedule

    // comment
    if (tweet_type === 'comment') {
      const posted_tweet = JSON.parse(
        this._parentEl.getAttribute('data-posted-tweet')
      );
      data.avatar = posted_tweet.user.avatar;
      dataobj.reference_tweet_id = posted_tweet._id;
    }

    if (
      [
        'draft-comment',
        'schedule-comment',
        'quote',
        'schedule-quote',
        'draft-quote',
        'retweet',
      ].find((type) => type === tweet_type)
    ) {
      const posted_tweet = JSON.parse(
        this._parentEl.getAttribute('data-posted-tweet')
      );
      dataobj.reference_tweet_id = posted_tweet._id;

      const posted_tweet_user = posted_tweet.user;

      delete posted_tweet.user;

      Object.keys(posted_tweet).forEach((key) => {
        posted_tweet['posted_tweet_' + key] = posted_tweet[key];
        delete posted_tweet[key];
      });
      Object.keys(posted_tweet_user).forEach((key) => {
        posted_tweet_user['posted_tweet_user_' + key] = posted_tweet_user[key];
        delete posted_tweet[key];
      });

      data = { ...data, ...posted_tweet, ...posted_tweet_user };

      delete data.posted_tweet_cur_user_can_reply;
      delete data.posted_tweet_follow_by_cur_user;
      delete data.posted_tweet_format;
      delete data.posted_tweet_ts_format;
      delete data.avatar;
      delete data.name;
    }

    // set tweet id for schedule and draft case
    if (tweet_type.includes('draft') || tweet_type.includes('schedule')) {
      dataobj.tweet_id = data.tweet_id;
      dataobj.tweet_previous_type = data.tweet_previous_type;
    }

    // quote

    const form_data = this.getTweetDataAsFormData(data);

    if (tweet_type.includes('text')) dataobj.tweet_type = 'text';
    else if (tweet_type.includes('comment')) {
      dataobj.comment_type = data.tweet_type;
      dataobj.tweet_type = 'comment';
    } else if (tweet_type.includes('quote')) dataobj.tweet_type = 'quote';
    else dataobj.tweet_type = tweet_type;

    dataobj.formdata = form_data;
    return dataobj;
  }

  set_progress_line_percent(set_value) {
    let value;

    if (set_value === 0) value = 'initial';
    if (set_value === 87) value = 'half';

    if (set_value === 100) value = 'final';

    this._progress_line.setAttribute('data-progress-state', value);
  }

  // SUBMIT
  handleSaveTweet(target, handle) {
    let dataobj = {};

    const tweetBtn =
      target.closest('button[data-action="save-tweet"]') ||
      target.closest('button[data-action="save-schedule-tweet"]');
    if (!tweetBtn || target.closest('.create-comment-reply')) return;

    this._progress_line.setAttribute('data-progress-state', 'half');

    dataobj = this.get_tweet_data(this._parentEl);
    handle(`save-${dataobj.tweet_type}`, dataobj);
  }

  _handleSaveMultipleTweets(target, handle) {
    if (!target.closest('button[data-action="save-all-tweets"]')) return;

    const tweets_data_obj = {};

    // 1.get all tweet in use
    const tweet_item_arr = [
      ...this._topParentEl.querySelectorAll(
        '.createTweets-item[data-tweet-empty="false"]'
      ),
    ];

    tweet_item_arr.forEach((tweet_item, i) => {
      tweets_data_obj[i] = this.get_tweet_data(tweet_item);
    });

    handle('save-all-tweets', tweets_data_obj);
  }

  // get only one left tweet item input value to save as draft tweet
  get_last_left_tweet_data() {
    // return current click tweet item el
    return this.get_tweet_data(this._parentEl, true);
  }
}
export default create_multiple_post_view;
