import React from 'react';
import AppBar from 'material-ui/AppBar';
import { routerRedux } from 'dva/router';

import {  } from '../components/Icons';

function filterTitle(pathname) {
	let titleObj = {
		'/': '主页',
		'/liked': '关注',
		'/about': '我的'
	};
	return titleObj[pathname] || '未知路径';
}

const Navbar = ({ location, dispatch }) => {
  return (
    <AppBar
      title={filterTitle(location.pathname)}
      iconClassNameRight="muidocs-icon-navigation-expand-more"
    />
  );
};

Navbar.propTypes = {
};

export default Navbar;