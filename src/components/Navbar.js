import React from 'react';
import AppBar from 'material-ui/AppBar';
import { routerRedux } from 'dva/router';
import IconButton from 'material-ui/IconButton';
import NavigationLeft from 'material-ui/svg-icons/navigation/arrow-back';
import Favorite from 'material-ui/svg-icons/action/favorite-border';
import SearchIcon from 'material-ui/svg-icons/action/search';
import IconAdd from 'material-ui/svg-icons/content/add-circle-outline';
import './Navbar.less';
import { Link } from 'dva/router';
import TextField from 'material-ui/TextField';

function leftBtn(pathname, dispatch) {
  const rootPages = ['/', '/liked', '/about'];
  if (rootPages.toString().indexOf(pathname) > -1) { return null; } else		{ return <IconButton onTouchTap={() => dispatch(routerRedux.go(-1))}><NavigationLeft /></IconButton>; }
}

const titleOrg = <span className="titleWra"><span>推荐主办方</span><span style={{ marginLeft: '32px' }}><Link to="/recommend/user">推荐用户</Link></span></span>;
const titleUser = <span className="titleWra"><span><Link to="/recommend/org">推荐主办方</Link></span><span style={{ marginLeft: '32px' }}>推荐用户</span></span>;
const titleInput = <TextField hintText="输入搜索内容" />;

function titleNode(pathname, title) {
  if (title && pathname === '/detail') return title;
  const titles = {
    '/': null,
    '/search': titleInput,
    '/liked/recommend/user': titleUser,
    '/liked/recommend/org': titleOrg,
    '/about/tickets': '我的入场券',
  };
  return titles[pathname];
}
function rightBtn(pathname, dispatch) {
  if (pathname === '/detail') return <IconButton><Favorite /></IconButton>;
  if (pathname === '/' || pathname === '/liked') return <IconButton onClick={() => dispatch(routerRedux.push({ pathname: '/search' }))} ><SearchIcon /></IconButton>;
  if (pathname === '/search') return <IconButton ><SearchIcon /></IconButton>;
  if (pathname === '/about/tickets') return <Link to="/about/addticket"><IconAdd color="white" /></Link>;
}

const Navbar = ({ location, dispatch, title }) => {
  const transPages = ['/detail', '/author', '/user'];
  return (
    <AppBar
      iconElementLeft={leftBtn(location.pathname, dispatch)}
      iconElementRight={rightBtn(location.pathname, dispatch)}
      iconStyleLeft={{ alignSelf: 'center', marginTop: 0 }}
      iconStyleRight={{ alignSelf: 'center', marginTop: 0 }}
      title={titleNode(location.pathname, title)}
      titleStyle={{ fontSize: '16px' }}
      style={transPages.indexOf(location.pathname) !== -1 ? { backgroundColor: 'rgba(0,0,0,0)', boxShadow: 'none' } : null}
      className="m-navbar"
    />
  );
};

export default Navbar;
