import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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

    console.log('character detail!!', character);

    const imgSize = '/portrait_fantastic';
    const { path, extension } = thumbnail;

    const imgLink = `${path}${imgSize}.${extension}`;

    const wikiLink = urls.find(i => i.type === 'wiki');
    console.log(wikiLink);

    return (
      <article>
        <div>
          <h2>{name}</h2>
          <img src={imgLink}/>
          <p>{description}</p>
          <p>{name} appears in <span className="comicNumber">{comics.available}</span> comics in the Marvel Universe</p>
          <a href={wikiLink.url}>Link to Marvel Wiki</a>
        </div>
      </article>
    );
  }


}