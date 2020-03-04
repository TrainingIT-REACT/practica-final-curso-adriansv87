import React, { Component, Suspense } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {transformarSegundos} from '../Commom/Funciones';
import store from '../store';
import { connect } from 'react-redux';
import './App.css';

// Acciones
import { getSongs, getSongsFilterByAlbumId } from '../actions/actionCanciones';

const Lista = React.lazy(() => import('../Commom/Lista'));

class Inicio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      listaIdsCancionesEscuchadas : [],
      listaIdsCancionesAlbumsVis : [],
      listaIdsCancionesRandom : [],
      tiempoTotal : '',
      tiempoTotalSongEsc : '',
      tiempoTotalAlbumVis : ''
    }
  }

  async componentDidMount() {
    const {reducerCanciones, reducerAlbums, ...resto} = this.props;
    var listaCancionesEscuchadas = reducerCanciones.reducerCancionesEscuchadas.cancionesEscuchadas;
    var listaAlbumsVisitados = reducerAlbums.reducerAlbumsVisitados.albumsVisitados;

    if ((listaAlbumsVisitados == undefined || listaAlbumsVisitados.length < 1) && (listaCancionesEscuchadas == undefined || listaCancionesEscuchadas.length < 1)) {
      // cargarListaSongsRandom
    }
/*
    this.props.getSongs(this.props.match.params.id);
    this.props.getSongsFilterByAlbumId(this.props.match.params.album_id);
*/
  }

  cargaListaCancionesEscuchadas(jsonCanciones) {
    if ((store.getState().reducerCanciones.cancionesEscuchadas != null) && (store.getState().reducerCanciones.cancionesEscuchadas.length > 0)) {
      var idsLisCanciones = store.getState().reducerCanciones.cancionesEscuchadas;
      var songs = [];
      var acumulaTiempo = 0;
      jsonCanciones.filter(f => {
        idsLisCanciones.filter(e => {
          if(f.id == e){
            songs.push(f);
            acumulaTiempo += f.seconds;
          }
        })
      });
      this.setState({listaIdsCancionesEscuchadas:songs});
      this.setState({tiempoTotalSongEsc: acumulaTiempo});
    }
  }

  cargarListaSongsAlbumsVisitados(jsonCanciones) {
    if ((store.getState().albumsVisitados.albumsVisitados != null) && (store.getState().albumsVisitados.albumsVisitados.length > 0)) {
      var idsLisAlbums = store.getState().albumsVisitados.albumsVisitados;
      var idsLisCanciones = store.getState().reducerCanciones.cancionesEscuchadas;
      var songs = [];
      var acumulaTiempo = 0;

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
              acumulaTiempo += f.seconds;
            }
          }
        })
      });

      this.setState({listaIdsCancionesAlbumsVis: songs});
      this.setState({tiempoTotalAlbumVis: acumulaTiempo});
    }
  }

  cargarListaSongsRandom(jsonCanciones) {
    const {albumsVisitados, cancionesEscuchadas, ...resto} = this.props;
    if ((store.getState().albumsVisitados.albumsVisitados.length == 0) && (store.getState().reducerCanciones.cancionesEscuchadas == undefined)) {
      const min = 1;
      const max = 50;
      const numElem = 5;
      var idsLisSongsRandom = [];
      for (var i = 0; i < numElem; i++) {
        var numAl = Math.floor(Math.random()*(max - min + 1) + min);

        var anadirIdSong = true;
        idsLisSongsRandom.filter(f => {
          if(f == numAl) {
            i--;
            anadirIdSong = false;
          }
        });

        if (anadirIdSong) {
          idsLisSongsRandom.push(numAl);
        }
      }

      var songs = [];
      var acumulaTiempo = 0;
      jsonCanciones.filter(f => {
        idsLisSongsRandom.filter(e => {
          if(f.id == e){
            songs.push(f);
            acumulaTiempo += f.seconds;
          }
        })
      });
      this.setState({listaIdsCancionesRandom:songs});
      this.setState({tiempoTotal: acumulaTiempo});
    }
  }

  render() {
    const {reducerCanciones, reducerAlbums, ...resto} = this.props;
    var listaCancionesEscuchadas = reducerCanciones.reducerCancionesEscuchadas.cancionesEscuchadas;
    var listaAlbumsVisitados = reducerAlbums.reducerAlbumsVisitados.albumsVisitados;
    return (

      <div>
        <h1>Música Recomendada</h1>
        <p/>
          {listaCancionesEscuchadas.length > 0 ? 
            <div>
              <h5> 
                <button type="button" className='BotonSinBorde'>
                  <FontAwesomeIcon icon="redo" />
                </button>
                Canciones Escuchadas 
              </h5>
                { reducerCanciones.reducerCargaCanciones.isLoading ?
                  null :
                  <Suspense fallback={<div>Loading...</div>}>
                    <Lista objects={listaCancionesEscuchadas} tempoTotal={transformarSegundos(listaCancionesEscuchadas)} tipoLista={false}/>
                  </Suspense>
                }
            </div>
          : <div/> }

          {listaAlbumsVisitados.length > 0 ? 
            <div>
              <h5> 
                <button type="button" className='BotonSinBorde'>
                  <FontAwesomeIcon icon="headphones" />
                </button>
                Canciones no escuchadas de Albums Visitados 
              </h5>
                { this.state.loading ?
                  null :
                  <Suspense fallback={<div>Loading...</div>}>
                    <Lista objects={this.state.listaIdsCancionesAlbumsVis} tempoTotal={transformarSegundos(this.state.tiempoTotalAlbumVis)} tipoLista={false}/>
                  </Suspense>
                }
            </div>
          : <div/> }

          {this.state.listaIdsCancionesEscuchadas.length == 0 && this.state.listaIdsCancionesAlbumsVis.length == 0 ? 
            <div>
              <h5> 
                <button type="button" className='BotonSinBorde'>
                  <FontAwesomeIcon icon="info" />
                </button>
                Sugerencias para este momento 
              </h5>
                { this.state.loading ?
                  null :
                  <Suspense fallback={<div>Loading...</div>}>
                    <Lista objects={this.state.listaIdsCancionesRandom} tempoTotal={transformarSegundos(this.state.tiempoTotal)} tipoLista={false}/>
                  </Suspense>
                }
            </div>
          : <div/> }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state
});

const mapDispatchToProps = (dispatch) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Inicio);
