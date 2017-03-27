import request from '../utils/request';

export function getEvents(params) {	
	return request(`/api/favorite_events?page=${params.page}&size=${params.size}`, {
		method: 'GET',
	});
}

export function getDetail(event_id) {
	return request(`/api/events/${event_id}`, {
		method: 'GET',
	});
}

export function getEventsByTag(params) {
	return request(`/api/favorite_events?tag_name=${params.tag_name}&page=${params.page}&size=${params.size}`, {
		method: 'GET',
	});
}

export function getWeekendEvents(params) {	
	return request(`/api/weekend_events?tag_name=${params.tag_name}&page=${params.page}&size=${params.size}`, {
		method: 'GET',
	});
}