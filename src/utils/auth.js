import cookie from 'cookie';
import { routerRedux } from 'dva/router';

export default {
    token: '',
    securePath: ['/about', '/about/profile'],
    initToken(){
        this.token = cookie.parse(document.cookie).token;
    },
    needAuth(pathname) {
        if (this.securePath.indexOf(pathname) !== -1) {
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
        }
        else {
            const pre = window.location.hash.split('/#')[1].split('&')[0];
            dispatch(routerRedux.replace({
                path: '/login?pre=' + pre
            }));
        }
    },
    logout() {
        const expireStr = cookie.serialize('token', '', {
            maxAge: 0
        });
        document.cookie = expireStr;
    }
}