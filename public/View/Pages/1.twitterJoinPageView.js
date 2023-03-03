import {
  findEl,
  replaceClass,
  contains,
  removeClass,
} from '../utils/domHelper.js';

class TwitterJoinPage {
  _parentEl = findEl('twitter__joinPage');
  _signUpForm = this._parentEl.querySelector('.form--signUp');
  _loginForm = this._parentEl.querySelector('.form--login');

  handlePage() {
    this._parentEl.addEventListener('click', (e) => {
      const target = e.target;

      if (contains(target, 'twitter__joinPage-signUpBtn'))
        replaceClass(this._signUpForm, 'hidden', 'view');

      if (contains(target, 'twitter__joinPage-signInBtn'))
        replaceClass(this._loginForm, 'hidden', 'view');

     
    });
  }
}

export default TwitterJoinPage;
