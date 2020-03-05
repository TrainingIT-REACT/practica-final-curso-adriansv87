import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from "redux";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'; 
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheckSquare, faPlay, faPause, faBackward, faStepBackward, faForward, faStepForward, faStop, faSignOutAlt, faInfo, faRedo, faHeadphones, faCompactDisc, faMusic, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Provider } from 'react-redux';

// Librerías
library.add(faCheckSquare, faPlay, faPause, faBackward, faStepBackward, faForward, faStepForward, faStop, faSignOutAlt, faInfo, faRedo, faHeadphones, faCompactDisc, faMusic, faSearch);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
