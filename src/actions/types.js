// Definimos la lista de acciones
const actions = [
    "INGRESAR",
    "SALIR",
    "VISITAR_ALBUM",
    "ESCUCHAR_CANCION",
    "CARGANDO_CANCIONES",
    "CANCIONES_CARGADAS",
    "ERROR_CARGA_CANCIONES",
    "CARGANDO_CANCION",
    "CANCION_CARGADA",
    "ERROR_CARGA_CANCION",
    "CARGANDO_ALBUMS",
    "ALBUMS_CARGADOS",
    "ERROR_CARGA_ALBUMS",
    "CARGANDO_ALBUM",
    "ALBUM_CARGADO",
    "ERROR_CARGA_ALBUM"
  ];

// Las convertimos en un objeto
const actionTypes = {};
actions.forEach(action => {
  actionTypes[action] = action;
});

export default actionTypes;
