import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import styles from './Header.css';

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
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/search">Search</Link></li>
          <li><Link to="/about">About</Link></li>



        </ul>
      </header>
    );
  }
}