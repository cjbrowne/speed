import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Dashboard from './views/Dashboard';
import CarEditor from './views/CarEditor';
import TestSession from './views/TestSession';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/car/new" component={CarEditor} />
            <Route path="/car/:carId/edit" component={CarEditor} />
            <Route path="/car/:carId/test" component={TestSession} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
