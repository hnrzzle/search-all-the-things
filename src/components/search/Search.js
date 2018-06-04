import React, { Component } from 'react';
import Characters from '../Characters';
import SearchForm from '../search/SearchForm';
import { search } from '../../services/marvelApi';
import PropTypes from 'prop-types';
import queryString from 'query-string';

const getSearch = location => location ? location.search : '';

export default class Search extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  };

  state = {
    characters: null,
    toalResults: 0,
    error: null,
    searchTerm: '',
    page: 1
  };

  componentDidMount() {
    this.searchFromQuery(this.props.location.search);
  }

  UNSAFE_componentWillReceiveProps({ location }) {
    const next = getSearch(location);
    const current = getSearch(this.props.location);
    if(current === next) return;
    this.searchFromQuery(next);
  }

  searchFromQuery(query) {
    const { search: searchTerm } = queryString.parse(query);
    this.setState({ searchTerm });
    if(!searchTerm) return;
    
    search(searchTerm, 1, 10)
      .then(({ data }) => {
        console.log(data);
        const totalResults = data.total;
        const characters = data.results;
        this.setState({ characters, totalResults, error: null });
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  handleSearch = searchTerm => {
    this.setState({ error: null });

    this.props.history.push({
      search: searchTerm ? queryString.stringify({ search: searchTerm }) : ''
    });
  };

  render() {
    const { characters, error, searchTerm } = this.state;

    return (
      <div>
        <SearchForm searchTerm={searchTerm} onSearch={this.handleSearch}/>
        {error && <div>{error}</div>}
        {(!error && characters) && <Characters characters={characters}/>}
      </div>
    );
  }
}