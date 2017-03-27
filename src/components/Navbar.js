import React from 'react';
import AppBar from 'material-ui/AppBar';
import { routerRedux } from 'dva/router';
import IconButton from 'material-ui/IconButton';
import NavigationLeft from 'material-ui/svg-icons/navigation/arrow-back';
import Favorite from 'material-ui/svg-icons/action/favorite-border';
import SearchIcon from 'material-ui/svg-icons/action/search';
import {  } from '../components/Icons';

function leftBtn(pathname, dispatch) {
	let rootPages = ['/', '/liked', '/about'];
	if(rootPages.toString().indexOf(pathname) > -1)
		return null;
	else
		return <IconButton onTouchTap={() => dispatch(routerRedux.go(-1))}><NavigationLeft /></IconButton>;
}

function rightBtn(pathname, dispatch) {
	if(pathname === '/detail') return <IconButton><Favorite /></IconButton>;
	if(pathname === '/' || pathname === '/liked') return <IconButton><SearchIcon /></IconButton>;
}

const Navbar = ({ location, dispatch }) => {
  return (
    <AppBar
      iconElementLeft={leftBtn(location.pathname, dispatch)}
      iconElementRight={rightBtn(location.pathname, dispatch)}
      iconStyleLeft={{alignSelf: 'center',marginTop: 0}}
      iconStyleRight={{alignSelf: 'center',marginTop: 0}}
      style={location.pathname === '/detail' ? {backgroundColor: 'rgba(0,0,0,0)',boxShadow: 0} : null}
    />
  );
};

Navbar.propTypes = {
};

export default Navbar;