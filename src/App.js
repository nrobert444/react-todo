import React { Component } from 'react';
import TodoApp from './todoApp.js';
import './App.css';
import { 
    BrowserRouter as Router, 
    Route, 
    Switch,
 } from 'react-router-dom';


 export default class App extends Component {
   render () {
    return (
      <div className="App">
          <header>
              my header
          </header>
          <Router>
              <Switch>
                  <Route exact path="/" component={ TodoApp }/>
              </Switch>
          </Router>
      </div>
    );
  }
};

