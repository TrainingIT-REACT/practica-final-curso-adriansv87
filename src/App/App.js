import React, { Component } from 'react';
import bootstrap from "bootstrap"; // eslint-disable-line no-unused-vars
import {BrowserRouter as Router} from 'react-router-dom';
import Header from '../Commom/Header';
import Footer from '../Commom/Footer';
import Body from './body';

// Css
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
            <Body/>
          <Footer/>
        </div>
      </Router>
    );
  }
}

export default App;
