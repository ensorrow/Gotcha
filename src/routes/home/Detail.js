import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import { connect } from 'dva';
import styles from './Detail.less';
import AuthorCard from '../../components/index/AuthorCard';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import CommentBox from '../../components/index/CommentBox';
import ActivityCard from '../../components/index/ActivityCard';
import { Link } from 'dva/router';
import StatusBar from '../../components/index/StatusBar';
import DetailCard from '../../components/common/DetailCard';
import Progress from '../../components/index/Progress';
import MoreEvent from '../../components/common/MoreEvent';
import moment from 'moment';
import classnames from 'classnames';
import utils from '../../utils/utils';

let timer;

class IndexDetail extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }
  render(){
    const { vm, dispatch } = this.props;
    const diffTime = this.state.diffTime;
    return (<div className="m-detail">
    <div className="topBg">
      <img src={vm.image_path || require('../../assets/images/banner1.png')} />
    </div>
    <div className="baseInfo">
      <h1>{vm.title}</h1>
      <h2>
        <span className={classnames({'free': !vm.is_fee})}>
          {vm.is_fee ? <i className="icon icon-money"></i> : <i className="icon icon-free"></i>}
          {vm.is_fee ? vm.price : '免费'}
        </span>
        浏览：{vm.view_count} · 收藏：{vm.collectors_count}</h2>
      <h3><i className="icon icon-cal"></i>{moment(vm.start_date).format('M月D日,HH:mm')}-{moment(vm.end_date).format('M月D日,HH:mm')}</h3>
      <h3><i className="icon icon-add"></i> <p>{vm.place_name}</p></h3>
    </div>
    {
      vm.apply_date && utils.compareTime(vm.start_date, vm.end_date, vm.apply_date) === 2 && <Progress users_count={vm.users_count} volume={vm.volume} apply_date={vm.apply_date} />
    }
    <div className="activityInfo">
      <div style={{ width: '580px' }}>
        <AuthorCard author={vm.organizer} />
      </div>
    </div>
    {vm.has_comment && <CommentBox comments={vm.comments} />}
    <DetailCard iconClass="icon-activity" image_path={vm.image_path} content={vm.description} title="活动详情" />
    <MoreEvent iconClass="icon-more" title="更多活动" events={vm.other_events} />
    <div className="btBanner">
      <img src={require('../../assets/images/logo1.png')} />
    </div>
    <StatusBar vm={vm} dispatch={dispatch} />
  </div>);
  }
}

function mapStateToProps(state) {
  return {
    vm: state.app.event,
  };
}

export default connect(mapStateToProps)(IndexDetail);
