import types from './types';

export const listaAlbumsVisitados = (albumsVisitados) => ({
  type: types.VISITAR_ALBUM,
  albumsVisitados
});
