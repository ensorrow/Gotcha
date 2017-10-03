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
import Dialog from 'material-ui/Dialog';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
auth.initToken();
moment.locale('zh-cn');

function App(props) {
  const { location, children, dispatch, title, collected, showDialog, dialogContent, ticketId } = props;
  return (
    <MuiThemeProvider>
      <div>
        <div className={styles.header}>
          <Navbar location={location} dispatch={dispatch} title={title} collected={collected} ticketId={ticketId} />
        </div>
        <div className={styles.content}>
          {children}
        </div>
        <div className={styles.footer}>
          <Tabbar location={location} dispatch={dispatch} />
        </div>
        <Dialog open={showDialog} title={dialogContent} />
      </div>
    </MuiThemeProvider>
  );
}

export default connect(({ app, about }) => ({
  title: app.title,
  collected: app.event.has_collect,
  showDialog: app.showDialog,
  dialogContent: app.dialogContent,
  ticketId: about.activeTicket.id
}))(App);
