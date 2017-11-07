import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './App.less';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Tabbar from '../components/Tabbar';
import Navbar from '../components/Navbar';
import Toast from '../components/common/Toast';
import injectTapEventPlugin from 'react-tap-event-plugin';
import auth from '../utils/auth';
import utils from '../utils/utils';
import moment from 'moment';
import Dialog from 'material-ui/Dialog';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import appService from '../services/app';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
auth.initToken();
auth.initAdminToken();
if(utils.is_wx) {
  appService.getWechatSdk()
    .then(({ res, err }) => {
      if(res) auth.initWechatSdk(res);
    });
}
moment.locale('zh-cn');

const muiTheme = getMuiTheme({
  card: {
    fontWeight: 'bold'
  },
  tabs: {
    backgroundColor: '#fff',
    textColor: '#7e848c',
    selectedTextColor: '#e1274c'
  },
  bottomNavigation: {
    backgroundColor: '#eceeef',
    unselectedColor: '#7e848c',
    selectedColor: '#e1274c',
    height: 56,
    unselectedFontSize: 12,
    selectedFontSize: 12,
  },
  dialog: {
    titleFontSize: 14,
    bodyFontSize: 14
  }
});

class App extends Component{
  constructor(props){
    super(props);
    this.state = {};
  }
  componentDidMount(){
    if(auth.token) this.props.dispatch({ type: 'about/getMyInfo' });
  }
  render(){
    const { location, children, dispatch, title, collected, eventId } = this.props;
    const rootPages = ['/', '/liked', '/about'];
    return <MuiThemeProvider muiTheme={muiTheme} >
      <div>
        <div className={styles.header} style={{position: rootPages.indexOf(location.pathname) !== -1 ? 'absolute' : 'fixed'}}>
          <Navbar location={location} dispatch={dispatch} title={title} collected={collected} eventId={eventId} />
        </div>
        <div className={styles.content} style={{paddingBottom: rootPages.indexOf(location.pathname) !== -1 ? '56px' : '0'}}>
          {children}
        </div>
        <div className={styles.footer}>
          <Tabbar location={location} dispatch={dispatch} />
        </div>
      </div>
    </MuiThemeProvider>;
  }
}

export default connect(({ app, about }) => ({
  title: app.title,
  collected: app.event.has_collect,
  eventId: about.activeTicket.event.id,
}))(App);
