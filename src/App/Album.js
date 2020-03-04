import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {transformarSegundos} from '../Commom/Funciones';
import Lista from '../Commom/Lista';
import './App.css';

// Acciones
import { getSongsFilterByAlbumId } from '../actions/actionCanciones';
import { getAlbum, addAlbumVisitado } from '../actions/actionAlbums';

class Album extends Component {
  constructor(props) {
    super(props);

    this.state = {
        filtro: ""
    }
  }

  async componentDidMount() {
    try {
      this.props.getAlbum(this.props.match.params.id);
      this.props.getSongsFilterByAlbumId(this.props.match.params.id);
      this.almacenarAlbumVisitado();
    } catch(err) {
      console.error("Error accediendo al servidor", err);
    }
  }

  almacenarAlbumVisitado() {
    const {reducerAlbums} = this.props;
    var listaAlbums = reducerAlbums.reducerAlbumsVisitados.albumsVisitados;

    var listaIdsAlbumsVisitados = [];
    if ((listaAlbums != null) && (listaAlbums.length > 0)) {
      var anadir = true;
      listaIdsAlbumsVisitados = listaAlbums;
      listaIdsAlbumsVisitados.filter(f => {
        if(f === this.props.match.params.id) {
          anadir = false;
        }
      });

      if (anadir == true) {
        listaIdsAlbumsVisitados.push(this.props.match.params.id);
        this.props.addAlbumVisitado(listaIdsAlbumsVisitados);
      }
    } else {
      listaIdsAlbumsVisitados.push(this.props.match.params.id);
      this.props.addAlbumVisitado(listaIdsAlbumsVisitados);
    }
  }

  render() {
    const {reducerAlbums, reducerCanciones, ...resto} = this.props;
    const album = reducerAlbums.reducerCargaAlbum.album;
    return (
      <div>
        {album != undefined ?
          <div>
            <p> {this.props.match.params.filtro} </p>

            <div className="row">
              <div className="col-md-2">
                <img src={album.cover} alt="cover" height="150" width="150"/>
              </div>
              <div className="col-md-3">
                <div className="row">
                  <cite> {album.name} </cite>
                </div>
                <div className="row">
                  <em> Artist: {album.artist} </em>
                </div>
              </div>
            </div>

            <br/>
            <h5> 
              <button type="button" className='BotonSinBorde'>
                <FontAwesomeIcon icon="music" />
              </button>
              Canciones 
            </h5>
              { reducerCanciones.reducerCargaCancion.isLoading ?
              <p>Cargando...</p>
              : <Lista objects={reducerCanciones.reducerCargaCanciones.canciones} 
              albumId={this.props.match.params.id} 
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
  getSongsFilterByAlbumId: (id) => dispatch(getSongsFilterByAlbumId(id)),
  getAlbum: (id) => dispatch(getAlbum(id)),
  addAlbumVisitado: (lista) => dispatch(addAlbumVisitado(lista))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Album);
