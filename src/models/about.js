import aboutService from '../services/about';
import auth from '../utils/auth';

export default {
  namespace: 'about',
  state: {
    isDetail: false,
    myInfo: {},
    tickets: [],
    activeTicket: {
      event:{}
    }
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
        myInfo: info
      }
    },
    updateTickets(state, { payload: { tickets } }) {
      return { ...state, tickets }
    },
    updateActTicket(state, { payload: { activeTicket } }) {
      return { ...state, activeTicket }
    }
  },
  effects: {
    *getMyInfo({ }, { call, put }) {
      const { res, err } = yield call(aboutService.getUserInfo);
      if (res) {
        yield put({ type: 'updateMyInfo', payload: { info: res.data } });
      } else {
        console.log(err)
      }
    },
    *getMyTickets({ }, { call, put }) {
      const { res, err } = yield call(aboutService.getTicketsList);
      if (res) yield put({ type: "updateTickets", payload: { tickets: res.data } });
    },
    *getTicket({ payload: { id } }, { call, put }) {
      const { res, err } = yield call(aboutService.getTicket, id);
      if (res) yield put({ type: 'updateActTicket', payload: { activeTicket: res.data } });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        auth.login(dispatch, pathname, function () {
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
        })
      })
    }
  }
};
