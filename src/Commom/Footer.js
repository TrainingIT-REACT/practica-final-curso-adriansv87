import React, { Component } from 'react';

// Css
import './App.css';

class Footer extends Component {

  render() {
    return (
      <div className='card text-white bg-dark FooterHeight'>
        <div className='card-header FooterHeight'>
            <footer>
                <p className='text-center'> 
                    © 2020 Copyright:
                    <a href="mailto:adrian.sanchez@altia.es?Subject=Curso%20de%20React" className='text-white LinkSinEstilo'> Adrián Sánchez Vales</a>
                </p>
            </footer>
        </div>
      </div>
    );
  }
}

export default Footer;
