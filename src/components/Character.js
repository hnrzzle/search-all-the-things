import React, { Component } from 'react';

export default class Character extends Component {

  render() {
    const { name, description, thumbnail } = this.props.character;

    const imgSize = '/portrait_fantastic';
    const { path, extension } = thumbnail;

    const imgLink = `${path}${imgSize}.${extension}`

    return(
      <li>
        <h2>{name}</h2>
        <img src={imgLink}/>
        <p>{description}</p>
      </li>
    );
  }
}