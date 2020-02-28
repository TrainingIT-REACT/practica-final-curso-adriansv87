// Definimos la lista de acciones
const actions = [
    "INGRESAR",
    "SALIR"
  ];

// Las convertimos en un objeto
const actionTypes = {};
actions.forEach(action => {
  actionTypes[action] = action;
});

export default actionTypes;
