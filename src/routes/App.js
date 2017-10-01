import React from 'react';
import { connect } from 'dva';
import styles from './App.less';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Tabbar from '../components/Tabbar';
import Navbar from '../components/Navbar';
import injectTapEventPlugin from 'react-tap-event-plugin';
import auth from '../utils/auth';
import moment from 'moment';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
auth.initToken();
moment.locale('zh-cn');

function App({ location, children, dispatch, title, collected }) {
  return (
    <MuiThemeProvider>
      <div>
        <div className={styles.header}>
          <Navbar location={location} dispatch={dispatch} title={title} collected={collected} />
        </div>
        <div className={styles.content}>
          {children}
        </div>
        <div className={styles.footer}>
          <Tabbar location={location} dispatch={dispatch} />
        </div>
      </div>
    </MuiThemeProvider>
  );
}

function mapStateToProps(state) {
  return {
    title: state.app.title,
    collected: state.app.event.has_collect
  };
}

export default connect(mapStateToProps)(App);
