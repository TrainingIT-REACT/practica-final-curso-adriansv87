import React, { Component } from 'react';
import bootstrap from "bootstrap"; // eslint-disable-line no-unused-vars
import Header from '../Commom/Header';
import Lista from '../Commom/Lista';
import {BrowserRouter as Router} from 'react-router-dom';

// Css
import './App.css';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
        loading: true,
        albums: [],
        songs: [],
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
          json.filter(f => {
              if(f.name.toUpperCase().indexOf(this.props.match.params.filtro.toUpperCase()) !== -1) {
                array.push(f);
              }
          });
          this.setState({songs: array, filtro : this.props.match.params.filtro});
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
            json.filter(f => {
                if(f.name.toUpperCase().indexOf(this.props.match.params.filtro.toUpperCase()) !== -1) {
                    array.push(f);
                }
            });
            this.setState({songs: array, filtro : this.props.match.params.filtro});
          } catch(err) {
            console.error("Error accediendo al servidor", err);
          }
      }
  }

  render() {
    return (

        <div>
            <p> {this.props.match.params.filtro} </p>

            <p> Albums </p>
            <p>
                { this.state.loading ?
                <p>Cargando...</p>
                : <Lista objects={this.state.albums}
                tipoLista={true}/>
                }
            </p>

            <p> Canciones </p>
            <p>
                { this.state.loading ?
                <p>Cargando...</p>
                : <Lista objects={this.state.songs}
                tipoLista={false}/>
                }
            </p>
        </div>
    );
  }
}

export default Search;
