import { alertError } from '../Components/Alert/alertController.js';
const api = 'http://localhost:3000/api/v1/';
const api_view = 'http://localhost:3000/';

const makeReq = async function (
  method,
  route,
  body = undefined,
  redirectTo,
  view = false
) {
  try {
    const req = await axios({
      method,
      url: view ? `${api_view}${route}` : `${api}${route}`,
      data: body,
    });

    if (redirectTo) return setTimeout(() => location.assign(redirectTo), 1000);
    return req;
    // show succes message or send succes back to view
  } catch (err) {
    console.error(err);

    alertError(err);

    // reset the width of progress line of display form to 0% if form is prosent with progress line (hidden class removed)
    const is_form_present_with_progressline = document.querySelector(
      '.form[data-is_form_hidden="false"][data-progress-line-exist="true"]'
    );
    if (is_form_present_with_progressline) {
      is_form_present_with_progressline.querySelector(
        '.progress-line'
      ).dataset.progress = '0%';

      is_form_present_with_progressline.dataset.form_submitting = false;
    }

    return false;
  }
};

export const get = async (route, redirectTo) => {
  return await makeReq('GET', route, null, redirectTo);
};
export const get_with_body = async (route, body, redirectTo) => {
  return await makeReq('GET', route, body, redirectTo);
};
export const post = async (route, body, redirectTo) => {
  return await makeReq('POST', route, body, redirectTo);
};
export const patch = async (route, body, redirectTo) => {
  return await makeReq('PATCH', route, body, redirectTo);
};

export const del = async (route, body, redirectTo) => {
  return await makeReq('DELETE', route, body, redirectTo);
};

export const get_view_req = async (route, data, redirectTo) => {
  return await makeReq('GET', route, data, redirectTo, true);
};

// export const delete = async (route) => await makeReq("DELETE",route);
