import request from '../utils/request';

export default {
  getRecUser: ({ page = 1, size = 10 }) => request(`/recommend_users?page=${page}&size=${size}`, { needAuth: true }),
  getRecOrg: ({ page = 1, size = 10 }) => request(`/recommend_organizers?page=${page}&size=${size}`, { needAuth: true }),
  getPosts: ({ page = 1, size = 10 }) => request(`/my_timeline?page=${page}&size=${size}`, {needAuth: true})
};
