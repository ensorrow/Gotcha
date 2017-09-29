import aboutService from '../services/about';
import auth from '../utils/auth';

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
    updateMyInfo(state, {payload: {info}}){
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
        yield put({type: 'updateMyInfo', payload: {info: res.data}});    
      }else{
        console.log(err)
      }
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({pathname}) => {
        auth.login(dispatch, pathname, function() {
          if(pathname === '/about'){
            dispatch({ type: 'getMyInfo' });
          }
        })
      })
    }
  }
};
