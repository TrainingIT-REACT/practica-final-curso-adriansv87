import React, { Component } from 'react';
import bootstrap from "bootstrap"; // eslint-disable-line no-unused-vars
import Header from '../Commom/Header';
import {BrowserRouter as Router} from 'react-router-dom';

// Css
import './App.css';

class Inicio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      albums: []
    }
  }

  render() {
    return (

      <div>
        <h1>Plantilla de la práctica final!</h1>
        <p>
          Esta plantilla contiene todo lo necesario para comenzar a
          desarrollar la práctica final. Antes de comenzar a desarrollar,
          lee la documentación de la práctica y el fichero README.md de
          este repositorio.
        </p>
        <h2>Servidor de desarrollo</h2>
        <p>
          El proyecto está preconfigurado con un servidor de desarrollo basado
          en json-server:
        </p>
        <h2>¿Dudas?</h2>
        <p>
          No olvides pasarte por el foro si tienes alguna duda sobre la práctica final
          o la plantilla :).
        </p>
      </div>
    );
  }
}

export default Inicio;
