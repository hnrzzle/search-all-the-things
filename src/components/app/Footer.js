import React, { Component } from 'react';
import styles from './Footer.css';

class Footer extends Component {
  render() {
    return (
      <footer className={styles.footer}>
        Data provided by Marvel. © 2018 Marvel
      </footer>
    );
  }
}

export default Footer;