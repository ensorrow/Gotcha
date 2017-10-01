import { homeService } from '../services/home';
import auth from '../utils/auth';
import { delay } from 'dva/saga';

export default {
  namespace: 'app',
  state: {
    firstLoad: true,
    title: '',
    event: {},
    showDialog: false,
    dialogContent: '通知'
  },
  reducers: {
    showDialog(state, { payload: { content } }) {
      return { ...state, showDialog: true, dialogContent: content }
    },
    hideDialog(state) {
      return { ...state, showDialog: false }
    },
    updateDetail(state, { payload: { data } }) {
      return { ...state, event: data, title: data.title };
    },
    updateCollect(state) {
      return { ...state, event: { has_collect: true, collectors_count: state.event.collectors_count + 1 } }
    },
    updateApply(state) {
      return { ...state, event: { has_apply: true, users_count: state.event.users_count + 1 } }
    }
  },
  effects: {
    *getDetail({ payload: { event_id } }, { call, put }) {
      const { res, err } = yield call(homeService.getDetail, event_id);
      yield put({ type: 'updateDetail', payload: res });
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
      if (res) {
        yield put({ type: 'showDialog', payload: { content: '评价成功' } });
        yield delay(2000);
        yield put({ type: 'hideDialog' });
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        window.scrollTo(0, 0);
        auth.login(dispatch, pathname, function () {
          if (pathname === '/detail' || pathname === '/detail/comment') {
            dispatch({ type: 'getDetail', payload: { event_id: query.id } });
          }
        });
      });
    },
  },
};
