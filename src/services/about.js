import request from '../utils/request';

export default {
    getUserInfo: () => request('/my_info', {needAuth: true}),
    putMyInfo: (info) => request('/my_info', {
        needAuth: true,
        body: JSON.stringify(info),
        method: 'PUT'
    }),
    getTicketsList: () => request('/tickets', {needAuth: true}),
    getTicket: (id) => request(`/tickets/${id}`, {needAuth: true}),
    addTicket: (code) => request('/tickets', {
        needAuth: true,
        body: JSON.stringify({
            "attend_code": code
        }),
        method: 'POST'
    }),
    getCollects: () => request('/collect_events', {needAuth: true}),
    getFollows: () => request('/follows', {needAuth: true}),
    getFans: () => request('/followers', {needAuth: true})
}