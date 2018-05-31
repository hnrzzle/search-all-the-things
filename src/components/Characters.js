import React, { Component } from 'react';
import Character from './Character';

export default class Articles extends Component {

  render() {
    const { characters } = this.props;

    return (
      <ul>
        {characters.map((character, i) => (
          <Character key={i} character={character}/>
        ))}
      </ul>
    )
  }

}