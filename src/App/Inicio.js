import React, { Component } from 'react';
import bootstrap from "bootstrap"; // eslint-disable-line no-unused-vars
import Header from '../Commom/Header';
import {BrowserRouter as Router} from 'react-router-dom';
import Lista from '../Commom/Lista';
import store from '../store'; // Store
import * as escucharCancion from '../actions/actionEscucharCancion';

// Css
import './App.css';

class Inicio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      listaIdsCancionesEscuchadas : []
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
      this.cargaListaCancionesEscuchadas(json);
    } catch(err) {
      console.error("Error accediendo al servidor", err);
    }
  }

  cargaListaCancionesEscuchadas(json) {
    if ((store.getState().cancionesEscuchadas.cancionesEscuchadas != null) && (store.getState().cancionesEscuchadas.cancionesEscuchadas.length > 0)) {
      var idsLisCanciones = store.getState().cancionesEscuchadas.cancionesEscuchadas;
      var songs = [];
      json.filter(f => {
        idsLisCanciones.filter(e => {
          if(f.id == e){
            songs.push(f);
          }
        })
      });
      this.setState({listaIdsCancionesEscuchadas:songs});
    }
  }

  render() {
    return (

      <div>
        <h1>Música Recomendada</h1>
        <p/>
          {this.state.listaIdsCancionesEscuchadas.length > 0 ? 
            <div>
              <p> Canciones Escuchadas </p>
              <p>
                  { this.state.loading ?
                  <p>Cargando...</p>
                  : <Lista objects={this.state.listaIdsCancionesEscuchadas}
                  tipoLista={false}/>
                  }
              </p>
            </div>
          : <div/> }
      </div>
    );
  }
}

export default Inicio;
