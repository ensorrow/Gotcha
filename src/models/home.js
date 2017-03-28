import * as homeService from '../services/home';

export default {
  namespace: 'home',
  state: {
  	dataList: {
      favorites: [],
      nearest: [],
      weekend: []
    }
  },
  reducers: {
    toggleAll(state) {
      return {
        ...state,
        isDetail: !state.isDetail
      }
    },
    refreshAll(state) {
      return {

      }
    }
  },
  effects: {
  	*getList({payload: params}, {call, put}) {
      const result = yield call(homeService.getEvents, params);
      yield put(refreshAll, result);
    }
  }
};
