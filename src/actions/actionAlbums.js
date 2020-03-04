import types from './types';

export const listaAlbumsVisitados = (albumsVisitados) => ({
  type: types.VISITAR_ALBUM,
  albumsVisitados
});

const postsLoadedAlbum = (album) => ({
  type: types.ALBUM_CARGADO,
  album
})

const postsLoadingAlbum = () => ({
  type: types.CARGANDO_ALBUM
});

const postsErrorAlbum = () => ({
  type: types.ERROR_CARGA_ALBUM
});

export const getAlbum = (id) => async (dispatch) => {
  dispatch(postsLoadingAlbum());
  try {
    const res = await fetch('/albums');
    const json = await res.json();
    var s = null;
    json.filter(f => {
      if(f.id == id) {
        s = f;
      }
      dispatch(postsLoadedAlbum(f));
    });
  } catch {
    dispatch(postsErrorAlbum());
  }
};

export const addAlbumVisitado = (lista) => async (dispatch) => {
  dispatch(listaAlbumsVisitados(lista));
}
