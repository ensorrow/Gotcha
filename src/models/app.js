import { homeService } from '../services/home';

export default {
  namespace: 'app',
  state: {
    firstLoad: true,
    title: '',
    event: {},
  },
  reducers: {
    updateDetail(state, {payload: {data}}){
      return {...state, event: data, title: data.title};
    }
  },
  effects: {
  	*getDetail({payload: {event_id}}, {call, put}){
      const result = yield call(homeService.getDetail, event_id);
      yield put({ type:'updateDetail', payload: result });
    }
  },
  subscriptions: {
  	setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        window.scrollTo(0,0);
        if(pathname === '/detail') {
          dispatch({ type: 'getDetail', payload: {event_id: query.id} });
        }
      });
    },
  },
};
