import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './SearchForm.css';

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
      <div className={styles.searchForm}>
        <form onSubmit={this.handleSubmit}>
          <input value={current}
            placeholder="Search..."
            onChange={this.handleChange}/>
          <button className="search-button">
            <div className="search-icon"></div>
          </button>
        </form>
        <section className="notifications">
          {loading && <div>Loading...</div>}
          {error && <div>Error :( {error.message}</div>}
        </section>
      </div>
    );
  }
}