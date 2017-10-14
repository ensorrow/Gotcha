import likedService from '../services/liked';
import auth from '../utils/auth';

export default {
  namespace: 'liked',
  state: {
    recUser: {
      data: [],
      meta: {
        pagination: {}
      }
    },
    recOrg: {
      data: [],
      meta: {
        pagination: {}
      }
    },
  },
  reducers: {
    updateRecOrg(state, { payload: recOrg }) {
      recOrg.data = state.recOrg.data.concat(recOrg.data)
      return {
        ...state,
        recOrg,
      };
    },
    updateRecUser(state, { payload: recUser }) {
      recUser.data = state.recUser.data.concat(recUser.data)
      return {
        ...state,
        recUser,
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
  	*getRecUser({payload: pagination = {}}, { call, put, select }) {
      const recUser = yield select(state => state.liked.recUser);
      if(!pagination.page && recUser.data.length){
        return;
      }
      const { res, err } = yield call(likedService.getRecUser, pagination);
      if (res) yield put({ type: 'updateRecUser', payload: res });
    },
    *getRecOrg({payload: pagination = {}}, { call, put, select }) {
      const recOrg = yield select(state => state.liked.recOrg);
      if(!pagination.page && recOrg.data.length){
        return;
      }
      const { res, err } = yield call(likedService.getRecOrg, pagination);
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
        if (pathname === '/liked/recommend/user') {
          dispatch({ type: 'getRecUser' });
        }
        if (pathname === '/liked/recommend/org') {
          dispatch({ type: 'getRecOrg' });
        }
      });
    });
  },
  },
};
