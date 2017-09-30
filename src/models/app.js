import { homeService } from '../services/home';
import auth from '../utils/auth';

export default {
  namespace: 'app',
  state: {
    firstLoad: true,
    title: '',
    event: {},
  },
  reducers: {
    updateDetail(state, { payload: { data } }) {
      return { ...state, event: data, title: data.title };
    },
    updateCollect(state) {
      return { ...state, event: { has_collect: true, collectors_count: state.collectors_count+1 } }
    }
  },
  effects: {
  	*getDetail({ payload: { event_id } }, { call, put }) {
      const { res, err } = yield call(homeService.getDetail, event_id);
      yield put({ type: 'updateDetail', payload: res });
    },
    *collect({}, {call, put, select}) {
      const event_id = yield select(state => state.app.event.id);
      const has_collect = yield select(state => state.app.event.has_collect);
      if(has_collect) return;
      const { res, err } = yield call(homeService.collect, event_id);
      if(!err) yield put({type: 'updateCollect'});
    }
  },
  subscriptions: {
  	setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        window.scrollTo(0, 0);
        auth.login(dispatch, pathname, function() {
          if (pathname === '/detail') {
            dispatch({ type: 'getDetail', payload: { event_id: query.id } });
          }
        }); 
      });
    },
  },
};
