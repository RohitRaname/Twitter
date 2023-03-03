import AlertMessageView from '../../../View/Components/Alert/AlertView.js';

export const alertError = (res) => {
  const errorMessage = res.response.data.message;

  const View = new AlertMessageView();
  View.render(errorMessage, 'alert');
};
export const successAlert = (res) => {
  const errorMessage = res.response.data.message;

  const View = new AlertMessageView();
  View.render(errorMessage, 'alert');
};
