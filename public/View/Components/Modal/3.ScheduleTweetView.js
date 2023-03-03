import FormView from '../../Common/FormView.js';
import AlertView from '../Alert/AlertView.js';

class ScheduleTweetFormView extends FormView {
  _parentEl = document.querySelector(
    '.form--schedule-tweet[data-action="schedule-post"]'
  );

  _scheduleDateLabel = this._parentEl.querySelector(
    '.form-schedule-label span'
  );

  // if modal is not displayed then listener will not work
  schedule_modal_is_currently_displayed;

  _submitBtn = this._parentEl.querySelector('.form-submitBtn');
  _redirectToWhenFormClosed = 'current';

  // create Tweet form
  _createTweetForm;
  _createTweetScheduleInputEl;
  _createTweetScheduleLabelEl;
  // _create_tweet_form_tweet_type_input_el;

  _date;

  _monthInputEl;
  _dayInputEl;
  _yearInputEl;
  _hourInputEl;
  _minuteInputEl;
  _am_pmInputEl;

  constructor() {
    super();
    this.handleFormBasicFunctionality();
  }

  _setScheduleDateLabel(date) {
    date = date.setDate(date.getDate() + 1);
    date = new Date(date);
    this._date = date;

    this._monthInputEl.value = date.getMonth() + 1;
    this._dayInputEl.value = date.getDate();
    this._yearInputEl.value = date.getFullYear();
    this._hourInputEl.value = Math.abs(date.getHours() - 12);
    this._minuteInputEl.value = date.getMinutes();
    this._am_pmInputEl.value = date.getHours > 12 ? 'AM' : 'PM';

    this._scheduleDateLabel.textContent =
      new Intl.DateTimeFormat('en-GB', {
        dateStyle: 'full',
        timeStyle: 'long',
      })
        .format(date)
        .split('GMT')[0] + `${this._am_pmInputEl.value}`;

    this._enableSubmitBtnWhenAllInputsValid();
  }

  _handleSubmitBtn(target, handle) {
    const btn = target.closest('.form-submitBtn');
    if (!btn) return;
    const inputValues = this.getAllNonHiddenInputValueAsObj();

    const { am_pm, day, hour, minute, month, year } = inputValues;

    const schedule_date = new Date(
      `${month} ${day} ${year} ${hour}:${minute} ${am_pm}`
    );

    if (schedule_date < new Date())
      return new AlertView().render('choose a date in future!');

    const schedule_date_db = schedule_date.toISOString();

    this._createTweetForm.dataset.tweetSchedule = true;
    this._createTweetScheduleInputEl.value = schedule_date_db;
    this._createTweetScheduleLabelEl.textContent = `${
      `${schedule_date}`.split('GMT')[0]
    } ${am_pm} `;

    this._parentEl.dataset.dateSet = true;
    // this._create_tweet_form_tweet_type_input_el.value =
    // 'schedule-' + this._create_tweet_form_tweet_type_input_el.value;

    this._hideWithoutClearInputValues();
  }

  // change schedule tweet to normal tweet
  _handleClearBtn(target) {
    const btn = target.closest('button[data-action="clear"]');
    if (!btn) return;

    this._parentEl.dataset.dateSet = false;
    this._createTweetScheduleInputEl.value = '';
    this._createTweetScheduleLabelEl.textContent = '';
    this._createTweetForm.setAttribute('data-tweet-schedule', false);

    this._hide();
  }

  _show_unsent_schedule_tweet_in_unsent_modal(target) {
    const btn = target.closest('button[data-action="scheduled-tweets"]');
    if (!btn) return;

    // const unsentTweetModal = document.querySelector(
    //   '.modal[data-modal="unsent-tweets"]'
    // );

    // unsentTweetModal.classList.replace('hidden', 'display');
    this._hide();
  }

  _setDOMSEls(schedule_display_btn) {
    this.schedule_modal_is_currently_displayed = true;

    // action to be taken on
    this._createTweetForm = schedule_display_btn.closest('.form--createTweet');

    this._createTweetScheduleInputEl = this._createTweetForm.querySelector(
      'input[name="schedule_post_time"]'
    );
    this._create;
    this._createTweetScheduleLabelEl = this._createTweetForm.querySelector(
      '.createTweet-schedule-timing-value'
    );

    // schedule form
    this._monthInputEl = this._parentEl.querySelector('#month');
    this._dayInputEl = this._parentEl.querySelector('#day');
    this._yearInputEl = this._parentEl.querySelector('#year');
    this._hourInputEl = this._parentEl.querySelector('#hour');
    this._minuteInputEl = this._parentEl.querySelector('#minute');
    this._am_pmInputEl = this._parentEl.querySelector('[name="am_pm"]');
  }

  // btn of createtweet which will display schedule modal to schedule tweet
  _handle_display_btn(target) {
    const schedule_display_btn = target.closest(
      'button[ data-action="schedule-post" ]'
    );

    if (!schedule_display_btn) return;
    this._setDOMSEls(schedule_display_btn);
    if (this._parentEl.dataset.dateSet === 'false')
      this._setScheduleDateLabel(new Date());
    this.show();
  }

  // will also prevent duplicate add eventlistener
  handleScheduleForm() {
    document.querySelector('body').addEventListener('click', (e) => {
      const target = e.target;

      this._handle_display_btn(target);

      if (!this.schedule_modal_is_currently_displayed) return;

      this._handleSubmitBtn(target);

      this._handleClearBtn(target);

      // this._show_unsent_schedule_tweet_in_unsent_modal(target);
    });
  }
}

export default ScheduleTweetFormView;
