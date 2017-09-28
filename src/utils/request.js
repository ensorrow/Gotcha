import fetch from 'dva/fetch';
import cookie from 'cookie';
import { routerRedux } from 'dva/router';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

const prefix = 'http://112.74.190.30:8800/api';
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options = {}) {
  if (!options.method) options.method = 'GET';
  options.headers = options.headers || {
    'Content-Type': 'application/json',
    'Accept': 'application/vnd.Gotcha api.v1+json'
  };
  if (options.needAuth) {
    delete options.needAuth;
    const token = cookie.parse(document.cookie).token;
    if (!token) {
      const pre = window.location.hash.split('/#')[1].split('?')[0];
      return window.location.hash = '#/login?pre=' + pre;
    } else {
      options.headers['Authorization'] = 'Bearer ' + token;
    }
  }
  return fetch(prefix + url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(res => { res })
    .catch(err => {
      if (err.response.status === 401) {
        const pre = window.location.hash.split('#')[1].split('?')[0];
        window.location.hash = '#/login?pre=' + pre;
      }
      return { err };
    });
}
