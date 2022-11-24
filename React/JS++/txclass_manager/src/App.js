import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import IndexPage from './pages/Index.js'
import LoginPage from './pages/Login.js';
import DetailPage from './pages/sub/Detail.js';
import ListPage from './pages/sub/List.js'

function App() {
  return (
    <Router>
      <Switch>
        {/* /login 放在上面 */}
        <Route component={LoginPage} path='/login' />
        {/* <Route component={IndexPage} path='/' /> */}
        <Route path="/" render={props => (
          <IndexPage>
            <Switch>
              <Route component={ListPage} path='sub/list' />
              <Route component={DetailPage} path='sub/detail' />
            </Switch>
          </IndexPage>
        )} />
      </Switch>
    </Router>
  );
}

export default App;
