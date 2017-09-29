import { homeService } from '../services/home';

export default {
  namespace: 'home',
  state: {
    tags: [],
    activeTag: '全部',
    activeTab: 0,
    carousel: [],
    favorite: {
      page: 1,
      totalPage: 1,
      dataList: [],
    },
    nearest: {
      dataList: [],
    },
    weekend: {
      page: 1,
      totalPage: 1,
      dataList: [],
    },
  },
  reducers: {
    updateFavi(state, { payload: { meta, data } }) {
      return { ...state,
        favorite: {
          page: state.favorite.page + 1,
          totalPage: meta.pagination.total_pages,
          dataList: data,
          activeTab: 0,
        } };
    },
    updateNear(state, { payload: { data } }) {
      return { ...state,
        nearest: {
          dataList: data,
          activeTab: 1,
        } };
    },
    updateWeek(state, { payload: { meta, data } }) {
      return { ...state,
        weekend: {
          page: state.weekend.page + 1,
          totalPage: meta.pagination.total_pages,
          dataList: data,
          activeTab: 2,
        } };
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

  },
  effects: {
    *getTags({}, { call, put }) {
      const { res, err } = yield call(homeService.getTags);
      if(res) yield put({ type: 'updateTags', payload: res });
    },
    *getCarousels({}, { call, put }) {
      const { res, err } = yield call(homeService.getCarousels);
      if(res) yield put({ type: 'updateCarousel', payload: res });
    },
  	*getFavi({ payload = {} }, { call, put, select }) {
    const activeTag = yield select(state => state.home.activeTag);
    if (activeTag !== '全部') Object.assign(payload, { tag_name: activeTag });
    yield put({ type: 'updateActiveTab', payload: { tab: 0 } });
    const { res, err } = yield call(homeService.getEvents, payload);
    if(res) yield put({ type: 'updateFavi', payload: res });
  },
    *getNear({ payload = {} }, { call, put, select }) {
      const activeTag = yield select(state => state.home.activeTag);
      if (activeTag !== '全部') Object.assign(payload, { tag_name: activeTag });
      yield put({ type: 'updateActiveTab', payload: { tab: 1 } });
      const { res, err } = yield call(homeService.getNearbyEvents, payload);
      if(res) yield put({ type: 'updateNear', payload: res });
    },
    *getWeek({ payload = {} }, { call, put, select }) {
      const activeTag = yield select(state => state.home.activeTag);
      if (activeTag !== '全部') Object.assign(payload, { tag_name: activeTag });
      yield put({ type: 'updateActiveTab', payload: { tab: 2 } });
      const { res, err } = yield call(homeService.getWeekendEvents, payload);
      if(res) yield put({ type: 'updateWeek', payload: res });
    },
    *getByTag({ payload: { tag } }, { call, put, select }) {
      const activeTab = yield select(state => state.home.activeTab);
      yield put({ type: 'updateActiveTag', payload: { tag } });
      switch (activeTab) {
        case 0:
          yield put({ type: 'getFavi' });
          break;
        case 1:
          yield put({ type: 'getNear' });
          break;
        case 2:
          yield put({ type: 'getWeek' });
          break;
        default:
          yield put({ type: 'getFavi' });
      }
    },

  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        if (pathname === '/') {
          dispatch({ type: 'getTags' });
          // dispatch({ type: 'getCarousels' });
          dispatch({ type: 'getFavi' });
        }
      });
    },
  },
};
