import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import styles from './Header.css';
import Search from './search/Search';

export default class Header extends Component {

  handleSearch = ({ search }) => {
    this.setState({ topic: search }, this.searchCharacters);
  };


  render() {
    return (
      <header className={styles.header}>
        <div className="header-container">
          <h1>Marvel Heroes</h1>
        </div>
        <div className="search-container">
          <Search onSearch={this.handleSearch}/>
        </div>
      </header>
    );
  }
}