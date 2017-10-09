import React from 'react';
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
import moment from 'moment';

function IndexDetail({ vm, dispatch }) {
  return (<div className="m-detail">
    <div className="topBg">
      <img src={vm.image_path || require('../../assets/images/banner1.png')} />
    </div>
    <div className="baseInfo">
      <h1>{vm.title}</h1>
      <h2><span><i className="icon icon-money"></i>{vm.price}</span>浏览：{vm.view_count} · 收藏：{vm.collectors_count}</h2>
      <h3><i className="icon icon-cal"></i>{moment(vm.start_date).format('M月D日,HH:mm')}-{moment(vm.end_date).format('M月D日,HH:mm')}</h3>
      <h3><i className="icon icon-add"></i> <p>{vm.place_name + vm.place_city + vm.place_district}</p></h3>
    </div>
    <div className="progress">
      <span>报名中({`${vm.users_count}/${vm.volume}`})</span>
      <span>
				剩余时间：125小时 20分 3秒
			</span>
    </div>
    <div className="activityInfo">
      <div style={{ width: '580px' }}>
        <AuthorCard author={vm.organizer} />
      </div>
    </div>
    {vm.has_comment ? <CommentBox comments={tmpcomments} /> : null}
    <div className="activityDetail">
      <h1 className="u-title">活动详情</h1>
      <img src={vm.image_path} />
      <p>{vm.description}</p>
      <Link>查看更多</Link>
    </div>
    <div className="activityRecommend">
      <h1 className="u-title">更多活动</h1>
      {vm.other_events ? vm.other_events.map(event => <ActivityCard vm={event} key={event.id} />) : '主办方暂无其他活动'}
    </div>
    <StatusBar vm={vm} dispatch={dispatch} />
  </div>);
}

function mapStateToProps(state) {
  return {
    vm: state.app.event,
  };
}

export default connect(mapStateToProps)(IndexDetail);
