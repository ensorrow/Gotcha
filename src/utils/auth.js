import cookie from 'cookie';
import { routerRedux } from 'dva/router';
import utils from './utils';

export default {
  token: '',
  adminToken: '',
  secureReg: /\/about.*|\/liked.*|\/detail\/.*/,
  initToken() {
    this.token = cookie.parse(document.cookie).token;
  },
  initAdminToken() {
    this.adminToken = cookie.parse(document.cookie).adminToken;
  },
  needAuth(pathname) {
    if (this.secureReg.test(pathname.split('?')[0])) {
      return true;
    }
    return false;
  },
  login(dispatch, pathname, cb) {
    if (!this.needAuth(pathname) || this.token) return cb();
    const token = cookie.parse(document.cookie).token;
    if (token) {
      this.token = token;
      cb();
    } else {
      const pre = utils.getPathQuery();
      dispatch(routerRedux.replace({
        pathname: `/login?pre=${pre}`,
      }));
    }
  },
  logout() {
    const expireStr = cookie.serialize('token', '', {
      maxAge: 0,
    });
    document.cookie = expireStr;
  },
};
