import React, { Component } from 'react';
import { search } from '../services/marvelApi';



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
    <main>
      <h1>Marvel Heroes</h1>
    </main>
    );
  }



}