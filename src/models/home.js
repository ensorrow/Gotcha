import * as homeService from '../services/home';

export default {
  namespace: 'home',
  state: {
  	
  },
  reducers: {
    toggleAll(state) {
      return {
        ...state,
        isDetail: !state.isDetail
      }
    },
  },
  effects: {
  	*getList({payload: params}, {call, put}) {
      const result = yield call(homeService.getEvents, params);
    }
  }
};
