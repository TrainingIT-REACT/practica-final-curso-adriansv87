import { createStore, combineReducers } from "redux";

// Reducers
import user from './reducers/user';
import albumsVisitados from './reducers/albumsVisitados';
import cancionesEscuchadas from './reducers/cancionesEscuchadas';

export default createStore(combineReducers({ user, albumsVisitados, cancionesEscuchadas }));
