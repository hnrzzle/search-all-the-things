import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import styles from './SearchForm.css';

export default class SearchForm extends Component {

  static propTypes = {
    searchTerm: PropTypes.string,
    onSearch: PropTypes.func.isRequired,
  };

  state = {
    current: this.props.searchTerm || '',
    loading: false,
    error: null
  };

  UNSAFE_componentWillReceiveProps({ searchTerm }) {
    if(searchTerm !== this.state.current) {
      this.setState({ current: searchTerm || '' });
    }
  }

  handleChange = ({ target }) => {
    this.setState({ current: target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.callSearch();
  };

  callSearch() {
    const { current } = this.state;
    if(!current) return;
    this.props.onSearch(current);
  }

  render() {

    const { current, loading, error } = this.state;

    return (
      <div>
        <form className="search-form" onSubmit={this.handleSubmit}>
          <label>
            <input value={current}
              placeholder="Please Input a Search"
              onChange={this.handleChange}/>
          </label>
          <button>Search</button>
        </form>
        <section className="notifications">
          {loading && <div>Loading...</div>}
          {error && <div>Error :( {error.message}</div>}
        </section>
      </div>
    );
  }
}