import homeService from '../services/home';
import appService from '../services/app';
import auth from '../utils/auth';
import utils from '../utils/utils';
import { delay } from 'dva/saga';
import { routerRedux } from 'dva/router';

let prePath = '/';

export default {
  namespace: 'app',
  state: {
    firstLoad: true,
    title: '',
    event: {
      comments: []
    },
    search: {
      events: [],
      users: [],
    },
  },
  reducers: {
    updateDetail(state, { payload: { data } }) {
      return { ...state, event: data, title: data.title };
    },
    updateCollect(state) {
      return { ...state, event: { ...state.event, has_collect: true, collectors_count: state.event.collectors_count + 1 } };
    },
    updateApply(state) {
      return { ...state, event: { ...state.event, has_apply: true, users_count: state.event.users_count + 1 } };
    },
    updateSearch(state, { payload: data }) {
      return { ...state, search: data };
    }
  },
  effects: {
    *getDetail({ payload: { event_id } }, { call, put, select }) {
      const { res, err } = yield call(homeService.getDetail, event_id);
      if(res) {
        if(res.data.has_comment) {
          const result = yield call(homeService.getComments, event_id);
          if(result.res){
            res.data.comments = result.res.data;
          }
        }
        yield put({ type: 'updateDetail', payload: res });      
      }
    },
    *collect({ }, { call, put, select }) {
      const event_id = yield select(state => state.app.event.id);
      const has_collect = yield select(state => state.app.event.has_collect);
      if (has_collect) return;
      const { res, err } = yield call(homeService.collect, event_id);
      if (!err) yield put({ type: 'updateCollect' });
    },
    *applyEvent({ payload: { event_id } }, { call, put }) {
      const { res, err } = yield call(homeService.applyEvent, event_id);
      if (!err) yield put({ type: 'updateApply' });
    },
    *comment({ payload: { content } }, { call, put, select }) {
      const event_id = yield select(state => state.app.event.id);
      const { res, err } = yield call(homeService.comment, { event_id, content });
      if(res) {
        utils.show('评价成功');
        yield put(routerRedux.goBack());
      }
    },
    *search({ payload: keyword }, { call, put }) {
      const { res, err } = yield call(appService.search, keyword);
      if (res) yield put({ type: 'updateSearch', payload: res.data });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        window.scrollTo(0, 0);
        auth.login(dispatch, pathname, () => {
          if (pathname === '/detail' || pathname === '/detail/comment' || pathname === '/detail/confirm/') {
            if(pathname === '/detail/confirm/') {
              // location.replace(location.origin+location.pathname+"#/detail/confirm//?"+location.hash.split('?')[1]);// 微信支付需要末尾加斜杠
              if(prePath !== '/') location.reload();
            }
            dispatch({ type: 'getDetail', payload: { event_id: query.id } });
          }
        });
        prePath = pathname;
      });
    },
  },
};
