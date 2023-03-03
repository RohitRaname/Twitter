import { addClass, removeClass } from '../utils/domHelper.js';

class MessageView {
  _parentEl;

  render(message) {
    this._clear();

    const html = this._generateMarkUp(message);
    this._parentEl.insertAdjacentHTML('afterbegin', html);
    removeClass(this._parentEl, 'hidden');

    this._removeMessageFromDOM();
  }

  _clear() {
    this._parentEl.innerHTML = '';
  }

  _removeMessageFromDOM() {
    setTimeout(() => {
      this._clear();
      addClass(this._parentEl, 'hidden');
    }, 5000);
  }
}

export default MessageView;
