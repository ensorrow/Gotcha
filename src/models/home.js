import homeService from '../services/home';
import auth from '../utils/auth';

export default {
  namespace: 'home',
  state: {
    tags: [],
    activeTag: '全部',
    activeTab: 0,
    carousel: [],
    author: {
      events: [],
    },
    user: {
      events: [],
    },
    favorite: {
      meta: {
        pagination: {}
      },
      data: [],
    },
    nearest: {
      data: [],
    },
    weekend: {
      meta: {
        pagination: {}
      },
      data: [],
    },
  },
  reducers: {
    updateFavi(state, { payload: favorite }) {
      if(favorite.meta.pagination.current_page>state.favorite.meta.pagination.current_page) favorite.data = state.favorite.data.concat(favorite.data);
      return { ...state, favorite };
    },
    updateNear(state, { payload: { data } }) {
      return { ...state,
        nearest: {
          data,
        } };
    },
    updateWeek(state, { payload: weekend }) {
      if(weekend.meta.pagination.current_page>state.weekend.meta.pagination.current_page) weekend.data = state.weekend.data.concat(weekend.data);      
      return { ...state, weekend};
    },
    updateCarousel(state, { payload: { data } }) {
      return { ...state, carousel: data };
    },
    updateTags(state, { payload: { tags } }) {
      return { ...state, tags };
    },
    updateActiveTag(state, { payload: { tag } }) {
      return { ...state, activeTag: tag };
    },
    updateActiveTab(state, { payload: { tab } }) {
      return { ...state, activeTab: tab };
    },
    updateAuthor(state, { payload: { data } }) {
      return { ...state, author: data };
    },
    updateUser(state, { payload: { data } }) {
      return { ...state, user: data };
    },
    updateAuthorEvents(state, { payload: { data } }) {
      return { ...state, author: { ...state.author, events: data } };
    },
    updateUserEvents(state, { payload: { data } }) {
      return { ...state, user: { ...state.user, events: data } };
    },
  },
  effects: {
    *getTags({}, { call, put }) {
      const { res, err } = yield call(homeService.getTags);
      if (res) yield put({ type: 'updateTags', payload: res });
    },
    *getCarousels({}, { call, put }) {
      const { res, err } = yield call(homeService.getCarousels);
      if (res) yield put({ type: 'updateCarousel', payload: res });
    },
  	*getFavi({ payload: meta = {} }, { call, put, select }) {
      const activeTag = yield select(state => state.home.activeTag);
      if (activeTag !== '全部') Object.assign(meta, { tag_name: activeTag });
      yield put({ type: 'updateActiveTab', payload: { tab: 0 } });

      const favorite = yield select(state => state.home.favorite);
      if(!meta.page) {// 路由进入
        if(favorite.data.length) return;// 非首次加载
      }
      const { res, err } = yield call(homeService.getEvents, meta);
      if (res) yield put({ type: 'updateFavi', payload: res });
    },
    *getNear({ payload = {position} }, { call, put, select }) {
      const activeTag = yield select(state => state.home.activeTag);
      if (activeTag !== '全部') Object.assign(meta, { tag_name: activeTag });
      yield put({ type: 'updateActiveTab', payload: { tab: 1 } });
      const { res, err } = yield call(homeService.getNearbyEvents, position);
      if (res) yield put({ type: 'updateNear', payload: res });
    },
    *getWeek({ payload: meta = {} }, { call, put, select }) {
      const activeTag = yield select(state => state.home.activeTag);
      if (activeTag !== '全部') Object.assign(meta, { tag_name: activeTag });
      yield put({ type: 'updateActiveTab', payload: { tab: 2 } });

      const weekend = yield select(state => state.home.weekend);
      if(!meta.page) {// 路由进入
        if(weekend.data.length) return;// 非首次加载
      }
      const { res, err } = yield call(homeService.getWeekendEvents, meta);
      if (res) yield put({ type: 'updateWeek', payload: res });
    },
    *getByTag({ payload: { tag } }, { call, put, select }) {
      const activeTab = yield select(state => state.home.activeTab);
      yield put({ type: 'updateActiveTag', payload: { tag } });
      switch (activeTab) {
        case 0:
          yield put({ type: 'getFavi', payload: {page: 1} });
          break;
        case 1:
          yield put({ type: 'getNear' });
          break;
        case 2:
          yield put({ type: 'getWeek', payload: {page: 1} });
          break;
        default:
          yield put({ type: 'getFavi', payload: {page: 1} });
      }
    },
    *getAuthor({ payload: id }, { call, put }) {
      const { res, err } = yield call(homeService.getAuthor, id);
      if (res) {
        yield put({ type: 'updateAuthor', payload: res });
        yield put({ type: 'getAuthorEvents', payload: id });
      }
    },
    *getUser({ payload: id }, { call, put }) {
      const { res, err } = yield call(homeService.getUser, id);
      if (res) {
        yield put({ type: 'updateUser', payload: res });
        yield put({ type: 'getUserEvents', payload: id });
      }
    },
    *getAuthorEvents({ payload: id }, { call, put }) {
      const { res, err } = yield call(homeService.getAuthorEvents, { id });
      if (res) yield put({ type: 'updateAuthorEvents', payload: res });
    },
    *getUserEvents({ payload: id }, { call, put }) {
      const { res, err } = yield call(homeService.getUserEvents, { id });
      if (res) yield put({ type: 'updateUserEvents', payload: res });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        auth.login(dispatch, pathname, () => {
          if (pathname === '/') {
            dispatch({ type: 'getTags' });
            dispatch({ type: 'getCarousels' });
            dispatch({ type: 'getFavi' });
          }
          if (pathname === '/author') {
            dispatch({ type: 'getAuthor', payload: query.id });
          }
          if (pathname === '/user') {
            dispatch({ type: 'getUser', payload: query.id });
          }
        });
      });
    },
  },
};
