import MessageView from '../../Common/AlertView.js';

class AlertView extends MessageView {
  _parentEl = document.querySelector('.alert-content');

  _generateMarkUp(message) {
    return ` 
            <p class="text error-message">
            ${message}
            </p>
              `;
  }
}

export default AlertView;
