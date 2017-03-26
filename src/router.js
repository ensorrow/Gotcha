import React from 'react';
import { IndexRoute, Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import IndexDetail from './routes/home/Detail';

import Liked from "./routes/Liked.js";

import About from "./routes/About.js";

import App from "./routes/App.js";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
    	<Route path="/" component={App} >
	      <IndexRoute component={IndexPage} />
	      <Route path="/detail" component={IndexDetail} />
	      <Route path="/liked" component={Liked} />
	      <Route path="/about" component={About} />
      </Route>
    </Router>
  );
}

export default RouterConfig;
