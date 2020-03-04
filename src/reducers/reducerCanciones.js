import { combineReducers } from "redux";
import types from '../actions/types';

// Estado inicial
const initialState = {
  cancionesEscuchadas: []
}

// Implementamos el reducer para registrar las canciones escuchadas
const reducerCancionesEscuchadas = (state = initialState, action) => {
  switch(action.type) {
    case types.ESCUCHAR_CANCION:
      return {
        cancionesEscuchadas: action.cancionesEscuchadas,
      };
    default:
      return state;
  }
}

// INICIO REDUCER CANCIONES
const initialStateCarga = {
  isLoading: false,
  canciones: [],
  error: false
}

// Implementamos el reducer de Carga de Canciones
export const reducerCargaCanciones = (state = initialStateCarga, action) => {
  switch(action.type) {
      case types.CARGANDO_CANCIONES:
        // Activamos isLoading.
        // Eliminamos cualquier error anterior
        return {
          ...state,
          isLoading: true,
          error: false
        };
      case types.CANCIONES_CARGADAS:
        // Cargamos las canciones
        return {
          isLoading: false,
          canciones: action.canciones,
          error: false
        };
      case types.ERROR_CARGA_CANCIONES:
        // Desactivamos la carga y activamos el error
        return {
          ...state,
          isLoading: false,
          error: true
        }
    default:
      return state;
  }
}
// FIN REDUCER CANCIONES

// INICIO REDUCER CANCIÓN
const initialStateCargaCancionUnica = {
  isLoading: false,
  cancion: null,
  error: false
}

// Implementamos el reducer de Carga de Canciones
export const reducerCargaCancion = (state = initialStateCargaCancionUnica, action) => {
  switch(action.type) {
      case types.CARGANDO_CANCION:
        // Activamos isLoading.
        // Eliminamos cualquier error anterior
        return {
          ...state,
          isLoading: true,
          error: false
        };
      case types.CANCION_CARGADA:
        // Cargamos la canciones
        return {
          isLoading: false,
          cancion: action.cancion,
          error: false
        };
      case types.ERROR_CARGA_CANCION:
        // Desactivamos la carga y activamos el error
        return {
          ...state,
          isLoading: false,
          error: true
        }
    default:
      return state;
  }
}
// FIN REDUCER CANCIÓN

const reducer = combineReducers ({reducerCancionesEscuchadas, reducerCargaCanciones, reducerCargaCancion});
export default reducer;
