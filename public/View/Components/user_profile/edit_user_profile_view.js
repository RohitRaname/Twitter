import FormView from '../../Common/FormView.js';

class edit_user_profile_view extends FormView {
  _parentEl = document.querySelector('.edit-profile');

  _form_container = this._parentEl.querySelector('.form-container');
  _form_content = this._parentEl.querySelector('.form-content');

  _upload_imgs = [...this._parentEl.querySelectorAll('.profile-upload-img')];
  _set_profile_birthdate = this._parentEl.querySelector(
    '.set-profile-birthdate'
  );
  _birthdate_btns = this._parentEl.querySelector('.profile-date-btns');
  _submitBtn = this._parentEl.querySelector('.form-submitBtn');
  _date_input_els_container = this._parentEl.querySelector('.form-boxs');

  _birthdate_inputel = this._parentEl.querySelector('input[name="birthDate"]');
  _inputNameEl = this._parentEl.querySelector('#name');
  _profilepic_inputel = this._parentEl.querySelector('#profilePic');
  _coverpic_inputel = this._parentEl.querySelector('#cover_pic');
  _nameGroupEl = this._inputNameEl.closest('.form-group');

  _profilepic_img = this._parentEl.querySelector('#profile-pic-img');
  _coverpic_img = this._parentEl.querySelector('#cover-pic-img');

  _cover_img_options = this._parentEl.querySelector(
    '.edit-profile-cover-img-options'
  );
  _cover_img_remove_option = this._cover_img_options.querySelector(
    '[data-action="remove-img"]'
  );

  constructor() {
    super();
    this.handleFormBasicFunctionality();
    this._preview_upload_imgs();
    this._edit_birthdate();
    this._checkName();
    this._click_on_remove_cover_img_option();

    this._update_text_inputs_word_count();
  }

  click_on_overlay(target) {
    const overlay =
      target.closest('.overlay') ||
      target.closest('button[data-action="close-form"]');

    // reset the allinputs value to default previous value
    if (this._parentEl.dataset.editProfile === 'true') {
      const all_inputs = [...this._parentEl.querySelectorAll('input')];

      all_inputs.forEach((input) => {
        if (input.type === 'file') input.value = '';
        else input.value = input.dataset.prevValue;
      });

      this._profilepic_img.src = `/img/users/${this._profilepic_inputel.dataset.prevValue}`;
      this._coverpic_img.src = `/img/users/${this._coverpic_inputel.dataset.prevValue}`;
    }

    if (!overlay) return;
    this._hide();
  }

  _hide() {
    this._parentEl.classList.add('hidden');
    document.documentElement.style.overflowY = 'auto';
  }

  show() {
    this._parentEl.classList.remove('hidden');
    document.documentElement.style.overflowY = 'hidden';
  }

  // update_user_inputel_in_modal() FUNC ---------------------------------------------
  _set_mention_top_el_again_after_new_render() {
    this._upload_imgs = [
      ...this._parentEl.querySelectorAll('.profile-upload-img'),
    ];
    this._set_profile_birthdate = this._parentEl.querySelector(
      '.set-profile-birthdate'
    );
    this._birthdate_btns = this._parentEl.querySelector('.profile-date-btns');
    this._submitBtn = this._parentEl.querySelector('.form-submitBtn');
    this._date_input_els_container = this._parentEl.querySelector('.form-boxs');

    this._birthdate_inputel = this._parentEl.querySelector(
      'input[name="birthDate"]'
    );
    this._inputNameEl = this._parentEl.querySelector('#name');
    this._profilepic_inputel = this._parentEl.querySelector('#profilePic');
    this._coverpic_inputel = this._parentEl.querySelector('#cover_pic');
    this._nameGroupEl = this._inputNameEl.closest('.form-group');

    this._profilepic_img = this._parentEl.querySelector('#profile-pic-img');
    this._coverpic_img = this._parentEl.querySelector('#cover-pic-img');

    this._cover_img_options = this._parentEl.querySelector(
      '.edit-profile-cover-img-options'
    );
    this._cover_img_remove_option = this._cover_img_options.querySelector(
      '[data-action="remove-img"]'
    );
  }

