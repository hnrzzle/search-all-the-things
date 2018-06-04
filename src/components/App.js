import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { search } from '../services/marvelApi';
import Search from './Search';
import Characters from './Characters';
import Paging from './Paging';



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

  handleSearch = ({ search }) => {
    this.setState({ topic: search }, this.searchCharacters);
  };

  handlePage = ({ page }) => {
    this.setState({ page }, this.searchCharacters);
  };


  render() {
    const { characters, page, perPage, totalResults, loading, error, topic } = this.state;


    return (
      <Router>
        <div>
          <header>
            <div className="header-container">
              <h1>Marvel Heroes</h1>
            </div>
            <div className="search-container">
              <Search onSearch={this.handleSearch}/>
            </div>
          </header>

          <main>
            <section className="notifications">
              {loading && <div>Loading...</div>}
              {error && <div>Error :( {error.message}</div>}
            </section>
            {topic &&
              <Paging 
                topic={topic}
                totalResults={totalResults}
                page={page}
                perPage={perPage}
                onPage={this.handlePage}/>}
            {characters ?
              <Characters characters={characters}/>
              : 'Please input a search!'}
          </main>
        </div>
      </Router>
    );
  }
}