import React, { Component } from 'react';
import { Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import { Switch, Route } from 'react-router-dom';

import Login from './Login';
import Artists from './Artists';
import Albums from './Albums';

const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <div className="app">
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/artists" component={Artists} />
            <Route path="/albums/:id" component={Albums} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
