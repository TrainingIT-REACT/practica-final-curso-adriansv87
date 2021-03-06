import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Header from '../Commom/Header';
import Footer from '../Commom/Footer';
import Body from './body';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    return (
      <Router>
        <div>
          <Header/>
            <React.StrictMode>
              <Body/>
            </React.StrictMode>
          <Footer/>
        </div>
      </Router>
    );
  }
}

export default App;
