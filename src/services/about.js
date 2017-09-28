import request from '../utils/request';

export default {
    getUserInfo: () => request('/my_info', {needAuth: true})
}