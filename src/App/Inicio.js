import React, { Component } from 'react';
import bootstrap from "bootstrap"; // eslint-disable-line no-unused-vars
import Header from '../Commom/Header';
import {BrowserRouter as Router} from 'react-router-dom';
import Lista from '../Commom/Lista';

// Css
import './App.css';

class Inicio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      albums: []
    }
  }

  async componentDidMount() {
    try {
      var res = await fetch('/songs');
      var json = await res.json();
      this.setState((prevState) => ({
        ...prevState,
        loading: false,
        songs: json
      }));

      var objeto = null;
      json.filter(f => {
        if(f.id == this.props.match.params.id) {
          objeto = f;
        }
      });
      this.setState({song: objeto});
    } catch(err) {
      console.error("Error accediendo al servidor", err);
    }
  }

  render() {
    return (

      <div>
        <h1>Música Recomendada</h1>
        <p/>
            <p> Canciones </p>
            <p>
                { this.state.loading ?
                <p>Cargando...</p>
                : <Lista objects={this.state.songs}
                tipoLista={false}/>
                }
            </p>
      </div>
    );
  }
}

export default Inicio;
