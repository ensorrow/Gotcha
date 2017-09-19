import React from 'react';
import AppBar from 'material-ui/AppBar';
import { routerRedux } from 'dva/router';
import IconButton from 'material-ui/IconButton';
import NavigationLeft from 'material-ui/svg-icons/navigation/arrow-back';
import Favorite from 'material-ui/svg-icons/action/favorite-border';
import SearchIcon from 'material-ui/svg-icons/action/search';
import {  } from '../components/Icons';
import {Link} from 'dva/router';

function leftBtn(pathname, dispatch) {
	const rootPages = ['/', '/liked', '/about'];
	if(rootPages.toString().indexOf(pathname) > -1)
		return null;
	else
		return <IconButton onTouchTap={() => dispatch(routerRedux.go(-1))}><NavigationLeft /></IconButton>;
}

const titleOrg = <span><span>推荐主办方</span><span className="txt-b" style={{marginLeft: '32px'}}><Link to="/recommend/user">推荐用户</Link></span></span>
const titleUser = <span><span className="txt-b"><Link to="/recommend/org">推荐主办方</Link></span><span style={{marginLeft: '32px'}}>推荐用户</span></span>
function titleNode(pathname, title) {
  if(title) return <h1>{title}</h1>
  var titles = {
    '/': null,
    '/search': null,
    '/recommend/user': titleUser,
    '/recommend/org': titleOrg
  }
  return titles[pathname];
}
function rightBtn(pathname, dispatch) {
	if(pathname === '/detail') return <IconButton><Favorite /></IconButton>;
	if(pathname === '/' || pathname === '/liked') return <IconButton><SearchIcon /></IconButton>;
}

const Navbar = ({ location, dispatch }) => {
  const transPages = ['/detail', '/author', '/user'];
  return (
    <AppBar
      iconElementLeft={leftBtn(location.pathname, dispatch)}
      iconElementRight={rightBtn(location.pathname, dispatch)}
      iconStyleLeft={{alignSelf: 'center',marginTop: 0}}
      iconStyleRight={{alignSelf: 'center',marginTop: 0}}
      title={titleNode(location.pathname)}
      style={transPages.indexOf(location.pathname) !== -1 ? {backgroundColor: 'rgba(0,0,0,0)',boxShadow: 'none'} : null}
    />
  );
};

Navbar.propTypes = {
};

export default Navbar;