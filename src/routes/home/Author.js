import React, {Component} from 'react';
import Avatar from 'material-ui/Avatar';
import { connect } from 'dva';
import LikeButton from '../../components/common/LikeButton';
import ArrowRight from 'material-ui/svg-icons/navigation/arrow-forward';
import styles from './Author.less';
import CommentBox from '../../components/index/CommentBox';
import ActivityCard from '../../components/index/ActivityCard';
import { routerRedux } from 'dva/router';
import classnames from 'classnames';

class Author extends Component{
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
    const { vm, dispatch } = this.props;
    let needMore = false;
    if(vm.events && vm.events.length > 3) {
      needMore = true;
      vm.events = vm.events.slice(0, 3);
    }
    return (<div className="m-author">
      <div className="profile">
        <Avatar src={vm.avatar} size={64} style={{border: '2px solid #fff'}} />
        <h1>{vm.name || '未命名'}</h1>
        <h2>{vm.description || '无简介'}</h2>
        <LikeButton iconClass="icon-plus" id={vm.id} liked={vm.has_follow} type="org" />
      </div>
      <dl>
        <div>
          <dd>{vm.events_count}</dd>
          <dt>活动数</dt>
        </div>
        <div>
          <dd>{vm.total_joins_count}</dd>
          <dt>参与活动人次</dt>
        </div>
        <div>
          <dd>{vm.followers_count}</dd>
          <dt>关注数</dt>
        </div>
      </dl>
      <div className="slogan">
        <p>{vm.summary}</p>
        <img src={require('../../assets/images/quote.png')} />
      </div>
      <div className="intro u-detail">
        <h1 className="u-title"><i className="icon icon-user"></i>个人介绍</h1>
        <p className={classnames({'all': this.state.introAll})} >{vm.content}</p>
        <div className="imgWra">
          <img src={require('../../assets/test.png')} />
        </div>
        <a className="u-more" onClick={() => this.toggle('introAll')}>{this.state.introAll?'收起':'查看更多'}</a>
      </div>
      <div className="activityRecommend u-card">
        <h1 className="u-title"><i className="icon icon-more"></i> 他的活动</h1>
        {vm.events && vm.events.length ? vm.events.map(event => <ActivityCard key={event.id} vm={event} />) : '主办方暂无活动'}
        {needMore ? <a className="u-more">查看更多</a> : null}
      </div>
      {/* <CommentBox comments={tmpcomments} /> */}
    </div>);
  }
}

function mapStateToProps(state) {
  return {
    vm: state.home.author,
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
export default connect(mapStateToProps)(Author);
