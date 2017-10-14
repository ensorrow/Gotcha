import request from '../utils/request';

export default {
  getUserInfo: () => request('/my_info', { needAuth: true }),
  putMyInfo: info => request('/my_info', {
    needAuth: true,
    body: JSON.stringify(info),
    method: 'PUT',
  }),
  getTicketsList: () => request('/tickets', { needAuth: true }),
  getTicket: id => request(`/tickets/${id}`, { needAuth: true }),
  addTicket: code => request('/tickets', {
    needAuth: true,
    body: JSON.stringify({
      attend_code: code,
    }),
    method: 'POST',
  }),
  getCollects: ({ page=1, size=10 }) => request(`/collect_events?page=${page}&size=${size}`, { needAuth: true }),
  getFollows: ({ page=1, size=10 }) => request(`/follows?page=${page}&size=${size}`, { needAuth: true }),
  getFans: ({ page=1, size=10 }) => request(`/followers?page=${page}&size=${size}`, { needAuth: true }),
};
