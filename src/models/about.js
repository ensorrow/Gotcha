import aboutService from '../services/about';
import auth from '../utils/auth';

export default {
  namespace: 'about',
  state: {
    isDetail: false,
    myInfo: {},
    tickets: [],
    collects: {
      data: [],
      meta: {
        pagination: {}
      }
    },
    fans: {
      data: [],
      meta: {
        pagination: {}
      }
    },
    follows: {
      data: [],
      meta: {
        pagination: {}
      }
    },
    activeTicket: {
      event: {},
    },
  },
  reducers: {
    toggleAll(state) {
      return {
        ...state,
        isDetail: !state.isDetail,
      };
    },
    updateMyInfo(state, { payload: { info } }) {
      return {
        ...state,
        myInfo: info,
      };
    },
    updateTickets(state, { payload: { tickets } }) {
      return { ...state, tickets };
    },
    updateCollects(state, { payload: { collects } }) {
      collects.data = state.collects.data.concat(collects.data);      
      return { ...state, collects };
    },
    updateFollows(state, { payload: { follows } }) {
      follows.data = state.follows.data.concat(follows.data);
      return { ...state, follows };
    },
    updateFans(state, { payload: { fans } }) {
      fans.data = state.fans.data.concat(fans.data);      
      return { ...state, fans };
    },
    updateActTicket(state, { payload: { activeTicket } }) {
      return { ...state, activeTicket };
    },
  },
  effects: {
    *getMyInfo({ }, { call, put }) {
      const { res, err } = yield call(aboutService.getUserInfo);
      if (res) {
        yield put({ type: 'updateMyInfo', payload: { info: res.data } });
      } else {
        console.log(err);
      }
    },
    *getMyTickets({ }, { call, put }) {
      const { res, err } = yield call(aboutService.getTicketsList);
      if (res) yield put({ type: 'updateTickets', payload: { tickets: res.data } });
    },
    *getTicket({ payload: { id } }, { call, put }) {
      const { res, err } = yield call(aboutService.getTicket, id);
      if (res) yield put({ type: 'updateActTicket', payload: { activeTicket: res.data } });
    },
    *getCollects({ payload: pagination={} }, { call, put, select }) {
      const collects = yield select(state => state.about.collects);
      if(!pagination.page) {// 路由进入
        if(collects.data.length) return;// 非首次加载
      }
      const { res, err } = yield call(aboutService.getCollects, pagination);
      if (res) yield put({ type: 'updateCollects', payload: { collects: res } });
    },
    *getFollows({ payload: pagination={} }, { call, put, select }) {
      const follows = yield select(state => state.about.follows);
      if(!pagination.page) {// 路由进入
        if(follows.data.length) return;// 非首次加载
      }
      const { res, err } = yield call(aboutService.getFollows, pagination);
      if (res) yield put({ type: 'updateFollows', payload: { follows: res } });
    },
    *getFans({ payload: pagination={} }, { call, put, select }) {
      const fans = yield select(state => state.about.fans);
      if(!pagination.page) {// 路由进入
        if(fans.data.length) return;// 非首次加载
      }
      const { res, err } = yield call(aboutService.getFans, pagination);
      if (res) yield put({ type: 'updateFans', payload: { fans: res } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        auth.login(dispatch, pathname, () => {
          if (pathname === '/about') {
            dispatch({ type: 'getMyInfo' });
            dispatch({ type: 'getMyTickets' });
          }
          if (pathname === '/about/tickets') {
            dispatch({ type: 'getMyTickets' });
          }
          if (pathname === '/about/ticketdetail') {
            dispatch({ type: 'getTicket', payload: { id: query.id } });
          }
          if (pathname === '/about/collects') {
            dispatch({ type: 'getCollects' });
          }
          if (pathname === '/about/follows') {
            dispatch({ type: 'getFollows' });
          }
          if (pathname === '/about/fans') {
            dispatch({ type: 'getFans' });
          }
        });
      });
    },
  },
};
