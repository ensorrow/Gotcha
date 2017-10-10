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
import moment from 'moment';
import classnames from 'classnames';
import utils from '../../utils/utils';

let timer;

class IndexDetail extends Component{
  constructor(props){
    super(props);
    this.state = {
      detailAll: false,
      diffTime: 0
    }
  }
  countDown() {
    timer = setInterval(() => {
      if (this.state.diffTime !== 0) {
        this.setState({
          diffTime: this.state.diffTime - 1,
        });
      }
    }, 1000);
  }
  componentWillReceiveProps(props) {
    const { start_date, end_date, apply_date } = props.vm;
    if (utils.compareTime(start_date, end_date, apply_date) === 2) {
      this.setState({
        diffTime: parseInt((new Date(apply_date) - new Date()) / 1000),
      }, () => {
        this.countDown();
      });
    }
  }
  componentWillUnmount() {
    clearInterval(timer);
  }
  toggle(property){
    const newState = this.state;
    newState[property] = !newState[property];
    this.setState(newState);
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
      <h3><i className="icon icon-add"></i> <p>{vm.place_name + vm.place_city + vm.place_district}</p></h3>
    </div>
    <div className="progress">
      <span>报名中({`${vm.users_count}/${vm.volume}`})</span>
      <span>
				<i className="icon icon-clock"></i> 剩余时间：{moment.unix(diffTime).hours()}小时{moment.unix(diffTime).minutes()}分钟{moment.unix(diffTime).seconds()}秒
			</span>
    </div>
    <div className="activityInfo">
      <div style={{ width: '580px' }}>
        <AuthorCard author={vm.organizer} />
      </div>
    </div>
    {vm.has_comment ? <CommentBox comments={tmpcomments} /> : null}
    <div className="activityDetail">
      <h1 className="u-title"><i className="icon icon-activity"></i>活动详情</h1>
      <div className="imgWra">
        <img src={vm.image_path} />
      </div>
      <p className={classnames({'all': this.state.detailAll})}>{vm.description}</p>
      <a className="showMore" onClick={ () => this.toggle('detailAll') }>{this.state.detailAll?'收起':'查看更多'}</a>
    </div>
    <div className="activityRecommend">
      <h1 className="u-title"><i className="icon icon-more"></i>更多活动</h1>
      {vm.other_events ? vm.other_events.map(event => <ActivityCard vm={event} key={event.id} />) : '主办方暂无其他活动'}
    </div>
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
