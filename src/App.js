import React, { Component } from 'react';
import TodoApp from './todoApp.js';
import './App.css';
import { 
    BrowserRouter as Router, 
    Route, 
    Redirect,
 } from 'react-router-dom';
 import TodoAppLogin from './todoAppLogin.js';

 const isLoggedIn = () => JSON.parse(localStorage.getItem('user'));

 export default class App extends Component {
   render () {
    return (
      <div className='App'>
          <header>
              My Todo List App
          </header>
          <Router>
              <Route path='/' render={() => 
                isLoggedIn() 
                    ? <TodoApp />
                    : <Redirect to='login' />
                }/>
                  <Route exact path='/login' component={ TodoAppLogin } />
          </Router>
      </div>
    );
  }
};

