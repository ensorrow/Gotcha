import { likedService } from '../services/liked';
import auth from '../utils/auth';

export default {
  namespace: 'liked',
  state: {
    recUser: [],
    recOrg: []
  },
  reducers: {
    updateRecOrg(state, {payload: {data}}){
        return {
            ...state,
            recOrg: state.recOrg.concat(data)
        }
    },
    updateRecUser(state, {payload: {data}}){
        return {
            ...state,
            recUser: state.recUser.concat(data)
        }
    }
  },
  effects: {
  	*getRecUser({}, { call, put }){
        const { res, err } = yield call(likedService.getRecUser, {});
        if(res) yield put({type: 'updateRecUser', payload: res});
    },
    *getRecOrg({}, { call, put }){
        const { res, err } = yield call(likedService.getRecOrg, {});
        if(res) yield put({type: 'updateRecOrg', payload: res});
    },
  },
  subscriptions: {
  	setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        auth.login(dispatch, pathname, function() {
          
        }); 
      });
    },
  },
};