import React, { Component } from 'react';
import Lista from '../Commom/Lista';
import {BrowserRouter as Router} from 'react-router-dom';

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
          json.filter(f => {
            if(f.album_id == this.props.match.params.id) {
              array.push(f);
            }
        });
          this.setState({songs: array});
        } catch(err) {
          console.error("Error accediendo al servidor", err);
        }
}

  render() {
    return (
        <div>
          {this.state.album != undefined ?
            <diV>
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
                : <Lista objects={this.state.songs}
                tipoLista={false}/>
                }
            </p>
            </diV>
            :
            <div/>
          }
        </div>
    );
  }
}

export default Album;
