import request from '../utils/request';

export default {
    getRecUser: ({ page=1, size=10 }) => request(`/recommend_users?page=${page}&size=${size}`),
    getRecOrg: ({ page=1, size=10 }) => request(`/recommend_organizers?page=${page}&size=${size}`),
}