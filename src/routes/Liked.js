import React from 'react';
import { connect } from 'dva';
import styles from './Liked.less';
import LikeCard from '../components/liked/Card';
import Recommend from '../components/liked/Recommend';
import { routerRedux } from 'dva/router';

const EmptyFav = () => <div className="empty-fav">什么都还没有呢</div>
const tmpAuthors = [
  {avatar: 'http://lvzheyang.top/images/avatar.jpg', name: 'Jack Sparrow', description: '阿发甲方环境但是', summary: 'hhhhhhh'},
  {avatar: 'http://lvzheyang.top/images/avatar.jpg', name: 'Jack Sparrow', description: '阿发甲方环境但是', summary: 'hhhhhhh'},
  {avatar: 'http://lvzheyang.top/images/avatar.jpg', name: 'Jack Sparrow', description: '阿发甲方环境但是', summary: 'hhhhhhh'},
]
function Liked({ toUser, toAuthor, toDetail }) {
  return (
    <div className={styles.normal}>
      <EmptyFav />
      <Recommend title="推荐主办方" vm={tmpAuthors} type="org"/>
      <LikeCard onHeaderClick={toUser} onContentClick={toDetail} />
      <LikeCard onHeaderClick={toAuthor} onContentClick={toDetail} isAuthor />
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
    },
    toDetail: (params) => {
			dispatch(routerRedux.push({
				pathname: '/detail',
				params
			}));
		},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Liked);
