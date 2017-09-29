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
  },
  effects: {
  	*getDetail({ payload: { event_id } }, { call, put }) {
    const { res, err } = yield call(homeService.getDetail, event_id);
    yield put({ type: 'updateDetail', payload: res });
  },
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
