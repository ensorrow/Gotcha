import React from 'react';
import Avatar from 'material-ui/Avatar';
import { connect } from 'dva';
import FlatButton from 'material-ui/FlatButton';
import ArrowRight from 'material-ui/svg-icons/navigation/arrow-forward';
import styles from './Author.less';
import CommentBox from '../../components/index/CommentBox';
import ActivityCard from '../../components/index/ActivityCard';
import { routerRedux } from 'dva/router';

const tmpcomments = [
	'我一直是用linux的习惯使用mac，所以这件事的步骤是',
	'我一直是用linux的习惯使用mac，所以这件事的步骤是',
	'我一直是用linux的习惯使用mac，所以这件事的步骤是',
	'我一直是用linux的习惯使用mac，所以这件事的步骤是',
	'我一直是用linux的习惯使用mac，所以这件事的步骤是'
]
function Author({ toActivities }) {
	return <div className="m-author">
		<div className="profile">
			<Avatar src="http://lvzheyang.top/images/avatar.jpg" size={60} />
			<h1>Jack Spark</h1>
			<h2>加勒比海盗男主角</h2>
			<FlatButton label="关注" icon={<ArrowRight />} />
		</div>
		<dl>
			<div>
				<dd>5432</dd>
				<dt>活动数</dt>
			</div>
			<div>
				<dd>1300</dd>
				<dt>参与活动人次</dt>
			</div>
			<div>
				<dd>1600</dd>
				<dt>关注数</dt>
			</div>
		</dl>
		<div className="intro">
			<h1 className="u-title">个人介绍</h1>
			<p>我一直是用linux的习惯使用mac，所以这件事的步骤是，terminal->定位到指定位置->"touch xxx.txt"，所以有没有这个功能对我无所谓。那么Mac OS X 的Finder到底是为什么没有这个功能呢？我认为楼下几位的回答都太胡扯了。承认Mac在这个问题上不如Windows有那么难吗？都找了一些什么奇怪的理由啊！</p>
			<img src={require('../../assets/test.png')} />			
			<a className="u-more">查看更多</a>
		</div>
		<div className="activityRecommend u-card">
			<h1 className="u-title">他的活动</h1>
			<ActivityCard />
			<ActivityCard />
			<ActivityCard />
			<a className="u-more" onClick={toActivities.bind(null, {user: 'testuserid'})}>查看更多</a>
		</div>
		<CommentBox comments={tmpcomments} />
	</div>
}

function mapStateToProps(state){
	return {

	}
}
function mapDispatchToProps(dispatch){
	return {
		toActivities: (params) => {
			dispatch(routerRedux.push({
				pathname: '/author/activities',
				params
			}));
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Author);