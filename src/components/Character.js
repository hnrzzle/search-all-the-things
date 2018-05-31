import React, { Component } from 'react';

export default class Character extends Component {

  render() {
    const { name, description } = this.props.character;

    return(
      <li>
        <h2>{name}</h2>
      </li>
    );
  }
}