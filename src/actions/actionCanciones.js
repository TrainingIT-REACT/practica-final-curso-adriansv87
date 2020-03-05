import types from './types';

export const listaCancionesEscuchadas = (cancionesEscuchadas) => ({
  type: types.ESCUCHAR_CANCION,
  cancionesEscuchadas
});

const postsLoadedCanciones = (canciones) => ({
  type: types.CANCIONES_CARGADAS,
  canciones
});

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

export const addCancionEscuchada = (lista) => async (dispatch) => {
  dispatch(listaCancionesEscuchadas(lista));
};

const postsLoadedCancion = (cancion) => ({
  type: types.CANCION_CARGADA,
  cancion
});

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

export const getListaSongsRandom = () => async (dispatch) => {
  dispatch(postsLoadingCanciones());
  try {
    const res = await fetch('/songs');
    const json = await res.json();
    var lisCanciones = [];

    const min = 1;
    const max = 50;
    const numElem = 5;
    var idsLisSongsRandom = [];
    for (var i = 0; i < numElem; i++) {
      var numAl = Math.floor(Math.random()*(max - min + 1) + min);

      var anadirIdSong = true;
      idsLisSongsRandom.filter(f => {
        if(f == numAl) {
          i--;
          anadirIdSong = false;
        }
      });

      if (anadirIdSong) {
        idsLisSongsRandom.push(numAl);
      }
    }

    var songs = [];
    json.filter(f => {
      idsLisSongsRandom.filter(e => {
        if(f.id == e){
          songs.push(f);
        }
      })
    });

    dispatch(postsLoadedCanciones(songs));
  } catch {
    dispatch(postsErrorCanciones());
  }
};

export const getLisSongsNoPlayAlbumsVisitados = (listaAlbumsVisitados, listaCancionesEscuchadas) => async (dispatch) => {
  dispatch(postsLoadingCanciones());
  try {
    const res = await fetch('/songs');
    const json = await res.json();

    var songs = [];
    var songsAlbum = [];
    json.map(elemCancion => {
      listaAlbumsVisitados.filter(elemAlbum => {
        if (elemAlbum == elemCancion.album_id) {
          songsAlbum.push(elemCancion);
        }
      })
    });
  
    songsAlbum.map(elemCancion => {
      var rep = false;
      listaCancionesEscuchadas.filter(c => {
        if(elemCancion.id == c.id) {
          rep = true;
        }
      })
  
      if (!rep) {
        songs.push(elemCancion);
      }
    });

    dispatch(postsLoadedCanciones(songs));
  } catch {
    dispatch(postsErrorCanciones());
  }
};
