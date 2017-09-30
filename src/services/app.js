import request from '../utils/request';

export default {
  login: ({ mobile, password }) => request(`/auth/login`, {
    method: 'POST',
    body: JSON.stringify({
      mobile,
      password
    })
  }),
  fastLogin: ({ mobile, verify_code }) => request(`/auth/login_by_verify_code`, {
    method: 'POST',
    body: JSON.stringify({
      mobile,
      verify_code
    })
  }),
  getVerify: ({ mobile }) => request(`/auth/verify_code?mobile=${mobile}`),
  follow: (user_id) => request('/follow', {
    method: 'POST',
    body: JSON.stringify({
      user_id: user_id
    }),
    needAuth: true
  }),
  follow_org: (organizer_id) => request('/follow_organizer', {
    method: 'POST',
    body: JSON.stringify({
      organizer_id: organizer_id
    }),
    needAuth: true
  }),
}