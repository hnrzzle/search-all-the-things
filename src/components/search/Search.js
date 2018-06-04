import React, { Component } from 'react';
import Characters from '../Characters';
import SearchForm from '../search/SearchForm';
import { search } from '../../services/marvelApi';
import PropTypes from 'prop-types';
import queryString from 'query-string';

const getSearch = location => location ? location.search : '';

export default class Search extends Component {

  static PropTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  };

  state = {
    search: ''
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
  
  handleChange = ({ target }) => {
    this.setState({ search: target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSearch(this.state);
  };

  render() {
    const { search } = this.state;

    return (
      <form className="search-form" onSubmit={event => this.handleSubmit(event)}>
        <label>
          <input value={search} onChange={this.handleChange}/>
        </label>
        <button>Search</button>
      </form>
    );
  }
}