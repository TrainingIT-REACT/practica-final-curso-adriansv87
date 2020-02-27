import React, { Component } from 'react';
import bootstrap from "bootstrap"; // eslint-disable-line no-unused-vars
import Header from '../Commom/Header';
import {BrowserRouter as Router} from 'react-router-dom';

// Css
import './App.css';

class InicioSesion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    }
  }

  render() {
    return (
        <div>
          <form id="login-form" action="" method="post" role="form">
            <div className="form-group">
              <input type="text" name="username" id="username" tabindex="1" className="form-control" placeholder="Usuario"/>
            </div>
            <div className="form-group">
              <input type="password" name="password" id="password" tabindex="2" className="form-control" placeholder="Contraseña"/>
            </div>
            <div className="form-group text-center">
              <input type="checkbox" tabindex="3" class="" name="remember" id="remember"/>
              <label for="remember"> Recordarme</label>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-sm-6 col-sm-offset-3">
                  <input type="submit" name="login-submit" id="login-submit" tabindex="4" value="Iniciar sesión"/>
                </div>
              </div>
            </div>
          </form>
        </div>
    );
  }
}

export default InicioSesion;
