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
import DetailCard from '../../components/common/DetailCard';
import MoreEvent from '../../components/common/MoreEvent';

class Author extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }
  render(){
    const { vm, dispatch } = this.props;
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
      <DetailCard iconClass="icon-user" content={vm.content} title="个人介绍" />
      <MoreEvent iconClass="icon-more" title="他的活动" events={vm.events} />
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
