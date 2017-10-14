import React from 'react';
import { connect } from 'dva';
import styles from './Liked.less';
import { LikedCard } from '../components/liked/Card';
import Recommend from '../components/liked/Recommend';
import { routerRedux } from 'dva/router';

const EmptyFav = () => <div className="empty-fav">什么都还没有呢</div>;

function Liked({ recOrg = [], recUser = [], posts = [] }) {
  return (
    <div className="m-liked">
      {!posts.length && <EmptyFav />}
      {posts.map((vm, index) => <LikedCard key={index} vm={vm} />)}
      {posts.length <= 6 && <div>
        <Recommend title="推荐主办方" vm={recOrg.data} type="org" />
        <Recommend title="推荐用户" vm={recUser.data} type="user" />
      </div>}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    recOrg: state.liked.recOrg,
    recUser: state.liked.recUser,
    posts: state.liked.posts
  };
}

export default connect(mapStateToProps)(Liked);
