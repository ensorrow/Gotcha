import React from 'react';
import Avatar from 'material-ui/Avatar';
import { connect } from 'dva';
import LikeButton from '../../components/common/LikeButton';
import ArrowRight from 'material-ui/svg-icons/navigation/arrow-forward';
import styles from './Author.less';
import CommentBox from '../../components/index/CommentBox';
import ActivityCard from '../../components/index/ActivityCard';
import { routerRedux } from 'dva/router';

function Author({ toActivities, author }) {
  return (<div className="m-author">
    <div className="profile">
      <Avatar src={author.avatar} size={60} />
      <h1>{author.name}</h1>
      <h2>{author.summary}</h2>
      <LikeButton id={author.id} liked={author.has_follow} type="org" />
    </div>
    <dl>
      <div>
        <dd>{author.events_count}</dd>
        <dt>活动数</dt>
      </div>
      <div>
        <dd>{author.total_joins_count}</dd>
        <dt>参与活动人次</dt>
      </div>
      <div>
        <dd>{author.followers_count}</dd>
        <dt>关注数</dt>
      </div>
    </dl>
    <div className="intro">
      <h1 className="u-title">个人介绍</h1>
      <p>{author.description}</p>
      <img src={require('../../assets/test.png')} />
      <a className="u-more">查看更多</a>
    </div>
    <div className="activityRecommend u-card">
      <h1 className="u-title">他的活动</h1>
      {author.events.map(event => <ActivityCard vm={event} />)}
      <a className="u-more" onClick={toActivities.bind(null, { user: 'testuserid' })}>查看更多</a>
    </div>
    {/* <CommentBox comments={tmpcomments} /> */}
  </div>);
}

function mapStateToProps(state) {
  return {
    author: state.home.author,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    toActivities: (params) => {
      dispatch(routerRedux.push({
        pathname: '/author/activities',
        query: params,
      }));
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Author);
