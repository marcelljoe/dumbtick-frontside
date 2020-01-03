import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Container} from 'semantic-ui-react';
import Home from './Home';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import EventsByCategory from './EventsByCategory';
import EventDetail from './EventDetail';
import Profile from './Profile';
import EditProfile from './EditProfile';
import Payment from './Payment';


export default class App extends Component {
render(){
return (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/category/:id/events" component={EventsByCategory} />
      <Route exact path="/event/:id/detail" component={EventDetail} />
      <Route exact path="/profile/:id" component={Profile} />
      <Route path="/profile/:id/edit" component={EditProfile} />
      <Route path="/payment" component={Payment} />
    </div>
  </Router>
);
  }
}
