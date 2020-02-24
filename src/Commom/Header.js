import React, { Component } from 'react';

// Css
import './App.css';
import { NavLink, withRouter } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filtro: ""
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
    } catch(err) {
      console.error("Error accediendo al servidor", err);
    }
  }

  buscar() {
    this.props.history.push({pathname:`/search/${this.state.filtro}`});
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">Reactify</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <NavLink exact className="nav-link" to="/" className="nav-link" href="#">Inicio <span className="sr-only">(current)</span></NavLink>
              </li>
              <li className="nav-item">
                <NavLink exact className="nav-link" to="/" className="nav-link" href="#">Álbums</NavLink>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="text" onChange={e => this.setState({filtro:e.target.value})}/>
              <button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={() => this.buscar()}>Search</button>
            </form>
            <ul className="navbar-nav mr-auto">
            <li className="nav-item">
                <NavLink exact className="nav-link" to="/" className="nav-link" href="#">Inicio de Sesión</NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(Header);
