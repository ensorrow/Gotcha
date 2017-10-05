import aboutService from '../services/about';
import auth from '../utils/auth';

export default {
  namespace: 'about',
  state: {
    isDetail: false,
    myInfo: {},
    tickets: [],
    collects: [],
    fans: [],
    follows: [],
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
      return { ...state, collects };
    },
    updateFollows(state, { payload: { follows } }) {
      return { ...state, follows };
    },
    updateFans(state, { payload: { fans } }) {
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
    *getCollects({ }, { call, put }) {
      const { res, err } = yield call(aboutService.getCollects);
      if (res) yield put({ type: 'updateCollects', payload: { collects: res.data } });
    },
    *getFollows({ }, { call, put }) {
      const { res, err } = yield call(aboutService.getFollows);
      if (res) yield put({ type: 'updateFollows', payload: { follows: res.data } });
    },
    *getFans({ }, { call, put }) {
      const { res, err } = yield call(aboutService.getFans);
      if (res) yield put({ type: 'updateFans', payload: { fans: res.data } });
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
