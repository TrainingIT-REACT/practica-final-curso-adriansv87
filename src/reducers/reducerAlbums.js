import { combineReducers } from "redux";
import types from '../actions/types';

// Estado inicial
const initialState = {
  albumsVisitados: []
}

// Implementamos el reducer
const reducerAlbumsVisitados = (state = initialState, action) => {
  switch(action.type) {
    case types.VISITAR_ALBUM:
      return {
        albumsVisitados: action.albumsVisitados
      };
    default:
      return state;
  }
}

// INICIO REDUCER ALBUMS
const initialStateAlbums = {
  isLoading: false,
  albums: null,
  error: false
}

// Implementamos el reducer de Carga de Albums
export const reducerCargaAlbums = (state = initialStateAlbums, action) => {
  switch(action.type) {
      case types.CARGANDO_ALBUMS:
        // Activamos isLoading.
        // Eliminamos cualquier error anterior
        return {
          ...state,
          isLoading: true,
          error: false
        };
      case types.ALBUMS_CARGADOS:
        // Cargamos la canciones
        return {
          isLoading: false,
          albums: action.albums,
          error: false
        };
      case types.ERROR_CARGA_ALBUMS:
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
// FIN REDUCER ALBUMS

// INICIO REDUCER ALBUM
const initialStateAlbumUnico = {
  isLoading: false,
  album: null,
  error: false
}

// Implementamos el reducer de Carga de Album
export const reducerCargaAlbum = (state = initialStateAlbumUnico, action) => {
  switch(action.type) {
      case types.CARGANDO_ALBUM:
        // Activamos isLoading.
        // Eliminamos cualquier error anterior
        return {
          ...state,
          isLoading: true,
          error: false
        };
      case types.ALBUM_CARGADO:
        // Cargamos el album
        return {
          isLoading: false,
          album: action.album,
          error: false
        };
      case types.ERROR_CARGA_ALBUM:
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
// FIN REDUCER ALBUM

const reducer = combineReducers ({reducerAlbumsVisitados, reducerCargaAlbums, reducerCargaAlbum});
export default reducer;
