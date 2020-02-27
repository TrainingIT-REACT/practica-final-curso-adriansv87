import React, { Component } from 'react';
import Lista from '../Commom/Lista';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    for (var i = listaCanciones.length; i > 0 ; i--) {
      if(listaCanciones[i].id == this.props.match.id) {
        posicionActualEnLista = i;
        break;
      }
    }

    // this.setState.song = listaCanciones[i];
  }

  posteriorCancion(){
    var listaCanciones = this.state.songs;

    var posicionActualEnLista = null;
    for (var i = listaCanciones.length; i > 0 ; i--) {
      if(listaCanciones[i].id == this.props.match.id) {
        posicionActualEnLista = i;
        break;
      }
    }

    // this.setState.song = listaCanciones[i];
  }

  render() {
    return (
      <div>
        {this.state.song != undefined ?
          <div>
            <p>{this.state.song.name}</p>

            <div className="progress">
              <div className="progress-bar" role="progressbar"></div>
            </div>

            <button type="button">
              <FontAwesomeIcon icon="play" />
            </button>

            <button type="button">
              <FontAwesomeIcon icon="pause" />
            </button>

            <button type="button" onClick={this.anteriorCancion()}>
              <FontAwesomeIcon icon="step-backward" />
            </button>

            <button type="button">
              <FontAwesomeIcon icon="backward" />
            </button>

            <button type="button">
              <FontAwesomeIcon icon="forward" />
            </button>

            <button type="button" onClick={this.posteriorCancion()}>
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
