import * as appService from '../services/app';

export default {
  namespace: 'app',
  state: {
  	
  },
  reducers: {},
  effects: {
  	*test({payload: id }, { call, put }){
  		yield call(appService.test, id);

  	}
  },
  subscriptions: {
  	setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        window.scrollTo(0,0);
      });
    },
  },
};