  _set_el_attach_handler_func_again_after_new_render() {
    this._parentEl.removeEventListener(
      'click',
      this.handleFormBasicFunctionality
    );
    this.handleFormBasicFunctionality();
    this._preview_upload_imgs();
    this._edit_birthdate();
    this._checkName();
    this._click_on_remove_cover_img_option();

    this._update_text_inputs_word_count();
  }

  _generate_form_content_markup(user) {
    const {
      cover_pic,
      profilePic,
      name,
      bio,
      location,
      website_link,
      birthDate,
    } = user;

    const birth_date = new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(birthDate));
    const user_birthdate_exist = birthDate ? true : false;
    const user_birthdate = user_birthdate_exist
      ? new Date(birthDate).toLocaleDateString().split('/')
      : [];
    const [day, month, year] = user_birthdate;
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const month_in_str = months[Number(month) - 1];

    return `
    <div class="edit-profile-cover profile-img-box f-c" data-type="cover_pic">
      <label for="cover_pic"
        ><div
          class="f-sm edit-profile-cover-img-options toggle-child-f"
          data-active="${cover_pic ? 'both' : 'false'}"
        >
          <div class="btn--icon hidden el-1" data-action="remove-img">
            <i class="fa fa-times camera-icon" aria-hidden="true"></i>
          </div>
          <div class="btn--icon el-2">
            <i class="fa fa-camera camera-icon" aria-hidden="true"></i>
          </div></div></label
      ><input
        class="profile-upload-img hidden"
        id="cover_pic"
        type="file"
        accept="image/*"
        name="cover_pic"
        data-prev-value="${cover_pic}"
      /><img src="/img/users/${cover_pic || 'default_cover_pic'}" />
    </div>
    <div
      class="edit-profile-img-box profile-img-box mg-lw"
      data-type="profilePic"
    >
      <img
        class="img-100"
        src="/img/users/${profilePic || 'default.png'}"
      />
      <div class="camera-icon-box"></div>
      <label for="profilePic"
        ><div class="btn--icon">
          <i class="fa fa-camera camera-icon" aria-hidden="true"></i></div></label
      ><input
        class="profile-upload-img hidden"
        id="profilePic"
        type="file"
        accept="image/*"
        name="profilePic"
        data-prev-value="${profilePic}"
      />
    </div>
    <div class="form-groups">
      <div
        class="form-group"
        data-field="name"
        data-text-field="true"
        data-input-filled="${name ? true : false}"
        data-active="false"
        data-error="false"
        data-required="true"
      >
        <label class="form-label" for="name">Name</label
        ><input
          class="form-input"
          id="name"
          type="text"
          name="name"
          value="${name}"
          minlength="0"
          maxlength="50"
          data-prev-value="${name}"
        />
        <p class="form-count">
          <span class="t--lw">${
            name ? name.length : 0
          }</span><span class="t--lw"> / 50</span>
        </p>
        <p class="form-error hidden">What's your name?</p>
      </div>
      <div
        class="form-group"
        data-field="bio"
        data-text-field="true"
        data-active="false"
        data-input-filled="${bio ? true : false}"
        data-error="false"
        data-required="false"
      >
        <label class="form-label" for="bio">Your bio</label
        ><textarea
          class="form-textarea"
          id="bio"
          type="text"
          name="bio"
          value="${bio && bio.trim()}"
          minlength="0"
          maxlength="160"
        data-prev-value="${bio}"

        >
  ${bio}</textarea
        >
        <p class="form-count">
          <span class="t--lw">${
            bio ? bio.length : 0
          }</span><span class="t--lw"> / 160</span>
        </p>
      </div>
      <div
        class="form-group mg-sm"
        data-field="location"
        data-text-field="true"
        data-input-filled="${location ? true : false}"
        data-active="false"
        data-error="false"
        data-required="false"
      >
        <label class="form-label" for="location">Location</label
        ><input
          class="form-input"
          id="email"
          type="text"
          value="${location}"
          name="location"
          maxlength="30"
        data-prev-value="${location}"

        />
        <p class="form-count">
          <span class="t--lw">${
            location ? location.length : 0
          }</span><span class="t--lw"> / 30</span>
        </p>
      </div>
      <div
        class="form-group mg-sm"
        data-field="website_link"
        data-text-field="true"
        data-input-filled="${website_link ? true : false}"
        data-active="false"
        data-error="false"
        data-required="false"
      >
        <label class="form-label" for="website_link">Website</label
        ><input
          class="form-input"
          id="website_link"
          type="text"
          name="website_link"
          value="${website_link}"
          maxlength="100"
        data-prev-value="${website_link}"

        />
        <p class="form-count">
          <span class="t--lw">${
            website_link ? website_link.length : 0
          }</span><span class="t--lw"> / 100</span>
        </p>
      </div>
    </div>
    <!-- birthdata-->
    <div class="p-sm set-profile-birthdate" data-active="false">
      <div class="f-c f-3 edit-profile-birth mg-lw">
        <span>Birth date </span><span class="dot-m"></span>
        <p class="profile-date-btns">
          <span class="blue hidden profile-date-btn" data-action="cancel"
            >Cancel</span
          ><span class="blue profile-date-btn" data-action="edit">Edit</span>
        </p>
      </div>
      <p class="p--md profile-date">${birth_date}</p>
      <input
        class="hidden"
        name="birthDate"
        date-prev-value="Thu Dec 04 2003 00:00:00 GMT+0530 (India Standard Time)"
        value="2003-12-03T18:30:00.000Z"
      />
      <div class="form-boxs f-sm hidden">
        <div
          class="form-group form-group--dropDown dropDown-parent"
          data-field="date"
          data-text-field="false"
          data-input-filled="${month ? true : false}"
          data-active="false"
          data-error="false"
          data-type="month"
        >
          <label class="form-label" for="">Month</label
          ><input
            class="form-input"
            id="month"
            type="text"
            name="month"
            value="${month_in_str}"
        data-prev-value="${month_in_str}"

            readonly=""
          /><i class="fa fa-angle-down form-box__icon" aria-hidden="true"></i>
          <ul class="dropDown-list" data-active="false" data-height="">
            <li class="dropDown-item">January</li>
            <li class="dropDown-item">February</li>
            <li class="dropDown-item">March</li>
            <li class="dropDown-item">April</li>
            <li class="dropDown-item">May</li>
            <li class="dropDown-item">June</li>
            <li class="dropDown-item">July</li>
            <li class="dropDown-item">August</li>
            <li class="dropDown-item">September</li>
            <li class="dropDown-item">October</li>
            <li class="dropDown-item">November</li>
            <li class="dropDown-item">December</li>
          </ul>
        </div>
        <div
          class="form-group form-group--dropDown dropDown-parent"
          data-field="date"
          data-text-field="false"
          data-type="day"
          data-input-filled="${day ? true : false}"
          data-active="false"
          data-error="false"
        >
          <label class="form-label" for="">Day</label
          ><input
            class="form-input"
            id="day"
            type="text"
            name="day"
            value="${day}"
        data-prev-value="${day}"

            readonly=""
          /><i class="fa fa-angle-down form-box__icon" aria-hidden="true"></i>
          <ul class="dropDown-list" data-active="false" data-height="">
            <li class="dropDown-item">0</li>
            <li class="dropDown-item">1</li>
            <li class="dropDown-item">2</li>
            <li class="dropDown-item">3</li>
            <li class="dropDown-item">4</li>
            <li class="dropDown-item">5</li>
            <li class="dropDown-item">6</li>
            <li class="dropDown-item">7</li>
            <li class="dropDown-item">8</li>
            <li class="dropDown-item">9</li>
            <li class="dropDown-item">10</li>
            <li class="dropDown-item">11</li>
            <li class="dropDown-item">12</li>
            <li class="dropDown-item">13</li>
            <li class="dropDown-item">14</li>
            <li class="dropDown-item">15</li>
            <li class="dropDown-item">16</li>
            <li class="dropDown-item">17</li>
            <li class="dropDown-item">18</li>
            <li class="dropDown-item">19</li>
            <li class="dropDown-item">20</li>
            <li class="dropDown-item">21</li>
            <li class="dropDown-item">22</li>
            <li class="dropDown-item">23</li>
            <li class="dropDown-item">24</li>
            <li class="dropDown-item">25</li>
            <li class="dropDown-item">26</li>
            <li class="dropDown-item">27</li>
            <li class="dropDown-item">28</li>
            <li class="dropDown-item">29</li>
            <li class="dropDown-item">30</li>
            <li class="dropDown-item">31</li>
          </ul>
        </div>
        <div
          class="form-group form-group--dropDown dropDown-parent"
          data-field="date"
          data-text-field="false"
          data-type="year"
          data-input-filled="${year ? true : false}"
          data-active="false"
          data-error="false"
        >
          <label class="form-label" for="">Year</label
          ><input
            class="form-input"
            id="year"
            type="text"
            name="year"
            value="${year}"
        data-prev-value="${year}"

            readonly=""
          /><i class="fa fa-angle-down form-box__icon" aria-hidden="true"></i>
          <ul class="dropDown-list" data-active="false" data-height="">
            <li class="dropDown-item">1902</li>
            <li class="dropDown-item">1903</li>
            <li class="dropDown-item">1904</li>
            <li class="dropDown-item">1905</li>
            <li class="dropDown-item">1906</li>
            <li class="dropDown-item">1907</li>
            <li class="dropDown-item">1908</li>
            <li class="dropDown-item">1909</li>
            <li class="dropDown-item">1910</li>
            <li class="dropDown-item">1911</li>
            <li class="dropDown-item">1912</li>
            <li class="dropDown-item">1913</li>
            <li class="dropDown-item">1914</li>
            <li class="dropDown-item">1915</li>
            <li class="dropDown-item">1916</li>
            <li class="dropDown-item">1917</li>
            <li class="dropDown-item">1918</li>
            <li class="dropDown-item">1919</li>
            <li class="dropDown-item">1920</li>
            <li class="dropDown-item">1921</li>
            <li class="dropDown-item">1922</li>
            <li class="dropDown-item">1923</li>
            <li class="dropDown-item">1924</li>
            <li class="dropDown-item">1925</li>
            <li class="dropDown-item">1926</li>
            <li class="dropDown-item">1927</li>
            <li class="dropDown-item">1928</li>
            <li class="dropDown-item">1929</li>
            <li class="dropDown-item">1930</li>
            <li class="dropDown-item">1931</li>
            <li class="dropDown-item">1932</li>
            <li class="dropDown-item">1933</li>
            <li class="dropDown-item">1934</li>
            <li class="dropDown-item">1935</li>
            <li class="dropDown-item">1936</li>
            <li class="dropDown-item">1937</li>
            <li class="dropDown-item">1938</li>
            <li class="dropDown-item">1939</li>
            <li class="dropDown-item">1940</li>
            <li class="dropDown-item">1941</li>
            <li class="dropDown-item">1942</li>
            <li class="dropDown-item">1943</li>
            <li class="dropDown-item">1944</li>
            <li class="dropDown-item">1945</li>
            <li class="dropDown-item">1946</li>
            <li class="dropDown-item">1947</li>
            <li class="dropDown-item">1948</li>
            <li class="dropDown-item">1949</li>
            <li class="dropDown-item">1950</li>
            <li class="dropDown-item">1951</li>
            <li class="dropDown-item">1952</li>
            <li class="dropDown-item">1953</li>
            <li class="dropDown-item">1954</li>
            <li class="dropDown-item">1955</li>
            <li class="dropDown-item">1956</li>
            <li class="dropDown-item">1957</li>
            <li class="dropDown-item">1958</li>
            <li class="dropDown-item">1959</li>
            <li class="dropDown-item">1960</li>
            <li class="dropDown-item">1961</li>
            <li class="dropDown-item">1962</li>
            <li class="dropDown-item">1963</li>
            <li class="dropDown-item">1964</li>
            <li class="dropDown-item">1965</li>
            <li class="dropDown-item">1966</li>
            <li class="dropDown-item">1967</li>
            <li class="dropDown-item">1968</li>
            <li class="dropDown-item">1969</li>
            <li class="dropDown-item">1970</li>
            <li class="dropDown-item">1971</li>
            <li class="dropDown-item">1972</li>
            <li class="dropDown-item">1973</li>
            <li class="dropDown-item">1974</li>
            <li class="dropDown-item">1975</li>
            <li class="dropDown-item">1976</li>
            <li class="dropDown-item">1977</li>
            <li class="dropDown-item">1978</li>
            <li class="dropDown-item">1979</li>
            <li class="dropDown-item">1980</li>
            <li class="dropDown-item">1981</li>
            <li class="dropDown-item">1982</li>
            <li class="dropDown-item">1983</li>
            <li class="dropDown-item">1984</li>
            <li class="dropDown-item">1985</li>
            <li class="dropDown-item">1986</li>
            <li class="dropDown-item">1987</li>
            <li class="dropDown-item">1988</li>
            <li class="dropDown-item">1989</li>
            <li class="dropDown-item">1990</li>
            <li class="dropDown-item">1991</li>
            <li class="dropDown-item">1992</li>
            <li class="dropDown-item">1993</li>
            <li class="dropDown-item">1994</li>
            <li class="dropDown-item">1995</li>
            <li class="dropDown-item">1996</li>
            <li class="dropDown-item">1997</li>
            <li class="dropDown-item">1998</li>
            <li class="dropDown-item">1999</li>
            <li class="dropDown-item">2000</li>
            <li class="dropDown-item">2001</li>
            <li class="dropDown-item">2002</li>
            <li class="dropDown-item">2003</li>
            <li class="dropDown-item">2004</li>
            <li class="dropDown-item">2005</li>
            <li class="dropDown-item">2006</li>
            <li class="dropDown-item">2007</li>
            <li class="dropDown-item">2008</li>
            <li class="dropDown-item">2009</li>
            <li class="dropDown-item">2010</li>
            <li class="dropDown-item">2011</li>
            <li class="dropDown-item">2012</li>
            <li class="dropDown-item">2013</li>
            <li class="dropDown-item">2014</li>
            <li class="dropDown-item">2015</li>
            <li class="dropDown-item">2016</li>
            <li class="dropDown-item">2017</li>
            <li class="dropDown-item">2018</li>
            <li class="dropDown-item">2019</li>
            <li class="dropDown-item">2020</li>
            <li class="dropDown-item">2021</li>
            <li class="dropDown-item">2022</li>
            <li class="dropDown-item">2023</li>
          </ul>
        </div>
      </div>
    </div>
  `;
  }

  // set input when user changes some input without refreshing
  update_user_inputel_in_modal(user) {
    const form_content_html = this._generate_form_content_markup(user);
    this._form_content.innerHTML = '';
    this._form_content.insertAdjacentHTML('afterbegin', form_content_html);
    this._parentEl.dataset.editProfile = false;

    this._set_mention_top_el_again_after_new_render();
    this._set_el_attach_handler_func_again_after_new_render();
  }

  ///////////////////////////////////////////////////////////////////////////////////////////

  _enableSubmitBtnWhenAllInputsValid() {
    this._update_input_filled_attr_in_groupel();

    const name_groupel = this._getGroupEls().find(
      (el) => el.dataset.field === 'name'
    );

    let valid = name_groupel.getAttribute('data-input-filled');

    valid = valid === 'true' ? true : false;

    this._parentEl.dataset.allInputFieldsValid = valid;

    const submitBtn = this._parentEl.querySelector('.form-submitBtn');

    valid ? submitBtn.removeAttribute('disabled') : (submitBtn.disabled = true);

    // submitBtn.disabled = valid ? false : true;
  }

  _preview_upload_imgs() {
    this._upload_imgs.forEach((el) =>
      el.addEventListener('change', (e) => {
        const img_input = e.target.closest('input');

        // work on both cover_pic and profilePic
        const img_box = e.target.closest('.profile-img-box');

        if (img_box.dataset.type === 'cover_pic')
          this._cover_img_options.dataset.active = 'both';

        const img = img_box.querySelector('img');
        const file = [...img_input.files][0];
        img.src = URL.createObjectURL(file);
        img.classList.remove('hidden');

        img.addEventListener('load', () => URL.revokeObjectURL(img.src));
      })
    );
  }

  _click_on_remove_cover_img_option() {
    this._cover_img_remove_option.addEventListener('click', (e) => {
      e.preventDefault();
      this._coverpic_inputel.value = '';

      // clear src and hide the img
      const cover_pic_image = e.target
        .closest('.edit-profile-cover')
        .querySelector('img');
      cover_pic_image.src = '';
      cover_pic_image.classList.add('hidden');

      // set the profile options state
      this._cover_img_options.dataset.active = false;
    });
  }

  _checkName() {
    this._inputNameEl.addEventListener('input', (e) => {
      const value = e.target.value.trim();

      if (value.length === 0) return (this._nameGroupEl.dataset.error = true);
      if (value.length > 0) return (this._nameGroupEl.dataset.error = false);
    });
  }

  _update_text_inputs_word_count() {
    const form_groupel_arr = this._parentEl.querySelectorAll(
      '.form-group[data-text-field="true"]'
    );

    form_groupel_arr.forEach((groupel) => {
      const inputel =
        groupel.querySelector('input') || groupel.querySelector('textarea');
      const countel = groupel.querySelector('.form-count span');

      inputel.addEventListener('input', (e) => {
        const count = e.target.value.trim().length;
        countel.textContent = count;

        // user profile is being edited
        this._parentEl.dataset.editProfile = true;
      });
    });
  }

  _edit_birthdate() {
    this._set_profile_birthdate.addEventListener('click', (e) => {
      const target = e.target;

      // show edit birthdate content
      if (target.closest('.profile-date-btn')) {
        const { action } = e.target.closest('.profile-date-btn').dataset;

        this._set_profile_birthdate.dataset.active =
          action === 'edit' ? true : false;

        if (action === 'cancel') {
          this._birthdate_inputel.value =
            this._birthdate_inputel.dataset.prevValue;
        }
      }

      // if birthdate input el dropdown is shown then scroll the form to bottom
      if (
        target.closest('.form-group') &&
        this._form_container.scrollTop < 350
      ) {
        setTimeout(() => (this._form_container.scrollTop = 10000), 10);
      }
    });
  }

  _get_data() {
    const input_els = [
      ...this._parentEl.querySelectorAll('input'),
      ...this._parentEl.querySelectorAll('textarea'),
    ];

    // update birthdate if edited
    const inputels = [
      ...this._date_input_els_container.querySelectorAll('input'),
    ];
    const input_value_arr = inputels.map((input) => input.value);
    if (input_value_arr.every((value) => value !== '')) {
      const date_format = input_value_arr.join(' ');
      const new_birthdate = new Date(`${date_format}`).toISOString();
      this._birthdate_inputel.value = new_birthdate;
    }

    const formdata = new FormData();
    input_els.forEach((input) => {
      const { type, name } = input;

      if (type === 'file') {
        if (input.files && input.files.length > 0)
          [...input.files].forEach((file) => formdata.append(input.name, file));
      } else if (input.defaultValue !== input.value)
        formdata.append(input.name, input.value.trim());
    });

    return formdata;
  }

  submitform(handle) {
    this._submitBtn.addEventListener('click', () => {
      const data = this._get_data();

      this._parentEl.dataset.editProfile = false;
      this._hide(false);

      handle('update-me', data);
    });
  }

  // preview profilePic and cover_pic
}

export default edit_user_profile_view;
