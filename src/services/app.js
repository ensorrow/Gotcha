import request from '../utils/request';

export function test(id) {	
	return request(`/api?id=${id}`, {
		method: 'GET',
	});
}