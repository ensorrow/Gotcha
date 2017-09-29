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
  getVerify: ({ mobile }) => request(`/auth/verify_code?mobile=${mobile}`)
}