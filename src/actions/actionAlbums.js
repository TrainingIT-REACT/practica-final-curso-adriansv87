import types from './types';

export const listaAlbumsVisitados = (albumsVisitados) => ({
  type: types.VISITAR_ALBUM,
  albumsVisitados
});

const postsLoadedAlbums = (albums) => ({
  type: types.ALBUMS_CARGADOS,
  albums
})

const postsLoadingAlbums = () => ({
  type: types.CARGANDO_ALBUMS
});

const postsErrorAlbums = () => ({
  type: types.ERROR_CARGA_ALBUMS
});

export const getAlbums = () => async (dispatch) => {
  dispatch(postsLoadingAlbums());
  try {
    const res = await fetch('/albums');
    const json = await res.json();
    dispatch(postsLoadedAlbums(json));
  } catch {
    dispatch(postsErrorAlbums());
  }
};

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
