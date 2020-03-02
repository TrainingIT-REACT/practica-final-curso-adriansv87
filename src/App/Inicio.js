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
      listaIdsCancionesEscuchadas : [],
      listaIdsCancionesAlbumsVis : []
    }
  }

  async componentDidMount() {
    try {
      var res = await fetch('/songs');
      var jsonCanciones = await res.json();
      this.setState((prevState) => ({
        ...prevState,
        loading: false,
        songs: jsonCanciones
      }));

      var objeto = null;
      jsonCanciones.filter(f => {
        if(f.id == this.props.match.params.id) {
          objeto = f;
        }
      });
      this.setState({song: objeto});
      this.cargaListaCancionesEscuchadas(jsonCanciones);
      this.cargarListaSongsAlbumsVisitados(jsonCanciones);
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

  cargarListaSongsAlbumsVisitados(jsonCanciones) {
    if ((store.getState().albumsVisitados.albumsVisitados != null) && (store.getState().albumsVisitados.albumsVisitados.length > 0)) {
      var idsLisAlbums = store.getState().albumsVisitados.albumsVisitados;
      var idsLisCanciones = store.getState().cancionesEscuchadas.cancionesEscuchadas;
      var songs = [];

      jsonCanciones.filter(f => {
        idsLisAlbums.filter(e => {
          if(f.album_id == e){
            var rep = false;
            idsLisCanciones.filter(s => {
              if(f.id == s) {
                rep = true;
              }
            })

            if (!rep) {
              songs.push(f);
            }
          }
        })
      });

      this.setState({listaIdsCancionesAlbumsVis: songs});
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

          {this.state.listaIdsCancionesAlbumsVis.length > 0 ? 
            <div>
              <p> Canciones Albums Visitados No Escuchadas </p>
              <p>
                  { this.state.loading ?
                  <p>Cargando...</p>
                  : <Lista objects={this.state.listaIdsCancionesAlbumsVis}
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
