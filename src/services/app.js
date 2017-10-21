import request from '../utils/request';

export default {
  login: ({ mobile, password }) => request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      mobile,
      password,
    }),
  }),
  fastLogin: ({ mobile, verify_code }) => request('/auth/login_by_verify_code', {
    method: 'POST',
    body: JSON.stringify({
      mobile,
      verify_code,
    }),
  }),
  getVerify: ({ mobile }) => request(`/auth/verify_code?mobile=${mobile}`),
  follow: user_id => request('/follow', {
    method: 'POST',
    body: JSON.stringify({
      user_id,
    }),
    needAuth: true,
  }),
  follow_org: organizer_id => request('/follow_organizer', {
    method: 'POST',
    body: JSON.stringify({
      organizer_id,
    }),
    needAuth: true,
  }),
  getVerifyReg: ({ mobile }) => request(`/auth/register_verify_code?mobile=${mobile}`),
  reg: ({ mobile, verify_code }) => request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      mobile,
      verify_code,
    }),
  }),
  setPassword: ({ password }) => request('/set_password', {
    method: 'POST',
    needAuth: true,
    body: JSON.stringify({ password }),
  }),
  retrievePwd: ({ mobile, verify_code }) => request('/auth/retrieve_password', {
    method: 'POST',
    body: JSON.stringify({
      mobile,
      verify_code,
    }),
  }),
  resetPwd: ({ password }) => request('/reset_password', {
    method: 'POST',
    needAuth: true,
    body: JSON.stringify({ password }),
  }),
  search: keyword => request('/search', {
    method: 'POST',
    body: JSON.stringify({ keyword }),
  }),
  commend: id => request(`/comments/${id}/like`, {
    method: 'POST',
    needAuth: true
  }),
  initWechatSdk: (url) => request('/wechat_config', {
    method: 'POST',
    body: JSON.stringify({
      url
    })
  }),
  getWechatSdk: () => request(`/wechat/jssdk?url=${window.location.href.split('#')[0]}`),
  initWechatPay: (order_id) => request(`/orders/${order_id}/wechat`, {
    method: 'POST',
    needAuth: true
  }),
  checkTicket: ({ token, event_id, attend_code }) => request('/check_ticket', {
    method: 'POST',
    body: JSON.stringify({
      token,
      event_id,
      attend_code
    })
  }),
  adminLogin: ({ email, second_password }) => request('/check_login', {
    method: 'POST',
    body: JSON.stringify({
      email,
      second_password
    })
  })
};
