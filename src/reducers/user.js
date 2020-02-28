import types from '../actions/types';

// Estado inicial
const initialState = {
  user: ""
}

// Implementamos el reducer
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.INGRESAR:
      return {
        user: action.user
      };
    default:
      return state;
  }
}

export default reducer;
