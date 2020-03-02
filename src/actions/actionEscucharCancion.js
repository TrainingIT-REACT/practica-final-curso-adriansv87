import types from './types';

export const listaCancionesEscuchadas = (cancionesEscuchadas) => ({
  type: types.ESCUCHAR_CANCION,
  cancionesEscuchadas
});
