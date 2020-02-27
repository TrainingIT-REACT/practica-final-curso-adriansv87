import React, { Component } from 'react';
import Lista from '../Commom/Lista';

// Css
import './App.css';

class Albums extends Component {
  constructor(props) {
    super(props);

    this.state = {
        loading: true,
        albums: []
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

        } catch(err) {
          console.error("Error accediendo al servidor", err);
        }
}

  render() {
    return (
      <div>
        <p> Albums </p>
        <p>
            { this.state.loading ?
            <p>Cargando...</p>
            : <Lista objects={this.state.albums}
            tipoLista={true}/>
            }
        </p>
      </div>
    );
  }
}

export default Albums;
