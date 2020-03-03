import React, { Component } from 'react';
import Lista from '../Commom/Lista';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Css
import './App.css';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      albums: [],
      songs: [],
      filtro: "",
      tiempoTotal : ''
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

      var array = [];
      json.filter(f => {
          if((f.name.toUpperCase().indexOf(this.props.match.params.filtro.toUpperCase()) !== -1) || (f.artist.toUpperCase().indexOf(this.props.match.params.filtro.toUpperCase()) !== -1)) {
            array.push(f);
          }
      });
      this.setState({albums: array, filtro : this.props.match.params.filtro});

      // songs
      res = await fetch('/songs');
      json = await res.json();
      this.setState((prevState) => ({
        ...prevState,
        loading: false,
        songs: json
      }));

      var array = [];
      var acumulaTiempo = 0;
      json.filter(f => {
          if(f.name.toUpperCase().indexOf(this.props.match.params.filtro.toUpperCase()) !== -1) {
            array.push(f);
            acumulaTiempo += f.seconds;
          }
      });
      this.setState({songs: array, filtro : this.props.match.params.filtro, tiempoTotal: acumulaTiempo});
    } catch(err) {
      console.error("Error accediendo al servidor", err);
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if(prevProps.match.params.filtro !== this.props.match.params.filtro) {
      try {
          // albums
          var res = await fetch('/albums');
          var json = await res.json();
          this.setState((prevState) => ({
            ...prevState,
            loading: false,
            albums: json
          }));

          var array = [];
          json.filter(f => {
              if((f.name.toUpperCase().indexOf(this.props.match.params.filtro.toUpperCase()) !== -1) || (f.artist.toUpperCase().indexOf(this.props.match.params.filtro.toUpperCase()) !== -1)) {
                array.push(f);
              }
          });
          this.setState({albums: array, filtro : this.props.match.params.filtro});

          // songs
          res = await fetch('/songs');
          json = await res.json();
          this.setState((prevState) => ({
              ...prevState,
              loading: false,
              songs: json
          }));

          var array = [];
          var acumulaTiempo = 0;
          json.filter(f => {
              if(f.name.toUpperCase().indexOf(this.props.match.params.filtro.toUpperCase()) !== -1) {
                  array.push(f);
                  acumulaTiempo += f.seconds;
              }
          });
          this.setState({songs: array, filtro : this.props.match.params.filtro, tiempoTotal: acumulaTiempo});
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

  render() {
    return (
      <div>
        <p> 
          <button type="button" className='BotonSinBorde'>
            <FontAwesomeIcon icon="search" />
          </button>
          {this.props.match.params.filtro} 
        </p>

        <h5>
          <button type="button" className='BotonSinBorde'>
              <FontAwesomeIcon icon="compact-disc"/>
          </button> 
          Álbums 
        </h5>
        <p>
            { this.state.loading ?
            <p>Cargando...</p>
            : <Lista objects={this.state.albums}
            tipoLista={true}/>
            }
        </p>

        <h5> 
          <button type="button" className='BotonSinBorde'>
            <FontAwesomeIcon icon="music" />
          </button>
          Canciones 
        </h5>
        <p>
            { this.state.loading ?
            <p>Cargando...</p>
            : <Lista objects={this.state.songs} tempoTotal={this.transformarSegundos(this.state.tiempoTotal)}
            tipoLista={false}/>
            }
        </p>
      </div>
    );
  }
}

export default Search;
