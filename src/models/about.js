import aboutService from '../services/about';

export default {
  namespace: 'about',
  state: {
    isDetail: false,
    myInfo: {}
  },
  reducers: {
    toggleAll(state) {
      return {
        ...state,
        isDetail: !state.isDetail,
      };
    },
    updateMyInfo({info}){
      return {
        ...state,
        myInfo: info
      }
    }
  },
  effects: {
    *getMyInfo({}, {call, put}){
      const {res, err} = yield call(aboutService.getUserInfo);
      if(res) {
        yield put({type: 'updateMyInfo', payload: {info: res}});    
      }else{
        console.log(err)
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({pathname}) => {
        if(pathname === '/about'){
          dispatch({ type: 'getMyInfo' });
        }
      })
    }
  }
};
