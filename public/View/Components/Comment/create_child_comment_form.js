// whenever a component is used twice we should make the component as common View for that component so another component just like can use the component

import create_multiple_post_view from '../../Common/create_multiple_post_view.js';

// createTweets class add i add another one both of these will execute

class create_child_comment_view extends create_multiple_post_view {
  _section = document.querySelector('.section-comment');

  _topParentEl = document.querySelector('.createComments');
  _topParentContainerEl = this._topParentEl.querySelector(
    '.createTweets-container'
  );
  _overlay = this._topParentEl.querySelector('.overlay');
  _tweetListEl = this._topParentEl.querySelector('.createTweets-list');

  _progress_line = this._topParentContainerEl.querySelector('.progress-line');

  _saveAllTweetsBtn;

  _save_tweet_popup = document.querySelector(
    '.popup[data-action="save-tweet"]'
  );
  // _unsent_tweet_modal = this._topParentEl.querySelector(
  //   '.modal[data-modal="unsent-tweets"]'
  // );

  _unsent_tweet_btn = this._topParentEl.querySelector(
    'button[data-action="show-unsent-tweets"]'
  );

  generate_comment_markup(posted_comment, cur_user) {
    const {
      _id: comment_id,
      text,
      upload_imgs,
      author,
      reply_to,
      tweet_id,
      ts_format,
    } = posted_comment;

    const { name, avatar, profilePic, _id: user_id } = author;

    return `<form
    class="form form--createTweet createTweets-item create-comment-reply"
    onsubmit="return false;"
    data-action="create-tweet"
    data-active="true"
    data-tweet-schedule="false"
    data-tweet-type="comment"
    data-tweet-empty="true"
    data-tweet-new="false"
    data-tweet-in-use="true"
    data-tweet-mini="false"
    data-tweet-num="1"
    data-tweet-img-set="false"
    data-hide-tweet-track-line="true"
  

  >
    <div class="tweet postedTweet no-hover" data-comment-avatar=${avatar}>
      <div class="tweet-container tweet-reply-content tweet-line">
        <img class="tweet-img img--md" src="/img/users/${
          profilePic || 'default.png'
        }" />
        <div class="tweet-content tweet-reply-detail">
          <div class="tweet-user__info preview-item" data-no-hover-change="">
            <p class="tweet-user__name h-8">${name}</p>
            <p class="tweet-user__verified"></p>
            <p class="tweet-user__email t--md">${avatar}</p>
            <p class="tweet-user__postTime t--md">${ts_format}</p>
          </div>
          <p class="p--md mg-sm tweet-message">${
            text === 'undefined' ? '' : text
          }</p>
          <div class="tweet-message word-break mg-lw t--md">
            Replying to <span class="blue">${[...reply_to, avatar].join(
              ' '
            )} </span>
          </div>
        </div>
      </div>
    </div>
  
    <div class="createTweet">
      <input type="text" name="parent_id" class="hidden" value="${comment_id}" />
      <input type="text" name="tweet_id" class="hidden" value="${tweet_id}" />
      <input type="text" name="comment_tweet_user_id" class="hidden" value="${
        author._id
      }" />
  
      <input
        type="text"
        name="reply_to"
        class="hidden"
        value=${JSON.stringify([...reply_to, avatar])}
      />

  
      <button class="btn--icon-color hidden" data-action="remove-tweet">
        <i class="fa fa-times" aria-hidden="true"></i>
      </button>
      <div class="createTweet-container">
        <a href="/me"
          ><img
            class="createTweet-user__img img--md"
            src="/img/users/${cur_user.profilePic}"
            alt="user photo"
        /></a>
        <div class="createTweet-schedule-timing t--sm f-sm f-3 hidden">
          <i class="fas fa-calendar" aria-hidden="true"></i>
          <p>
            Will send on<span class="createTweet-schedule-timing-value"
              >Invalid Date</span
            >
          </p>
        </div>
        <button
          class="btn--inline preview-parent btn--inline-primary"
          data-action="choose-audience"
          data-active="false"
        >
          <span class="preview-parent-text">everyone</span
          ><input
            class="hidden preview-parent-input"
            type="text"
            name="target_audience"
            value="everyone"
          /><i class="fas fa-angle-down" aria-hidden="true"></i>
        </button>
        <header class="createTweet-header mg-v-sl">
          <div class="form-group mg-lw">
            <textarea
              class="createTweet-textarea"
              placeholder="Tweet your reply"
              data-scroll-event="false"
              data-input-change-event="false"
              name="text"
              value=""
            ></textarea>
          </div>




  <div class="tweet-uploadImg__container mg-lw hidden">
              <div class="tweet-uploadImg__content grid--collage" data-items=${
                upload_imgs?.length || 0
              }>

              ${[0, 1, 2, 3]
                .map((i) => {
                  if (upload_imgs[i])
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

  
          <button
            class="btn--span preview-parent"
            data-action="choose-whocan-reply"
            data-active="false"
            data-restrict="false"
          >
            <i class="fas fa-globe-americas" aria-hidden="true"></i
            ><i class="hidden fas fa-lock" aria-hidden="true"> </i
            ><span class="preview-parent-text">everyone can reply</span
            ><input
              class="hidden preview-parent-input"
              type="text"
              name="audience_can_reply"
              value="everyone"
            />
          </button>
          <div class="line-col-end line-dim">&nbsp;</div>
        </header>
        <footer class="createTweet-footer">
          <div class="createTweet-btns">
            <button class="createTweet-btn btn--icon-color" data-action="add-img">
              <label for="tweet-upload-image-1"></label
              ><i class="fa fa-file-image-o" aria-hidden="true"></i
              ><input
                class="createTweet-input hidden"
                id="tweet-upload-image-1"
                type="file"
                accept="image/*"
                data-change-event="false"
                name="upload_image"
                multiple=""
                data-files="[]"
              /></button
            ><button
              class="createTweet-btn btn--icon-color"
              data-action="schedule-post"
              disable=""
            >
              <label><i class="fa fa-clock-o" aria-hidden="true"></i></label
              ><input
                class="createTweet-input hidden"
                type="text"
                value="undefined"
                name="schedule_post_time"
              />
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
            <button
              class="btn--icon-color"
              data-action="add-another-tweet"
              hidden=""
            >
              <i class="fa fa-plus" aria-hidden="true"></i></button
            ><button
              class="btn--primary btn--sm"
              data-action="save-tweet"
              disabled=""
            >
              Reply</button
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
  }

  display_create_comment_form(posted_comment, page_type) {
    const cur_user = JSON.parse(
      document.querySelector('.section').dataset.curUser
    );

    const html = this.generate_comment_markup(posted_comment, cur_user);
    this._topParentEl.dataset.pageType = page_type;

    this._tweetListEl.innerHTML = '';

    this._tweetListEl.insertAdjacentHTML('afterbegin', html);

    // if tweet item is first
    this._setDOMEls(
      this._topParentContainerEl.querySelector('.createTweets-item')
    );

    // if we are comment on comment then we need to hide hide_unsent_tweet_btn_and_schedule_tweet_btn

    this._unsent_tweet_btn.remove();
    this._parentEl.querySelector(
      'button[data-action="schedule-post"]'
    ).style.display = 'none';

    this._show();
  }

  handleSaveTweet(target, handle) {
    const save_comment = target.closest('button[data-action="save-tweet"]');
    if (!save_comment) return;

    const input_values = this._getAllInputsValue();

    input_values.reply_to = JSON.parse(input_values.reply_to);

    const parent_comment_id = input_values.parent_id;
    const formdata = this.getTweetDataAsFormData(input_values);

    this.set_progress_line_percent(87);

    const page_type = this._topParentEl.dataset.pageType;

    handle(
      'save-comment-reply',
      page_type,
      parent_comment_id, //parent id of current new comment
      formdata
    );
  }

  // FUNCTION BELONG TO PARENT VIEW

  add_handler_comment(handle) {
    this.handleTweet(handle);
    this._hideParentWhenOverlayIsClicked();
  }
}

export default create_child_comment_view;
