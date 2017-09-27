// import * as aboutService from '../services/about';

export default {
  namespace: 'about',
  state: {
  	isDetail: false,
  },
  reducers: {
    toggleAll(state) {
      return {
        ...state,
        isDetail: !state.isDetail,
      };
    },
  },
  effects: {

  },
};
