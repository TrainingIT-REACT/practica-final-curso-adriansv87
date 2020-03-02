import { createStore, combineReducers } from "redux";

// Reducers
import user from './reducers/user';
import albumsVisitados from './reducers/albumsVisitados';

export default createStore(combineReducers({ user, albumsVisitados }));
