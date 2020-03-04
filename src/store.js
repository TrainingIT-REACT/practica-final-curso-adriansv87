import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk'; 

// Reducers
import user from './reducers/user';
import reducerAlbums from './reducers/reducerAlbums';
import reducerCanciones from './reducers/reducerCanciones';

export default createStore( 
    combineReducers({
        user, reducerAlbums, reducerCanciones}), 
        applyMiddleware(thunk) 
);
