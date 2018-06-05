import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getChar } from '../../services/marvelApi';


export default class CharDetail extends Component {

  static propTypes = {
    marvelID: PropTypes.string.isRequired,
    history: PropTypes.object
  };

  state = {
    character: null,
    error: null
  };

  componentDidMount() {
    getChar(this.props.marvelID)
      .then(({ data }) => {
        const character = data.results;
        this.setState({ character });
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  handleBack = event => {
    event.preventDefault();
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { character } = this.state;
    if(character === null) return null;
    const { name, thumbnail, description, urls, comics } = character[0];

    const imgSize = '/portrait_fantastic';
    const { path, extension } = thumbnail;

    const imgLink = `${path}${imgSize}.${extension}`;

    const marvelLink = urls.find(i => i.type === 'detail');

    return (
      <article>
        <div>
          <h2>{name}</h2>
          <img src={imgLink}/>
          <p>{(description === '') ? 'No Description Given' : description}</p>
          <p>{name} appears in <span className="comicNumber">{comics.available}</span> comics in the Marvel Universe</p>
          {marvelLink && 
          <a href={marvelLink.url}>Additional information available at marvel.com</a>}
        </div>
      </article>
    );
  }
}