import React from 'react';
import { IndexRoute, Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import IndexDetail from './routes/home/Detail';
import Author from './routes/home/Author';
import User from './routes/about/User';
import FullList from './routes/home/FullList';

import Liked from "./routes/Liked.js";

import About from "./routes/About.js";

import App from "./routes/App.js";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
    	<Route path="/" component={App} >
	      <IndexRoute component={IndexPage} />
	      <Route path="/detail" component={IndexDetail} />
	      <Route path="/author" component={Author}/>
				<Route path="/author/activities" component={FullList}/>
	      <Route path="/liked" component={Liked} />
	      <Route path="/about" component={About} />
	      <Route path="/user" component={User}/>				
      </Route>
    </Router>
  );
}

export default RouterConfig;
