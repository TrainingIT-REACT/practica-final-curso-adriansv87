import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from 'react-redux';
import Lista from '../Commom/Lista';
import './App.css';

// Acciones
import { getAlbums } from '../actions/actionAlbums';

class Albums extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  async componentDidMount() {
    try {
      this.props.getAlbums();
      } catch(err) {
        console.error("Error accediendo al servidor", err);
      }
  }

  render() {
    const {reducerAlbums, ...resto} = this.props;
    return (
      <div>
        {reducerAlbums.reducerCargaAlbums.albums != undefined && reducerAlbums.reducerCargaAlbums.albums != null  && reducerAlbums.reducerCargaAlbums.albums.length > 0 ?
        <div>
          <h5>
            <button type="button" className='BotonSinBorde'>
                <FontAwesomeIcon icon="compact-disc"/>
            </button>
            Álbums
          </h5>
          {reducerAlbums.reducerCargaAlbums.isLoading ?
          <p>Cargando...</p>
          : <Lista objects={reducerAlbums.reducerCargaAlbums.albums}
          tipoLista={true}/>
          }
          </div>
        : <div/>
        } 
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state
});

const mapDispatchToProps = (dispatch) => ({
  getAlbums: () => dispatch(getAlbums())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Albums);
