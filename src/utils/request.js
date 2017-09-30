import fetch from 'dva/fetch';
import cookie from 'cookie';
import auth from './auth';
import utils from './utils';
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
  if(options.ifAuth) {
    delete options.ifAuth;
    const token = auth.token;
    if(token) options.headers['Authorization'] = 'Bearer ' + token;
  }
  if (options.needAuth) {
    delete options.needAuth;
    const token = auth.token;
    if(!token) {
      const pre = utils.getPathQuery();
      window.location.hash = '#/login?pre=' + pre;
      return new Promise((resolve) => resolve({err: '需要登录'}));
    }
    options.headers['Authorization'] = 'Bearer ' + token;    
  }
  return fetch(prefix + url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(res => ({ res }))
    .catch(err => {
      if (err.response && err.response.status === 401) {
        const pre = utils.getPathQuery();
        window.location.hash = '#/login?pre=' + pre;
      }
      return { err };
    });
}
