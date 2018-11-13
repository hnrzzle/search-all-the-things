import React, { Component } from 'react';
import Characters from '../characters/Characters';
import PropTypes from 'prop-types';
import { getAllChars } from '../../services/marvelApi';

export default class Search extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  };

  state = {
    characters: null,
    error: null
  };

  UNSAFE_componentWillMount() {
    getAllChars()
      .then(({ data }) => {
        const characters = data.results;
        this.setState({ characters });
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


    const { characters } = this.state;

    if(characters === null) return null;

    return (
      <div>
        <Characters characters={characters}/>
      </div>
    );
  }
  
}