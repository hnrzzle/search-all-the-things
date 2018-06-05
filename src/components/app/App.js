import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Header from './Header';
import Search from '../search/Search';
import CharDetail from '../characters/CharDetail';
import All from '../characters/All';

import './App.css';

export default class App extends Component {

  
  render() {

    return (
      <Router>
        <div>
          <Header/>
          <main>
            <Switch>
              {/* <Route exact path="/" component={Home}/>a */}
              <Route exact path="/search" component={Search}/>
            </Switch>
            <Route exact path="/characters" component={All}/>
            <Route exact path="/characters/:id" render={({ match, history }) => {
              return <CharDetail marvelID={match.params.id} history={history}/>;
            }}/>
            <Redirect to="/"/>
          </main>
        </div>
      </Router>
    );
  }
}