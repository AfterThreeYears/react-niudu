import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import V2EX from './Component/V2EX';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <h1>h1</h1>
          <Route exact path="/v2ex" component={V2EX} />
        </div>
      </Router>
    );
  }
}

export default App;
