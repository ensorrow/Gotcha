import React from 'react';
import { routerRedux } from 'dva/router';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';

import { HomeIcon, LikeIcon, AboutIcon } from '../components/Icons';

function filterLocation(pathname) {
	let pathObj = {
		'/': 0,
		'/liked': 1,
		'/about': 2
	};
	return pathObj[pathname] || 0;
}

function select(dispatch, path) {
	dispatch(routerRedux.push({
		pathname: path,
	}));
}

const Tabbar = ({ location, dispatch }) => {
  let rootPages = ['/', '/liked', '/about'];
  if(rootPages.toString().indexOf(location.pathname) === -1) return null;
  else return (
    <BottomNavigation selectedIndex={filterLocation(location.pathname)}>
      <BottomNavigationItem
        label="推荐"
        icon={<HomeIcon />}
        onTouchTap={() => select(dispatch, '/')}
      />
      <BottomNavigationItem
        label="关注"
        icon={<LikeIcon />}
        onTouchTap={() => select(dispatch, '/liked')}
      />
      <BottomNavigationItem
        label="我的"
        icon={<AboutIcon />}
        onTouchTap={() => select(dispatch, '/about')}
      />
    </BottomNavigation>
  );
};

Tabbar.propTypes = {
};

export default Tabbar;