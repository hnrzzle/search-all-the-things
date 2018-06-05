import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Header from './Header';
import Search from '../search/Search';
import CharDetail from '../characters/CharDetail';

import './App.css';

export default class App extends Component {

  state = {
    topic: '',
    loading: false,
    error: null,
    totalResults: 0,
    page: 1,
    perPage: 20,
    characters: null,
    attributionHTML: ''
  };
  
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
            <Route exact path="/characters/:id" render={({ match, history }) => {
              return <CharDetail marvelID={match.params.id} history={history}/>;
            }}/>
            {/* <Redirect to="/"/> */}
          </main>
        </div>
      </Router>
    );
  }
}