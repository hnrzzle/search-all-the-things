import React, { Component } from 'react';
import Character from './Character';
import styles from './Characters.css';

export default class Articles extends Component {

  render() {
    const { characters } = this.props;

    return (
      <ul className={styles.characters}>
        {characters.map((character, i) => (
          <Character key={i} character={character}/>
        ))}
      </ul>
    );
  }

}