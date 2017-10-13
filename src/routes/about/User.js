import React, {Component} from 'react';
import Avatar from 'material-ui/Avatar';
import { connect } from 'dva';
import FlatButton from 'material-ui/FlatButton';
import ArrowRight from 'material-ui/svg-icons/navigation/arrow-forward';
import styles from './User.less';
import CommentBox from '../../components/index/CommentBox';
import ActivityCard from '../../components/index/ActivityCard';
import { routerRedux } from 'dva/router';
import LikeButton from '../../components/common/LikeButton';
import classnames from 'classnames';

class User extends Component{
  constructor(props){
    super(props);
    this.state = {
      introAll: false
    }
  }
  toggle(property){
    const newState = this.state;
    newState[property] = !newState[property];
    this.setState(newState);
  }
  render(){
    const { user } = this.props;
    let needMore = false;
    if(user.events && user.events.length > 3) {
      needMore = true;
      user.events = user.events.slice(0, 3);
    }
    return (<div className="m-author m-user">
      <div className="profile">
        <Avatar src={user.avatar} size={60} />
        <h1>{user.nickname}</h1>
        <div>
          <h2>{(new Date().getFullYear()-new Date(user.birthday).getFullYear())+'岁' || '未填写年龄信息'} {user.city}</h2>
          <h3>{user.university || '未填写大学信息'}</h3>
        </div>
        <LikeButton iconClass="icon-plus" id={user.id} liked={user.has_follow} type="user" />
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
      <div className="intro u-detail">
        <h1 className="u-title"><i className="icon icon-user"></i>个人介绍</h1>
        <p className={classnames({'all': this.state.introAll})} >{user.subscribe}</p>
        <a className="u-more" onClick={() => this.toggle('introAll')}>{this.state.introAll?'收起':'查看更多'}</a>
      </div>
      <div className="activityRecommend u-card">
        <h1 className="u-title"><i className="icon icon-more"></i>他参加的活动</h1>
        {user.events && user.events.map(event => <ActivityCard key={event.id} vm={event} />)}
        <a className="u-more" >查看更多</a>
      </div>
    </div>);
  }
}

function mapStateToProps(state) {
  return {
    user: state.home.user,
  };
}

export default connect(mapStateToProps)(User);
