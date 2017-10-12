import React from 'react';
import { connect } from 'dva';
import styles from './About.less';
import NameCard from '../components/about/NameCard';
import { List, ListItem } from 'material-ui/List';
import { AboutIcon } from '../components/Icons';
import TicketList from '../components/about/TicketList';
import Divider from 'material-ui/Divider';
import { Link, routerRedux } from 'dva/router';

function About({ dispatch, about }) {
  return (
    <div className="m-about">
      <NameCard isDetail={about.isDetail} dispatch={dispatch} vm={about.myInfo} />
      <ul className="u-list">
          <li><i className="icon icon-ticket"></i><span>我的入场券 <Link className="list-right" to="/about/tickets">查看全部</Link></span></li>
          <TicketList vm={about.tickets} />
          <li onClick={() => dispatch(routerRedux.push({ pathname: '/about/collects' }))}><i className="icon icon-collect"></i>我的收藏</li>
          <li onClick={() => dispatch(routerRedux.push({ pathname: '/about/follows' }))}><i className="icon icon-mylike"></i>我的关注</li>
          <li onClick={() => dispatch(routerRedux.push({ pathname: '/about/fans' }))}><i className="icon icon-fan"></i>我的粉丝</li>
      </ul>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    about: state.about,
  };
}

export default connect(mapStateToProps)(About);
