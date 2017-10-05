import React from 'react';
import Avatar from 'material-ui/Avatar';
import { connect } from 'dva';
import FlatButton from 'material-ui/FlatButton';
import ArrowRight from 'material-ui/svg-icons/navigation/arrow-forward';
import styles from './User.less';
import CommentBox from '../../components/index/CommentBox';
import ActivityCard from '../../components/index/ActivityCard';
import { routerRedux } from 'dva/router';
import LikeButton from '../../components/common/LikeButton';

function Author({ toActivities, user }) {
  return (<div className="m-author">
    <div className="profile">
      <Avatar src={user.avatar} size={60} />
      <h1>{user.nickname}</h1>
      <div><h2>{user.birthday || '未填写年龄信息'} {user.city}</h2><h3>{user.university || '未填写大学信息'}</h3></div>
      <LikeButton id={user.id} liked={user.has_follow} type="user" />
    </div>
    <dl>
      <div>
        <dd>{user.events_count}</dd>
        <dt>参与的活动</dt>
      </div>
      <div>
        <dd>{user.collect_events_count}</dd>
        <dt>收藏的活动</dt>
      </div>
      <div>
        <dd>{user.follows_count}</dd>
        <dt>他的关注</dt>
      </div>
      <div>
        <dd>{user.followers_count}</dd>
        <dt>他的粉丝</dt>
      </div>
    </dl>
    <div className="intro">
      <h1 className="u-title">个人简介</h1>
      <p>{user.subscribe}</p>
      <a className="u-more">查看更多</a>
    </div>
    <div className="activityRecommend u-card">
      <h1 className="u-title">他参加的活动</h1>
      {user.events.map(event => <ActivityCard vm={event} />)}
      <a className="u-more" >查看更多</a>
    </div>
  </div>);
}

function mapStateToProps(state) {
  return {
    user: state.home.user,
  };
}

export default connect(mapStateToProps)(Author);
