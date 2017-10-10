import React from 'react';
import AppBar from 'material-ui/AppBar';
import { routerRedux } from 'dva/router';
import IconButton from 'material-ui/IconButton';
import NavigationLeft from 'material-ui/svg-icons/navigation/arrow-back';
import Favorite_b from 'material-ui/svg-icons/action/favorite-border';
import Favorite from 'material-ui/svg-icons/action/favorite';
import SearchIcon from 'material-ui/svg-icons/action/search';
import IconAdd from 'material-ui/svg-icons/content/add-circle-outline';
import './Navbar.less';
import { Link } from 'dva/router';
import TextField from 'material-ui/TextField';

let searchQuery = '';

function leftBtn(pathname, dispatch) {
  const rootPages = ['/', '/liked', '/about'];
  if (rootPages.toString().indexOf(pathname) > -1) { return <img src={require('../assets/images/logo.png')} className="logo" />; } else { return <IconButton onTouchTap={() => dispatch(routerRedux.go(-1))}><NavigationLeft /></IconButton>; }
}

const titleOrg = <span className="titleWra"><span>推荐主办方</span><span style={{ marginLeft: '32px' }}><Link to="/liked/recommend/user">推荐用户</Link></span></span>;

const titleUser = <span className="titleWra"><span><Link to="/liked/recommend/org">推荐主办方</Link></span><span style={{ marginLeft: '32px' }}>推荐用户</span></span>;

const titleInput = <TextField onChange={(e, v) => { searchQuery = v; }} hintText="输入搜索内容" />;

function titleNode(pathname, title) {
  if (title && pathname === '/detail') return title;
  const titles = {
    '/': null,
    '/search': titleInput,
    '/liked/recommend/user': titleUser,
    '/liked/recommend/org': titleOrg,
    '/about/tickets': '我的入场券',
    '/about/collects': '我的收藏',
    '/about/follows': '我的关注',
    '/about/fans': '我的粉丝',
    '/about/addticket': '新增入场券',
    '/about/ticketdetail': '入场券',
    '/about/profile': '个人资料',
    '/detail/comment': '评价',
    '/detail/confirm': '确认报名',
    '/login': '登录',
    '/reg': '注册',
  };
  return titles[pathname];
}

function rightBtn(pathname, query, dispatch, collected, ticketId) {
  if (pathname === '/detail') return <IconButton onClick={() => dispatch({ type: 'app/collect' })} >{collected ? <Favorite /> : <Favorite_b />}</IconButton>;
  if (pathname === '/' || pathname === '/liked') return <IconButton onClick={() => dispatch(routerRedux.push({ pathname: '/search' }))} ><SearchIcon /></IconButton>;
  if (pathname === '/search') return <IconButton ><SearchIcon onClick={() => dispatch({ type: 'app/search', payload: searchQuery })} /></IconButton>;
  if (pathname === '/login') return <Link to="/reg">注册</Link>;
  if (pathname === '/reg') return <Link to="/login">登录</Link>;
  if (pathname === '/about') return <Link to="/about/profile"><i className="icon-edit" /></Link>;
  if (pathname === '/about/tickets') return <Link to="/about/addticket"><IconAdd color="white" /></Link>;
  if (pathname === '/about/ticketdetail') return <Link to={`/detail?id=${ticketId}`}>查看活动</Link>;
  if (pathname === '/about/profile' && query.new == 1) return <Link to="/about">跳过</Link>;
}

const Navbar = (props) => {
  const { location, dispatch, title, collected, ticketId } = props;
  const transPages = ['/detail', '/author', '/user', '/about'];
  return (
    <AppBar
      iconElementLeft={leftBtn(location.pathname, dispatch)}
      showMenuIconButton={location.pathname !== '/about'}
      iconElementRight={rightBtn(location.pathname, location.query, dispatch, collected, ticketId)}
      iconStyleLeft={{ alignSelf: 'center', marginTop: 0 }}
      iconStyleRight={{ alignSelf: 'center', marginTop: 0 }}
      title={titleNode(location.pathname, title)}
      titleStyle={{ fontSize: '16px', height: '16.66667vw', lineHeight: '16.66667vw' }}
      style={transPages.indexOf(location.pathname) !== -1 ? { backgroundColor: 'rgba(0,0,0,0)', boxShadow: 'none' } : {backgroundColor: '#2e445c'}}
      className="m-navbar"
    />
  );
};

export default Navbar;
