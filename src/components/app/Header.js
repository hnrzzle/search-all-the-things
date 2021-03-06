import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.css';

export default class Header extends Component {

  handleSearch = ({ search }) => {
    this.setState({ topic: search }, this.searchCharacters);
  };

  render() {
    return (
      <header className={styles.header}>
        <Link to="/"><h1>Marvel Heroes</h1></Link>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/search">Search</Link></li>
        </ul>
      </header>
    );
  }
}