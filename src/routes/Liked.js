import React from 'react';
import { connect } from 'dva';
import styles from './Liked.less';
import LikeCard from '../components/liked/Card';
import { routerRedux } from 'dva/router';

const EmptyFav = () => <div className="empty-fav">什么都还没有呢</div>

function Liked({ toUser, toAuthor }) {
  return (
    <div className={styles.normal}>
      <EmptyFav />
      <LikeCard onClick={toUser} />
      <LikeCard onClick={toAuthor} isAuthor />
    </div>
  );
}

function mapStateToProps() {
  return {};
}
function mapDispatchToProps(dispatch) {
  return {
    toUser: (params) => {
			dispatch(routerRedux.push({
				pathname: '/user',
				params
			}));
    },
    toAuthor: (params) => {
      dispatch(routerRedux.push({
				pathname: '/author',
				params
			}));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Liked);
