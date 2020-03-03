import React, { Component } from 'react';
import store from '../store';
import * as ingresar from '../actions/actionUser';
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

  validarLogin(e){
    e.preventDefault();
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
    this.props.history.push({pathname:'/'});
  }

  render() {
    return (

			<div className="col-md-6 col-md-offset-3">
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
                <button type="submit" className="form-control btn btn-primary" onClick={(e) => this.validarLogin(e)}> Inicio Sesión </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default InicioSesion;
