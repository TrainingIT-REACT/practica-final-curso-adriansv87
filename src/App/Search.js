import React, { Component, Suspense } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {transformarSegundos} from '../Commom/Funciones';
import './App.css';

const Lista = React.lazy(() => import('../Commom/Lista'));

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
          { !this.state.loading && this.state.albums.length > 0 ?
            <Suspense fallback={<div>Loading...</div>}>
              <Lista objects={this.state.albums}tipoLista={true}/>
            </Suspense> 
          :
            this.state.loading ?
              <p> Cargando... </p>
            :
              <p> No se encontraron registros </p>
          }

        <h5> 
          <button type="button" className='BotonSinBorde'>
            <FontAwesomeIcon icon="music" />
          </button>
          Canciones 
        </h5>
          { !this.state.loading && this.state.songs.length > 0 ?
            <Suspense fallback={<div>Loading...</div>}>
              <Lista objects={this.state.songs} tempoTotal={transformarSegundos(this.state.tiempoTotal)}tipoLista={false}/>
            </Suspense> 
          :
            this.state.loading ?
              <p> Cargando... </p>
            :
              <p> No se encontraron registros </p>
          }
      </div>
    );
  }
}

export default Search;
