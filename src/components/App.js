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
    characters: [],
    attributionHTML: ''
  }
  
  searchCharacters = () => {
    const { topic, page, perPage } = this.state;


    search({ topic }, { page, perPage })
      .then(({ attributionHTML, data }) => {
        const totalResults = data.total;
        const characters = data.results;
        console.log(characters);
        this.setState({ characters, totalResults, error: null });
      }, error => {
        this.setState({ error });
      })
      .then(() => this.setState({ loading: false }));

  };

  handleSearch = ({ search }) => {
    this.setState({ topic: search }, this.searchCharacters);
  }


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