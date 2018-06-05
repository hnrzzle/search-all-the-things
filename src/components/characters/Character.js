import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default class Character extends Component {

  render() {
    const { name, id, thumbnail } = this.props.character;

    const marvelID = id;
    const imgSize = '/portrait_fantastic';
    const { path, extension } = thumbnail;

    const imgLink = `${path}${imgSize}.${extension}`;

    return (
      <li>
        <Link to={`/characters/${marvelID}`}>
          <h2>{name}</h2>
          <img src={imgLink}/>
        </Link>
      </li>
    );
  }
}