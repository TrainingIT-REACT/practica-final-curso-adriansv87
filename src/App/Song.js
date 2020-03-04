import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom' ;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Lista from '../Commom/Lista';
import {transformarSegundos} from '../Commom/Funciones';
import './App.css';

// Acciones
import { getSongs, getSong, getSongsFilterByAlbumId, addCancionEscuchada } from '../actions/actionCanciones';
import { getAlbum } from '../actions/actionAlbums';

class Song extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  async componentDidMount() {
    if (this.props.match.params.album_id) {
      this.props.getSongsFilterByAlbumId(this.props.match.params.album_id);
    } else {
      this.props.getSongs();
    }

    this.props.getSong(this.props.match.params.id);
    this.props.getAlbum(this.props.match.params.album_id);
  }

  async componentDidUpdate(prevProps, prevState) {
    if(prevProps.match.params.id !== this.props.match.params.id) {
      if (this.props.match.params.album_id) {
        this.props.getSongsFilterByAlbumId(this.props.match.params.album_id);
      } else {
        this.props.getSongs();
      }

      this.props.getSong(this.props.match.params.id);
      this.props.getAlbum(this.props.match.params.album_id);
    }
  }

  anteriorCancion(){
    const {reducerCanciones} = this.props;
    var listaCanciones = reducerCanciones.reducerCargaCanciones.canciones;

    var posicionActualEnLista = null;
    for (var i = (listaCanciones.length - 1); i >= 0 ; i--) {
      if(listaCanciones[i].id == this.props.match.params.id) {
        posicionActualEnLista = i;
        break;
      }
    }

    if ((posicionActualEnLista != null) && (posicionActualEnLista <= (listaCanciones.length - 1))) {
      if (posicionActualEnLista == 0) {
        posicionActualEnLista = listaCanciones.length;
      }

      if (this.props.match.params.album_id) {
        this.props.history.push({pathname:`/song/${listaCanciones[posicionActualEnLista - 1].id}/${this.props.match.params.album_id}`});
      } else {
        this.props.history.push({pathname:`/song/${listaCanciones[posicionActualEnLista - 1].id}`});
      }
    }
  }

  posteriorCancion(){
    const {reducerCanciones} = this.props;
    var listaCanciones = reducerCanciones.reducerCargaCanciones.canciones;

    var posicionActualEnLista = null;
    for (var i = 0; i <= (listaCanciones.length - 1) ; i++) {
      if(listaCanciones[i].id == this.props.match.params.id) {
        posicionActualEnLista = i;
        break;
      }
    }

    if ((posicionActualEnLista != null) && (posicionActualEnLista <= (listaCanciones.length - 1))) {
      if (posicionActualEnLista == (listaCanciones.length - 1)) {
        posicionActualEnLista = -1;
      }

      if (this.props.match.params.album_id) {
        this.props.history.push({pathname:`/song/${listaCanciones[posicionActualEnLista + 1].id}/${this.props.match.params.album_id}`});
      } else {
        this.props.history.push({pathname:`/song/${listaCanciones[posicionActualEnLista + 1].id}`});
      }
    }
  }

  almacenarCancionEscuchada(){
    const {reducerCanciones} = this.props;
    var listaCanciones = reducerCanciones.reducerCancionesEscuchadas.cancionesEscuchadas;

    var listaIdsCancionesEscuchadas = [];
    if ((listaCanciones != null) && (listaCanciones.length > 0)) {
      var anadir = true;
      listaIdsCancionesEscuchadas = listaCanciones;
      listaIdsCancionesEscuchadas.filter(f => {
        if(f === this.props.match.params.id) {
          anadir = false;
        }
      });

      if (anadir == true) {
        listaIdsCancionesEscuchadas.push(this.props.match.params.id);
        this.props.addCancionEscuchada(listaIdsCancionesEscuchadas);
      }
    } else {
      listaIdsCancionesEscuchadas.push(this.props.match.params.id);
      this.props.addCancionEscuchada(listaIdsCancionesEscuchadas);
    }
  }

  render() {
    const {reducerCanciones, reducerAlbums, ...resto} = this.props;
    const cancion = reducerCanciones.reducerCargaCancion.cancion;
    const album = reducerAlbums.reducerCargaAlbum.album;
    return (
      <div>
        {cancion != undefined && album != undefined && reducerCanciones != undefined ?
          <div>
            <em> 
              <Link to={`/album/${cancion.album_id}`}>{album.name}</Link> &nbsp; 
              {cancion.name}
            </em>

            <div className="progress">
              <div className="progress-bar" role="progressbar"></div>
            </div>

            <button type="button">
              <FontAwesomeIcon icon="play" onClick={() => this.almacenarCancionEscuchada()}/>
            </button>

            <button type="button">
              <FontAwesomeIcon icon="pause" />
            </button>

            <button type="button" onClick={() => this.anteriorCancion()}>
              <FontAwesomeIcon icon="step-backward" />
            </button>

            <button type="button">
              <FontAwesomeIcon icon="backward" />
            </button>

            <button type="button">
              <FontAwesomeIcon icon="forward" />
            </button>

            <button type="button" onClick={() => this.posteriorCancion()}>
              <FontAwesomeIcon icon="step-forward" />
            </button>

            <button type="button">
              <FontAwesomeIcon icon="stop" />
            </button>

            <p/>
            <h5> 
              <button type="button" className='BotonSinBorde'>
                <FontAwesomeIcon icon="music" />
              </button>
              Canciones 
            </h5>
              { reducerCanciones.reducerCargaCancion.isLoading ?
              <p>Cargando...</p>
              : <Lista objects={reducerCanciones.reducerCargaCanciones.canciones} 
              albumId={this.props.match.params.album_id} 
              tempoTotal={transformarSegundos(reducerCanciones.reducerCargaCanciones.canciones)}
              tipoLista={false}/>
              }
          </div>
        : 
        <div/>
        } 
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state
});

const mapDispatchToProps = (dispatch) => ({
  getSongs: () => dispatch(getSongs()),
  getSong: (id) => dispatch(getSong(id)),
  getSongsFilterByAlbumId: (id) => dispatch(getSongsFilterByAlbumId(id)),
  getAlbum: (id) => dispatch(getAlbum(id)),
  addCancionEscuchada: (lista) => dispatch(addCancionEscuchada(lista))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Song);
