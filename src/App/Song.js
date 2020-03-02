import React, { Component } from 'react';
import Lista from '../Commom/Lista';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import store from '../store'; // Store
import * as escucharCancion from '../actions/actionEscucharCancion';

// Css
import './App.css';

class Song extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      song: null,
      songs: []
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

  async componentDidUpdate(prevProps, prevState) {
    if(prevProps.match.params.id !== this.props.match.params.id) {
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
  }

  transformarSegundos(time){
    var hours = Math.floor( time / 3600 );  
    var minutes = Math.floor( (time % 3600) / 60 );
    var seconds = time % 60;

    //Anteponiendo un 0 a los minutos si son menos de 10 
    minutes = minutes < 10 ? '0' + minutes : minutes;

    //Anteponiendo un 0 a los segundos si son menos de 10 
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return minutes + ":" + seconds;  // 2:41:30
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
      this.props.history.push({pathname:`/song/${this.state.songs[posicionActualEnLista - 1].id}`});
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
      this.props.history.push({pathname:`/song/${this.state.songs[posicionActualEnLista + 1].id}`});
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

  render() {
    return (
      <div>
        {this.state.song != undefined && this.state.songs != undefined ?
          <div>
            <p>{this.state.song.name}</p>

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
            <p> Canciones </p>
            <p>
                { this.state.loading ?
                <p>Cargando...</p>
                : <Lista objects={this.state.songs}
                tipoLista={false}/>
                }
            </p>
          </div>
        : 
        <div/>
        } 
      </div>
    );
  }
}

export default Song;
