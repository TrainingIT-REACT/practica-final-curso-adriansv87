import types from './types';

export const listaCancionesEscuchadas = (cancionesEscuchadas) => ({
  type: types.ESCUCHAR_CANCION,
  cancionesEscuchadas
});

const postsLoadedCanciones = (canciones) => ({
  type: types.CANCIONES_CARGADAS,
  canciones
})

const postsLoadingCanciones = () => ({
  type: types.CARGANDO_CANCIONES
});

const postsErrorCanciones = () => ({
  type: types.ERROR_CARGA_CANCIONES
});

export const getSongs = () => async (dispatch) => {
  dispatch(postsLoadingCanciones());
  try {
    const res = await fetch('/songs');
    const json = await res.json();
    dispatch(postsLoadedCanciones(json));
  } catch {
    dispatch(postsErrorCanciones());
  }
};

const postsLoadedCancion = (cancion) => ({
  type: types.CANCION_CARGADA,
  cancion
})

const postsLoadingCancion = () => ({
  type: types.CARGANDO_CANCION
});

const postsErrorCancion = () => ({
  type: types.ERROR_CARGA_CANCION
});

export const getSong = (id) => async (dispatch) => {
  dispatch(postsLoadingCancion());
  try {
    const res = await fetch('/songs');
    const json = await res.json();
    var s = null;
    json.filter(f => {
      if(f.id == id) {
        s = f;
      }
      dispatch(postsLoadedCancion(s));
    });
  } catch {
    dispatch(postsErrorCancion());
  }
};

export const getSongsFilterByAlbumId = (id) => async (dispatch) => {
  dispatch(postsLoadingCanciones());
  try {
    const res = await fetch('/songs');
    const json = await res.json();
    var lisCanciones = [];
    json.filter(f => {
      if(f.album_id == id) {
        lisCanciones.push(f);
      }
    });

    dispatch(postsLoadedCanciones(lisCanciones));
  } catch {
    dispatch(postsErrorCanciones());
  }
};

export const addCancionEscuchada = (lista) => async (dispatch) => {
  dispatch(listaCancionesEscuchadas(lista));
}
