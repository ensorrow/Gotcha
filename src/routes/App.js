import React from 'react';
import { connect } from 'dva';
import styles from './App.less';
import PullViewWrap from '../components/common/PullViewWrap';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Tabbar from '../components/Tabbar';
import Navbar from '../components/Navbar';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

function App({ location, children, dispatch }) {
  return (
    <MuiThemeProvider>
    	<div>
				<div className={styles.header}>
					<Navbar location={location} dispatch={dispatch} />
				</div>
				<PullViewWrap
					statusDivStyleClass="pullWrap"
					onPullEnd={() => dispatch({type: 'home/getList'})}
				>
			    <div className={styles.content}>
						{children}
			    </div>
		    </PullViewWrap>
		    <div className={styles.footer}>
					<Tabbar location={location} dispatch={dispatch} />
		    </div>
	    </div>
	  </MuiThemeProvider>
  );
}

function mapStateToProps() {
  return {
  	
  };
}

export default connect(mapStateToProps)(App);
