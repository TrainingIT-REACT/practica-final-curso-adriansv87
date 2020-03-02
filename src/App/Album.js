import React, { Component } from 'react';
import Lista from '../Commom/Lista';
import {BrowserRouter as Router} from 'react-router-dom';
import store from '../store'; // Store
import * as visitarAlbum from '../actions/actionVisitarAlbum';

// Css
import './App.css';

class Album extends Component {
  constructor(props) {
    super(props);

    this.state = {
        loading: true,
        album: null,
        albums: [],
        songs: [],
        tiempoTotal : '',
        filtro: ""
    }
  }

  async componentDidMount() {
    try {
      // albums
      var res = await fetch('/albums');
      var json = await res.json();
      this.setState((prevState) => ({
        ...prevState,
        loading: false,
        albums: json
      }));

      var objeto = null;
      json.filter(f => {
        if(f.id == this.props.match.params.id) {
          objeto = f;
        }
      });
      this.setState({album: objeto});

      // songs
      res = await fetch('/songs');
      json = await res.json();
      var array = [];
      this.setState((prevState) => ({
        ...prevState,
        loading: false,
        songs: json
      }));

      var array = [];
      var acumulaTiempo = 0;
      json.filter(f => {
        if(f.album_id == this.props.match.params.id) {
          array.push(f);
          acumulaTiempo += f.seconds;
        }
      });
      this.setState({songs: array});
      this.setState({tiempoTotal: acumulaTiempo});
      this.almacenarAlbumVisitado();
    } catch(err) {
      console.error("Error accediendo al servidor", err);
    }
  }

  almacenarAlbumVisitado(){

    var listaIdsAlbumsVisitados = [];
    if ((store.getState().albumsVisitados.albumsVisitados != null) && (store.getState().albumsVisitados.albumsVisitados.length > 0)) {
      var anadir = true;
      listaIdsAlbumsVisitados = store.getState().albumsVisitados.albumsVisitados;
      listaIdsAlbumsVisitados.filter(f => {
        if(f === this.props.match.params.id) {
          anadir = false;
        }
      });

      if (anadir == true) {
        listaIdsAlbumsVisitados.push(this.props.match.params.id);
        store.dispatch(visitarAlbum.listaAlbumsVisitados(listaIdsAlbumsVisitados));
      }
      
//    window.alert("Store Album: " + store.getState().albumsVisitados.albumsVisitados + " - " + this.props.match.params.id);
      console.log(`Se han modificado los datos en el store`);
      console.log(`Store Album:` + store.getState().albumsVisitados.albumsVisitados);
    } else {
      listaIdsAlbumsVisitados.push(this.props.match.params.id);
      store.dispatch(visitarAlbum.listaAlbumsVisitados(listaIdsAlbumsVisitados));
      console.log(store.getState());
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

  render() {
    return (
        <div>
          {this.state.album != undefined ?
            <div>
            <p> {this.props.match.params.filtro} </p>

            <div className="row">
              <div className="col-md-2">
                <img src={this.state.album.cover} alt="cover" height="150" width="150"/>
              </div>
              <div className="col-md-3">
                <div className="row">
                  <strong> {this.state.album.name} </strong>
                </div>
                <div className="row">
                  <p> {this.state.album.artist} </p>
                </div>
              </div>
            </div>

            <p> Canciones </p>
            <p>
                { this.state.loading ?
                <p>Cargando...</p>
                : <Lista objects={this.state.songs} albumId={this.props.match.params.id}
                tipoLista={false}/>
                }
            </p>
            <p> Duración Total Album: {this.transformarSegundos(this.state.tiempoTotal)} seg. </p>
            </div>
            :
            <div/>
          }
        </div>
    );
  }
}

export default Album;
