import likedService from '../services/liked';
import auth from '../utils/auth';

export default {
  namespace: 'liked',
  state: {
    recUser: [],
    recOrg: [],
  },
  reducers: {
    updateRecOrg(state, { payload: { data } }) {
      return {
        ...state,
        recOrg: data,
      };
    },
    updateRecUser(state, { payload: { data } }) {
      return {
        ...state,
        recUser: data,
      };
    },
    updatePosts(state, { payload: {data} }) {
      return {
        ...state,
        posts: data
      }
    }
  },
  effects: {
  	*getRecUser({}, { call, put }) {
      const { res, err } = yield call(likedService.getRecUser, {});
      if (res) yield put({ type: 'updateRecUser', payload: res });
    },
    *getRecOrg({}, { call, put }) {
      const { res, err } = yield call(likedService.getRecOrg, {});
      if (res) yield put({ type: 'updateRecOrg', payload: res });
    },
    *getPosts({}, { call, put }) {
      const { res, err } = yield call(likedService.getPosts, {});
      if (res) {
        if(res.data.length <= 6) {
          yield put({ type: 'getRecUser'});
          yield put({ type: 'getRecOrg'});
        }
        yield put({ type: 'updatePosts', payload: res });
      }
    }
  },
  subscriptions: {
  	setup({ dispatch, history }) {
    return history.listen(({ pathname, query }) => {
      auth.login(dispatch, pathname, () => {
        if (pathname === '/liked') {
          dispatch({ type: 'getPosts' });
        }
      });
    });
  },
  },
};
