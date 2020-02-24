import React, { Component } from 'react';
import bootstrap from "bootstrap"; // eslint-disable-line no-unused-vars
import Header from '../Commom/Header';
import {BrowserRouter as Router} from 'react-router-dom';

// Css
import './App.css';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
        loading: true,
        albums: []
    }
  }

  async componentDidMount() {
    try {
      const res = await fetch('/albums');
      const json = await res.json();
      this.setState((prevState) => ({
        ...prevState,
        loading: false,
        albums: json
      }));
    } catch(err) {
      console.error("Error accediendo al servidor", err);
    }
  }

  render() {
    return (

        <div>
            <p> {this.props.match.params.filtro} </p>

            <p>
                { this.state.loading ?
                <p>Cargando...</p>
                : <ul>
                    {this.state.albums.map(album => <li key={album.id}>{album.name}</li>)}
                </ul>
                }
            </p>
        </div>
    );
  }
}

export default Search;
