import request from '../utils/request';

export default {
  getEvents: ({ page = 1, size = 2, tag_name }) => request(`/favorite_events?${tag_name ? `tag_name=${tag_name}&` : ''}page=${page}&size=${size}`),
  getDetail: event_id => request(`/events/${event_id}`, { ifAuth: true }),
  getWeekendEvents: ({ tag_name, page = 1, size = 10 }) => request(`/weekend_events?${tag_name ? `tag_name=${tag_name}&` : ''}page=${page}&size=${size}`),
  getNearbyEvents: ({ longitude = 114.057865, latitude = 22.543096, tag_name }) => request(`/nearby_events?${tag_name ? `tag_name=${tag_name}&` : ''}longitude=${longitude}&latitude=${latitude}`),
  getCarousels: () => request('/carousels'),
  getTags: () => request('/event_tags'),
  collect: event_id => request(`/events/${event_id}/collect`, {
    method: 'POST',
    needAuth: true,
  }),
  applyEvent: event_id => request(`/events/${event_id}/apply`, {
    method: 'POST',
    needAuth: true,
  }),
  comment: ({ event_id, content }) => request(`/events/${event_id}/comments`, {
    method: 'POST',
    needAuth: true,
    body: JSON.stringify({
      content,
    }),
  }),
  getAuthor: id => request(`/organizers/${id}`, {
    needAuth: true,
  }),
  getUser: id => request(`/users/${id}`, {
    needAuth: true,
  }),
  getAuthorEvents: ({ id, page = 1, size = 10 }) => request(`/organizers/${id}/events?page=${page}&size=${size}`, {
    needAuth: true,
  }),
  getUserEvents: ({ id }) => request(`/users/${id}/events`, {
    needAuth: true,
  }),
  getComments: (id) => request(`/events/${id}/comments`)  
};
