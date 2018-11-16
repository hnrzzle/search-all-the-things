import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Header from './Header';
import Search from '../search/Search';
import CharDetail from '../characters/CharDetail';
import Home from '../characters/Home';

import './App.css';

export default class App extends Component {

  
  render() {

    return (
      <Router>
        <div className="app">
          <Header/>
          <main>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/search" component={Search}/>
            </Switch>
            <Route exact path="/characters/:id" render={({ match, history }) => {
              return <CharDetail marvelID={match.params.id} history={history}/>;
            }}/>
            <Redirect to="/"/>
          </main>
          <div className="push"></div>
        </div>
      </Router>
    );
  }
}