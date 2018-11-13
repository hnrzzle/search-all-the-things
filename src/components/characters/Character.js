import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Character.css';
export default class Character extends Component {

  render() {
    const { name, id, thumbnail } = this.props.character;

    const marvelID = id;
    const imgSize = '/portrait_fantastic';
    const { path, extension } = thumbnail;

    const imgLink = `${path}${imgSize}.${extension}`;

    return (
      <li className={styles.character}>
        <Link to={`/characters/${marvelID}`}>
          <h2>{name}</h2>
          <img src={imgLink}/>
        </Link>
      </li>
    );
  }
}