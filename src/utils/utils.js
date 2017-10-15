import Toast from '../components/common/Toast';
const toast = Toast.init({});
let timer = null;
const ua = navigator.userAgent.toLowerCase();

export default {
  getPathQuery() {
    return window.location.hash.split('#')[1].split('&')[0].split('_k')[0];
  },
  getPath() {
    return window.location.hash.split('#')[1].split('?')[0];
  },
  getQuery(name) {
    let matchRes = window.location.hash.match(new RegExp(`${name}=.+(?=&)`));
    matchRes = matchRes && matchRes[0];
    return matchRes ? matchRes.split('=')[1] : undefined;
  },
  compareTime(startDate, endDate, applyDate) {
    const startTime = parseInt(new Date(startDate).getTime() / 1000);
    const endTime = parseInt(new Date(endDate).getTime() / 1000);
    const nowTime = parseInt(new Date().getTime() / 1000);
    const applyTime = parseInt(new Date(applyDate).getTime() / 1000);
    if (nowTime < (applyTime - 3600)) return 0;// 活动还未开始报名
    if (nowTime < applyTime) return 1;// 显示报名倒计时
    if (nowTime >= applyTime && nowTime <= startTime) return 2;// 开始报名
    if (nowTime > startTime && nowTime < endTime) return 3;// 活动进行中
    if (nowTime >= endTime) return 4;// 活动结束
    return 0;
  },
  show(content){
    toast.show(content)
  },
  showLoading(){
    toast.showLoading()
  },
  hideLoading(){
    toast.hideLoading()
  },
  uniToZh(str){
    return unescape(str.replace(/\\u/g, "%u"));
  },
  is_wx(){
    if(ua.match(/MicroMessenger/i)=="micromessenger") return true
    return false;
  },
  is_qq(){
    if(ua.match(/MQQBrowser/i)=='mqqbrowser') return true;
    return false;
  },
  throttle(func, delay) {
    clearTimeout(timer);
    timer = setTimeout(func, delay || 100);
  }
};
