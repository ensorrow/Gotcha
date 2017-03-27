import React from 'react';
import {List, ListItem} from 'material-ui/List';
import { connect } from 'dva';
import styles from './Detail.less';
import AuthorCard from '../../components/index/AuthorCard';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';

const ActivityCard = () => <div style={{margin: '10px 0'}} className="m-miniCard">
	<div className="imgWrapper">
		<img src={require('../../assets/test.png')} />
	</div>
	<div className="textWrapper">
		<h2>专业摄影师教你如何拍好柱子</h2>
		<h3>
			<Avatar src="http://lvzheyang.top/images/avatar.jpg" size={20} />
			<span>摄影师TOM</span>
			<span>·</span>
			<span>1256人参与</span>
		</h3>
	</div>
</div>;

function IndexDetail() {
	return <div className="m-detail">
		<img src={require('../../assets/test.png')} className={styles.topBg}/>
		<div className="baseInfo">
			<h1>杨静文的个人画展</h1>
			<h2><span>12.5</span>浏览：325 · 收藏：25</h2>
			<h3>2月17日，15：20-2月18日，17：00</h3>
			<h3>陕西省西安市碑林区咸宁犀利西安交通大学啦啦啦</h3>
		</div>
		<div className="progress">
			<span>报名中(200/400)</span>
			<span>
				剩余时间：125小时 20分 3秒
			</span>
		</div>
		<div className="activityInfo">
			<div style={{width: '580px'}}>
				<AuthorCard />
				<AuthorCard />
			</div>
		</div>
		<div className="activityDetail">
			<h1 className={styles.title}>活动详情</h1>
			<img src={require('../../assets/test.png')} />
			<p>我一直是用linux的习惯使用mac，所以这件事的步骤是，terminal->定位到指定位置->"touch xxx.txt"，所以有没有这个功能对我无所谓。那么Mac OS X 的Finder到底是为什么没有这个功能呢？我认为楼下几位的回答都太胡扯了。承认Mac在这个问题上不如Windows有那么难吗？都找了一些什么奇怪的理由啊！</p>
			<a>查看更多</a>
		</div>
		<div className="activityRecommend">
			<h1 className={styles.title}>更多活动</h1>
			<ActivityCard />
			<ActivityCard />
			<ActivityCard />
		</div>
		<div className="fixedBar">
			<span>报名中</span>
			<FlatButton 
				label="报名（￥25）"
				backgroundColor="red"
				style={{float: 'right',right: '20px'}}
			/>
		</div>
	</div>
}

export default IndexDetail;