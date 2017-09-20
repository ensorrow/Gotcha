import React from 'react';
import { connect } from 'dva';
import styles from './About.less';
import NameCard from '../components/about/NameCard';
import {List, ListItem} from 'material-ui/List';
import { AboutIcon } from '../components/Icons';
import TicketList from '../components/about/TicketList';
import Divider from 'material-ui/Divider';
import {Link} from 'dva/router';

const tmpData = [
	{title: '哈哈的撒',date: '2016-4-5'},
	{title: '哈哈的撒哈哈的撒哈哈的撒哈',date: '2016-4-5'},
	{title: '哈哈的撒',date: '2016-4-5'}
]

function About({ dispatch, about }) {
  return (
    <div>
      <NameCard isDetail={about.isDetail} dispatch={dispatch} />
			<List>
	      <ListItem primaryText="我的入场券" leftIcon={<AboutIcon />} rightIconButton={<Link className="list-right" to="/about/tickets">查看全部</Link>} />
	      <Divider inset={true} />
	      <TicketList dataArr={tmpData} />
	      <ListItem primaryText="我的收藏" leftIcon={<AboutIcon />} />
	      <Divider inset={true} />
	      <ListItem primaryText="我的关注" leftIcon={<AboutIcon />} />
	      <Divider inset={true} />
	      <ListItem primaryText="我的粉丝" leftIcon={<AboutIcon />} />
	    </List>
    </div>
  );
}

function mapStateToProps(state) {
  return {
  	about: state.about
  };
}

export default connect(mapStateToProps)(About);
