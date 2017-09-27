import request from '../utils/request';

export const homeService = {
	getEvents: ({ page=1, size=10, tag_name }) => request(`/favorite_events?${tag_name?'tag_name='+tag_name+'&':''}page=${page}&size=${size}`),
	getDetail: (event_id) => request(`/events/${event_id}`),
	getWeekendEvents: ({ tag_name, page=1, size=10 }) => request(`/weekend_events?${tag_name?'tag_name='+tag_name+'&':''}page=${page}&size=${size}`),
	getNearbyEvents: ({longitude=114.057865, latitude=22.543096, tag_name}) => request(`/nearby_events?${tag_name?'tag_name='+tag_name+'&':''}longitude=${longitude}&latitude=${latitude}`),
	getCarousels: () => request('/carousels'),
	getTags: () => request('/event_tags')
};