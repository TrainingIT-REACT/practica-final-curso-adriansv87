import types from '../actions/types';

// Estado inicial
const initialState = {
  albumsVisitados: []
}

// Implementamos el reducer
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.VISITAR_ALBUM:
      return {
        albumsVisitados: action.albumsVisitados
      };
    default:
      return state;
  }
}

export default reducer;
