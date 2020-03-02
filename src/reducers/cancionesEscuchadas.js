import types from '../actions/types';

// Estado inicial
const initialState = {
  cancionesEscuchadas: []
}

// Implementamos el reducer
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.ESCUCHAR_CANCION:
      return {
        cancionesEscuchadas: action.cancionesEscuchadas
      };
    default:
      return state;
  }
}

export default reducer;
