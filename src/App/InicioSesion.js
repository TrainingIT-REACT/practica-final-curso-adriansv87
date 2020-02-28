import React, { Component } from 'react';
import bootstrap from "bootstrap"; // eslint-disable-line no-unused-vars
import Header from '../Commom/Header';
import {BrowserRouter as Router} from 'react-router-dom';
import store from '../store'; // Store
import * as ingresar from '../actions/ingresar';

// Css
import './App.css';

class InicioSesion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      username: '',
      password: ''
    }
  }

  validarLogin(){

    const unsubscribe = store.subscribe(() => {
      if (store.getState().user.user.username != null) {
//        window.alert("Store Username: " + store.getState().user.user.username);
//        window.alert("Store Password: " + store.getState().user.user.password);

        console.log(`Se han modificado los datos en el store`);
        console.log(`${store.getState().user.user.username}`);
        console.log(`${store.getState().user.user.password}`);
      } else {
        console.log(store.getState());
      }
    });

    var user = {username : this.state.username, password : this.state.password, nombre : '', apellidos : ''};
    store.dispatch(ingresar.usuario(user));
    unsubscribe();
  }

  render() {
    return (
        <div>
          <form id="login-form" action="" method="post" role="form">
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Usuario" onChange={e => this.setState({username:e.target.value})}/>
            </div>
            <div className="form-group">
              <input type="password" className="form-control" placeholder="Contraseña" onChange={e => this.setState({password:e.target.value})}/>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-sm-6 col-sm-offset-3">
                  <button type="button" onClick={() => this.validarLogin()}> Inicio Sesión </button>
                </div>
              </div>
            </div>
          </form>
        </div>
    );
  }
}

export default InicioSesion;