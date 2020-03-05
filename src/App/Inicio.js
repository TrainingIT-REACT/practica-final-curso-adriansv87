import React, { Component, Suspense } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {transformarSegundos} from '../Commom/Funciones';
import { connect } from 'react-redux';
import './App.css';

// Acciones
import { getListaSongsRandom, getLisSongsNoPlayAlbumsVisitados } from '../actions/actionCanciones';

const Lista = React.lazy(() => import('../Commom/Lista'));

class Inicio extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  async componentDidMount() {
    const {reducerCanciones, reducerAlbums, ...resto} = this.props;
    var listaCancionesEscuchadas = reducerCanciones.reducerCancionesEscuchadas.cancionesEscuchadas;
    var listaAlbumsVisitados = reducerAlbums.reducerAlbumsVisitados.albumsVisitados;

    if ((listaAlbumsVisitados == undefined || listaAlbumsVisitados.length < 1) && (listaCancionesEscuchadas == undefined || listaCancionesEscuchadas.length < 1)) {
      // cargarListaSongsRandom
      this.props.getListaSongsRandom();
    } else {
      // cargar lista canciones no escuchadas de albums visitados
      this.props.getLisSongsNoPlayAlbumsVisitados(listaAlbumsVisitados,listaCancionesEscuchadas);
    }
  }

  render() {
    const {reducerCanciones, reducerAlbums, ...resto} = this.props;
    var listaCancionesEscuchadas = reducerCanciones.reducerCancionesEscuchadas.cancionesEscuchadas;
    var listaAlbumsVisitados = reducerAlbums.reducerAlbumsVisitados.albumsVisitados;
    var listaCanciones = reducerCanciones.reducerCargaCanciones.canciones;

    return (
      <div>
        <h1>Música Recomendada</h1>
        <p/>
          {listaCancionesEscuchadas.length > 0 ? 
            <div>
              <h5> 
                <button type="button" className='BotonSinBorde'>
                  <FontAwesomeIcon icon="redo" />
                </button>
                Canciones Escuchadas 
              </h5>
                <Suspense fallback={<div>Loading...</div>}>
                  <Lista objects={listaCancionesEscuchadas} tempoTotal={transformarSegundos(listaCancionesEscuchadas)} tipoLista={false}/>
                </Suspense>
            </div>
          : <div/> }

          {listaAlbumsVisitados.length > 0 ? 
            <div>
              <h5> 
                <button type="button" className='BotonSinBorde'>
                  <FontAwesomeIcon icon="headphones" />
                </button>
                Canciones no escuchadas de Albums Visitados 
              </h5>
                { reducerCanciones.reducerCargaCanciones.isLoading ?
                  null :
                  <Suspense fallback={<div>Loading...</div>}>
                    <Lista objects={listaCanciones} tempoTotal={transformarSegundos(listaCanciones)} tipoLista={false}/>
                  </Suspense>
                }
            </div>
          : <div/> }

          {listaCancionesEscuchadas.length == 0 && listaAlbumsVisitados.length == 0 ? 
            <div>
              <h5> 
                <button type="button" className='BotonSinBorde'>
                  <FontAwesomeIcon icon="info" />
                </button>
                Sugerencias para este momento 
              </h5>
                { reducerCanciones.reducerCargaCanciones.isLoading ?
                  null :
                  <Suspense fallback={<div>Loading...</div>}>
                    <Lista objects={listaCanciones} tempoTotal={transformarSegundos(listaCanciones)} tipoLista={false}/>
                  </Suspense>
                }
            </div>
          : <div/> }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state
});

const mapDispatchToProps = (dispatch) => ({
  getListaSongsRandom: () => dispatch(getListaSongsRandom()),
  getLisSongsNoPlayAlbumsVisitados: (listaAlbumsVisitados,listaCancionesEscuchadas) => dispatch(getLisSongsNoPlayAlbumsVisitados(listaAlbumsVisitados,listaCancionesEscuchadas))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Inicio);
