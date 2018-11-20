import React, { Component, Fragment } from 'react';
import Characters from '../characters/Characters';
import SearchForm from '../search/SearchForm';
import { search } from '../../services/marvelApi';
import Paging from '../app/Paging';
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
    totalResults: 0,
    error: null,
    searchTerm: '',
    page: 1,
    perPage: 20
  };

  componentDidMount() {
    this.searchFromQuery(this.props.location.search);
  }

  UNSAFE_componentWillReceiveProps({ location }) {
    const next = getSearch(location);
    console.log('next', next);
    const current = getSearch(this.props.location);
    if(current === next) return;
    this.searchFromQuery(next);
  }

  searchFromQuery(query) {
    const { search: searchTerm } = queryString.parse(query);
    this.setState({ searchTerm });
    if(!searchTerm) return;

    console.log(this.state.page);
    
    search(searchTerm, this.state)
      .then(({ data }) => {
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

  handlePage = ({ page }) => {
    this.setState({ page: page++ }, () => {
      this.searchFromQuery(this.props.location.search);
    });
  };

  render() {
    const { characters, error, searchTerm, totalResults, page, perPage } = this.state;

    return (
      <Fragment>
        <SearchForm searchTerm={searchTerm} onSearch={this.handleSearch}/>
        {error && <div>{error}</div>}
        {searchTerm &&
              <Paging 
                searchTerm={searchTerm}
                totalResults={totalResults}
                page={page}
                perPage={perPage}
                onPage={this.handlePage}/>}
        {characters ?
          <Characters characters={characters}/>
          : 'Please input a search!'}
      </Fragment>
      
    );
  }
}