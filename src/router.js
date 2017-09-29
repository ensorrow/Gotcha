import React from 'react';
import { IndexRoute, Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import IndexDetail from './routes/home/Detail';
import Author from './routes/home/Author';
import User from './routes/about/User';
import Tickets from './routes/about/Tickets';
import AddTicket from './routes/about/AddTicket';
import TicketDetail from './routes/about/TicketDetail';
import FullList from './routes/home/FullList';
import Search from './routes/home/Search';
import RecommendList from './routes/liked/RecommendList';

import Liked from './routes/Liked.js';

import About from './routes/About.js';
import Profile from './routes/about/Profile.js';

import Login from './routes/Login.js';

import App from './routes/App.js';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={App} >
        <IndexRoute component={IndexPage} />
        <Route path="/detail" component={IndexDetail} />
        <Route path="/search" component={Search} />
        <Route path="/author" component={Author} />
        <Route path="/author/activities" component={FullList} />
        <Route path="/liked" component={Liked} />
        <Route path="/about" component={About} />
        <Route path="/about/tickets" component={Tickets} />
        <Route path="/about/addticket" component={AddTicket} />
        <Route path="/about/ticketdetail" component={TicketDetail} />
        <Route path="/about/profile" component={Profile} />
        <Route path="/user" component={User} />
        <Route path="/login" component={Login} />
        <Route path="/liked/recommend/:type" component={RecommendList} />
      </Route>
    </Router>
  );
}

export default RouterConfig;
