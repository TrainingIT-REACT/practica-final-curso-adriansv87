import React, { Component } from 'react';
import store from '../store'; // Store
import * as actionUsuario from '../actions/actionUser';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Css
import './App.css';
import { NavLink, withRouter, Redirect } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filtro: "",
      username: "",
      pathname: null
    }
  }

  async componentDidMount() {
    try {
      const res = await fetch('/albums');
      const json = await res.json();
      this.setState((prevState) => ({
        ...prevState,
        loading: false,
        albums: json
      }));

      store.subscribe(() => {
        if (store.getState().user.user.username != null) {
          this.setState({username: store.getState().user.user.username});
        } else {
          this.setState({username: null});
        }
      });
    } catch(err) {
      console.error("Error accediendo al servidor", err);
    }
  }

  /*
  componentDidUpdate() {
    if ((store.getState().user.user.username != null) && (this.state.username != store.getState().user.user.username)) {
      this.setState({username: store.getState().user.user.username});
    }
  }
  */

  buscar(e) {
    e.preventDefault();
    var urlPass = this.state.filtro.toLowerCase();
    //this.setState({pathname:`/search/${urlPass}`,filtro : ""});

    this.props.history.push({pathname:`/search/${this.state.filtro}`});
    this.setState({filtro : ""});
  }

  cerrarSesion() {
    store.dispatch(actionUsuario.salir());
  }

  render() {
    return (
      <div>
        {this.state.pathname ? <Redirect exact to={this.state.pathname}/> : <div> </div>}
        <nav className="navbar navbar-expand-lg navbar-light text-white bg-dark">
          <a className="navbar-brand text-white" href="#">Reactify</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse text-white" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <NavLink exact className="nav-link text-white" to="/">Inicio <span className="sr-only">(current)</span></NavLink>
              </li>
              <li className="nav-item">
                <NavLink exact className="nav-link text-white" to="/albums">Álbums</NavLink>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="text" onChange={e => this.setState({filtro:e.target.value})} value={this.state.filtro}/>
              <button className="btn btn-primary my-2 my-sm-0 text-white" type="submit" onClick={(e) => this.buscar(e)}>Search</button>
            </form>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                {this.state.username ? 
                <NavLink exact className="nav-link text-white" to="/inicioSesion"> {this.state.username} </NavLink> : 
                <NavLink exact className="nav-link text-white" to="/inicioSesion">Inicio de Sesión</NavLink> }
              </li>
              <li className="nav-item">
                {this.state.username ? 
                  <button type="button" onClick={() => this.cerrarSesion()}> <FontAwesomeIcon icon="sign-out-alt" exact className="TamButton" /> </button> : ''}
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(Header);
