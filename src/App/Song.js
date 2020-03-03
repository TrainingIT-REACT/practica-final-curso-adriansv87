import React, { Component } from 'react';
import {Link} from 'react-router-dom' ;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Lista from '../Commom/Lista';
import store from '../store';
import * as escucharCancion from '../actions/actionEscucharCancion';
import {transformarSegundos} from '../Commom/Funciones';
import './App.css';

class Song extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      song: null,
      songs: [],
      album: null,
      tiempoTotal : ''
    }
  }

  async componentDidMount() {
    try {
      var res = await fetch('/songs');
      var json = await res.json();
      var lisCanciones = [];
      var acumulaTiempo = 0;
      if(this.props.match.params.album_id != undefined) {
        json.filter(f => {
          if(f.album_id == this.props.match.params.album_id) {
            lisCanciones.push(f);
            acumulaTiempo += f.seconds;
          }
        });
      } else {
        lisCanciones = json;
      }

      this.setState((prevState) => ({
        ...prevState,
        loading: false,
        songs: lisCanciones
      }));

      var objeto = null;
      json.filter(f => {
        if(f.id == this.props.match.params.id) {
          objeto = f;
        }
      });
      this.setState({song: objeto, tiempoTotal: acumulaTiempo});
      this.getNombreAlbum();
    } catch(err) {
      console.error("Error accediendo al servidor", err);
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if(prevProps.match.params.id !== this.props.match.params.id) {
      try {
        var res = await fetch('/songs');
        var json = await res.json();
        var lisCanciones = [];
        var acumulaTiempo = 0;
        if(this.props.match.params.album_id != undefined) {
          json.filter(f => {
            if(f.album_id == this.props.match.params.album_id) {
              lisCanciones.push(f);
              acumulaTiempo += f.seconds;
            }
          });
        } else {
          lisCanciones = json;
        }

        this.setState((prevState) => ({
          ...prevState,
          loading: false,
          songs: json,
          songs: lisCanciones
        }));

        var objeto = null;
        json.filter(f => {
          if(f.id == this.props.match.params.id) {
            objeto = f;
          }
        });
        this.setState({song: objeto, tiempoTotal: acumulaTiempo});
        this.getNombreAlbum();
      } catch(err) {
        console.error("Error accediendo al servidor", err);
      }
    }
  }

  anteriorCancion(){
    var listaCanciones = this.state.songs;

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
        this.props.history.push({pathname:`/song/${this.state.songs[posicionActualEnLista - 1].id}/${this.props.match.params.album_id}`});
      } else {
        this.props.history.push({pathname:`/song/${this.state.songs[posicionActualEnLista - 1].id}`});
      }
    }
  }

  posteriorCancion(){
    var listaCanciones = this.state.songs;

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
        this.props.history.push({pathname:`/song/${this.state.songs[posicionActualEnLista + 1].id}/${this.props.match.params.album_id}`});
      } else {
        this.props.history.push({pathname:`/song/${this.state.songs[posicionActualEnLista + 1].id}`});
      }
    }
  }

  almacenarCancionEscuchada(){

    var listaIdsCancionesEscuchadas = [];
    if ((store.getState().cancionesEscuchadas.cancionesEscuchadas != null) && (store.getState().cancionesEscuchadas.cancionesEscuchadas.length > 0)) {
      var anadir = true;
      listaIdsCancionesEscuchadas = store.getState().cancionesEscuchadas.cancionesEscuchadas;
      listaIdsCancionesEscuchadas.filter(f => {
        if(f === this.props.match.params.id) {
          anadir = false;
        }
      });

      if (anadir == true) {
        listaIdsCancionesEscuchadas.push(this.props.match.params.id);
        store.dispatch(escucharCancion.listaCancionesEscuchadas(listaIdsCancionesEscuchadas));
      }

//    window.alert("Store Canciones: " + store.getState().cancionesEscuchadas.cancionesEscuchadas + " - " + this.props.match.params.id);
      console.log(`Se han modificado los datos en el store`);
      console.log(`Store Canciones:` + store.getState().cancionesEscuchadas.cancionesEscuchadas);
    } else {
      listaIdsCancionesEscuchadas.push(this.props.match.params.id);
      store.dispatch(escucharCancion.listaCancionesEscuchadas(listaIdsCancionesEscuchadas));
      console.log(store.getState());
    }
  }

  async getNombreAlbum() {
    var res = await fetch('/albums');
    var json = await res.json();
    json.filter(f => {
        if(f.id == this.state.song.album_id) {
          this.setState({album:f});
        }
    });
  }

  render() {
    return (
      <div>
        {this.state.song != undefined && this.state.album != undefined && this.state.songs != undefined ?
          <div>
            <em> 
              <Link to={`/album/${this.state.song.album_id}`}>{this.state.album.name}</Link> &nbsp; 
              {this.state.song.name}
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
              { this.state.loading ?
              <p>Cargando...</p>
              : <Lista objects={this.state.songs} albumId={this.props.match.params.album_id} tempoTotal={transformarSegundos(this.state.tiempoTotal)}
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

export default Song;
