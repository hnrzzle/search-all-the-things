import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { search } from '../services/marvelApi';
import Header from './Header';
import Search from '../components/search/Search';
import Characters from './Characters';
import CharDetail from './CharDetail';
import Paging from './Paging';

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
  
  searchCharacters = () => {
    const { topic, page, perPage } = this.state;
    
    this.setState({ loading: true });

    search({ topic }, { page, perPage })
      .then(({ attributionHTML, data }) => { //eslint-disable-line
        const totalResults = data.total;
        const characters = data.results;
        this.setState({ characters, totalResults, error: null });
      }, error => {
        this.setState({ error });
      })
      .then(() => this.setState({ loading: false }));

  };

  handlePage = ({ page }) => {
    this.setState({ page }, this.searchCharacters);
  };

  render() {
    const { characters, page, perPage, totalResults, topic } = this.state;


    return (
      <Router>
        <div>
          <Header/>
          <main>
            <Switch>
              {/* <Route exact path="/" component={Home}/>a */}
              <Route exact path="/search" component={Search}/>
              </Switch>
              {/* <Route exact path="/char/:id" render={({ match, history }) => {
                return <CharDetail marvelID={match.params.id} history={history}/>;
              }}/>
              <Redirect to="/"/>
            {topic &&
              <Paging 
                topic={topic}
                totalResults={totalResults}
                page={page}
                perPage={perPage}
                onPage={this.handlePage}/>}
            {characters ?
              <Characters characters={characters}/>
              : 'Please input a search!'} */}
          </main>
        </div>
      </Router>
    );
  }
}