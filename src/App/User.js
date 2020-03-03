import React, { Component } from 'react';
import bootstrap from "bootstrap"; // eslint-disable-line no-unused-vars
import Header from '../Commom/Header';
import {BrowserRouter as Router} from 'react-router-dom';
import store from '../store'; // Store
import * as ingresar from '../actions/actionUser';
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Home from "./Home";

// Css
import './App.css';

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER
};

const App = () => (
  <Provider template={AlertTemplate} {...options}>
    <Home />
  </Provider>
);

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      username: '',
      password: '',
      passwordNew: '',
      nombre: '',
      apellidos: ''
    }
  }

  async componentDidMount() {
    if (store.getState().user.user != undefined) {
      var usuario = store.getState().user.user;
      this.setState({username:usuario.username, nombre: usuario.nombre, apellidos: usuario.apellidos});
    }
  }

  validarLogin(e){
    e.preventDefault();

    if (store.getState().user.user.password == this.state.password) {
      if (this.state.passwordNew.length > 0) {
        var user = {username : this.state.username, password : this.state.passwordNew, nombre : this.state.nombre, apellidos : this.state.apellidos};
      } else {
        var user = {username : this.state.username, password : this.state.password, nombre : this.state.nombre, apellidos : this.state.apellidos};
      }

      store.dispatch(ingresar.usuario(user));
      this.props.history.push({pathname:'/'});
    } else {
      window.alert("La constraseña introducida no es correcta");
      //render(<App />, document.getElementById("root"));
    }
  }

  render() {
    return (
        <div class="col-md-6 col-md-offset-3">
          <form id="login-form" action="" method="post" role="form">
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Usuario" value = {this.state.username} onChange={e => this.setState({username:e.target.value})}/>
            </div>
            <div className="form-group">
              <input type="password" className="form-control" placeholder="Contraseña Antigua" value = {this.state.password} onChange={e => this.setState({password:e.target.value})}/>
            </div>
            <div className="form-group">
              <input type="password" className="form-control" placeholder="Nueva Contraseña" value = {this.state.passwordNew} onChange={e => this.setState({passwordNew:e.target.value})}/>
            </div>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Nombre" value = {this.state.nombre} onChange={e => this.setState({nombre:e.target.value})}/>
            </div>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Apellidos" value = {this.state.apellidos} onChange={e => this.setState({apellidos:e.target.value})}/>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-sm-6 col-sm-offset-3">
                  <button type="submit" className="form-control btn btn-primary" onClick={(e) => this.validarLogin(e)}> Guardar Datos Perfil Usuario </button>
                </div>
              </div>
            </div>
          </form> 
        </div>
    );
  }
}

export default User;
