import { homeService } from '../services/home';

export default {
  namespace: 'home',
  state: {
    carousel: [
      'http://placekitten.com/g/400/200',
      'http://placekitten.com/g/400/200'
    ],
    favorite: {
      page: 1,
      totalPage: 1,
      dataList: []
    },
    nearest: {
      page: 1,
      totalPage: 1,
      dataList: []
    },
    weekend: {
      page: 1,
      totalPage: 1,
      dataList: []
    }
  },
  reducers: {
    refreshAll(state) {
      return {
        ...state
      }
    },
    updateFavi(state, {payload: {meta, data}}) {
      return {...state, favorite: {
        page: state.favorite.page+1,
        totalPage: meta.pagination.total_pages,
        dataList: data
      }}
    },
    updateNear(state, {payload: {meta, data}}) {
      return {...state, nearest: {
        page: state.nearest.page+1,
        totalPage: meta.pagination.total_pages,
        dataList: data
      }}
    },
    updateWeek(state, {payload: {meta, data}}) {
      return {...state, weekend: {
        page: state.weekend.page+1,
        totalPage: meta.pagination.total_pages,
        dataList: data
      }}
    },
    updateCarousel(state, {payload: {data}}) {
      return {...state, carousel: data}
    }
  },
  effects: {
    *getCarousels({}, {call, put}) {
      const result = yield call(homeService.getCarousels);
      yield put({type: 'updateCarousel', payload: result});
    },
  	*getFavi({payload = {}}, {call, put}) {
      const result = yield call(homeService.getEvents, payload);
      yield put({type: 'updateFavi', payload: result});
    },
    *getNear({payload = {}}, {call, put}) {
      const result = yield call(homeService.getNearbyEvents, payload);
      yield put({type: 'updateNear', payload: result});
    },
    *getWeek({payload = {}}, {call, put}) {
      const result = yield call(homeService.getWeekendEvents, payload);
      yield put({type: 'updateWeek', payload: result});
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({pathname}) => {
        if(pathname === '/') {
          dispatch({ type: 'getCarousels' });
          dispatch({ type: 'getFavi' });
        }
      });
    }
  }
};
