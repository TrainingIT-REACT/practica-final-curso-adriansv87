import { createStore, combineReducers } from "redux";

// Reducers
import user from './reducers/user';

export default createStore(combineReducers({ user }));
