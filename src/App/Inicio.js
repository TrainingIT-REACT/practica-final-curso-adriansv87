import React, { Component, Suspense } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import store from '../store'; // Store
import {transformarSegundos} from '../Commom/Funciones';
import './App.css';

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
      this.cargarListaSongsRandom(jsonCanciones);
    } catch(err) {
      console.error("Error accediendo al servidor", err);
    }
  }

  cargaListaCancionesEscuchadas(jsonCanciones) {
    if ((store.getState().cancionesEscuchadas.cancionesEscuchadas != null) && (store.getState().cancionesEscuchadas.cancionesEscuchadas.length > 0)) {
      var idsLisCanciones = store.getState().cancionesEscuchadas.cancionesEscuchadas;
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
      var idsLisCanciones = store.getState().cancionesEscuchadas.cancionesEscuchadas;
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
    if ((store.getState().albumsVisitados.albumsVisitados.length == 0) && (store.getState().cancionesEscuchadas.cancionesEscuchadas.length == 0)) {
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
    return (

      <div>
        <h1>Música Recomendada</h1>
        <p/>
          {this.state.listaIdsCancionesEscuchadas.length > 0 ? 
            <div>
              <h5> 
                <button type="button" className='BotonSinBorde'>
                  <FontAwesomeIcon icon="redo" />
                </button>
                Canciones Escuchadas 
              </h5>
              <p>
                  { this.state.loading ?
                    null :
                    <Suspense fallback={<div>Loading...</div>}>
                      <Lista objects={this.state.listaIdsCancionesEscuchadas} tempoTotal={transformarSegundos(this.state.tiempoTotalSongEsc)} tipoLista={false}/>
                    </Suspense>
                  }
              </p>
            </div>
          : <div/> }

          {this.state.listaIdsCancionesAlbumsVis.length > 0 ? 
            <div>
              <h5> 
                <button type="button" className='BotonSinBorde'>
                  <FontAwesomeIcon icon="headphones" />
                </button>
                Canciones no escuchadas de Albums Visitados 
              </h5>
              <p>
                  { this.state.loading ?
                    null :
                    <Suspense fallback={<div>Loading...</div>}>
                      <Lista objects={this.state.listaIdsCancionesAlbumsVis} tempoTotal={transformarSegundos(this.state.tiempoTotalAlbumVis)} tipoLista={false}/>
                    </Suspense>
                  }
              </p>
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
              <p>
                  { this.state.loading ?
                   null :
                    <Suspense fallback={<div>Loading...</div>}>
                      <Lista objects={this.state.listaIdsCancionesRandom} tempoTotal={transformarSegundos(this.state.tiempoTotal)} tipoLista={false}/>
                    </Suspense>
                  }
              </p>
            </div>
          : <div/> }
      </div>
    );
  }
}

export default Inicio;
