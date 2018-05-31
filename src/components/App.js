import React, { Component } from 'react';
import { search } from '../services/marvelApi';
import Search from './Search';



export default class App extends Component {

  state = {
    topic: '',
    loading: false,
    error: null,
    totalResults: 0,
    page: 1,
    perPage: 20,
    characters: []
  }

  handleSearch = ({ search }) => {
    this.setState({ topic: search }, this.searchCharacters);
  }

  searchCharacters = () => {
    const { topic, page, perPage } = this.state;


    search({ topic }, { page, perPage })
      .then(({ articles, totalResults }) => {
        this.setState({ articles, totalResults, error: null });
      }, error => {
        this.setState({ error });
      })
      .then(() => this.setState({ loading: false }));

  };

  render() {



    return(
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
      </main>
    </div>
    );
  }



}