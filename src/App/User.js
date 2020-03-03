import React, { Component } from 'react';
import store from '../store';
import * as ingresar from '../actions/actionUser';

// Css
import './App.css';

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      username: '',
      password: '',
      passwordNew: '',
      nombre: '',
      apellidos: '',
      alertaError: false
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
      this.setState({alertaError : true});
    }
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div className="col-md-6 col-md-offset-3">
        <form id="login-form" action="" method="post" role="form">
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Usuario" value = {this.state.username} onChange = {this.handleChange}/>
          </div>
          <div className="form-group">
            <input type="password" className="form-control" placeholder="Contraseña Antigua" value = {this.state.password} onChange={e => this.setState({password:e.target.value})}/>
            {this.state.alertaError ? <p className="text-danger">La constraseña introducida no es correcta</p> : <div/>}
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
