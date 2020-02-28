import types from './types';

export const usuario = (user) => ({
  type: types.INGRESAR,
  user
});

export const salir = () => ({
  type: types.SALIR
});
