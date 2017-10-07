import React from 'react';
import { connect } from 'dva';
import styles from './Liked.less';
import { LikedCard } from '../components/liked/Card';
import Recommend from '../components/liked/Recommend';
import { routerRedux } from 'dva/router';

const EmptyFav = () => <div className="empty-fav">什么都还没有呢</div>;

function Liked({ toUser, toAuthor, toDetail, recOrg, recUser }) {
  return (
    <div className={styles.normal}>
      <EmptyFav />
      <Recommend title="推荐主办方" vm={recOrg} type="org" />
      <Recommend title="推荐用户" vm={recUser} type="user" />
      {/* <LikedCard type="user" vm={}/> */}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    recOrg: state.liked.recOrg,
    recUser: state.liked.recUser,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    toUser: (params) => {
      dispatch(routerRedux.push({
        pathname: '/user',
        query: { ...params },
      }));
    },
    toAuthor: (params) => {
      dispatch(routerRedux.push({
        pathname: '/author',
        query: { ...params },
      }));
    },
    toDetail: (params) => {
      dispatch(routerRedux.push({
        pathname: '/detail',
        query: { ...params },
      }));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Liked);
