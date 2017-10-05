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
    <div>
      <NameCard isDetail={about.isDetail} dispatch={dispatch} vm={about.myInfo} />
      <List>
        <ListItem primaryText="我的入场券" leftIcon={<AboutIcon />} rightIconButton={<Link className="list-right" to="/about/tickets">查看全部</Link>} />
        <Divider inset />
        <TicketList dataArr={about.tickets} />
        <ListItem primaryText="我的收藏" onClick={() => dispatch(routerRedux.push({ pathname: '/about/collects' }))} leftIcon={<AboutIcon />} />
        <Divider inset />
        <ListItem primaryText="我的关注" onClick={() => dispatch(routerRedux.push({ pathname: '/about/follows' }))} leftIcon={<AboutIcon />} />
        <Divider inset />
        <ListItem primaryText="我的粉丝" onClick={() => dispatch(routerRedux.push({ pathname: '/about/fans' }))} leftIcon={<AboutIcon />} />
      </List>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    about: state.about,
  };
}

export default connect(mapStateToProps)(About);
