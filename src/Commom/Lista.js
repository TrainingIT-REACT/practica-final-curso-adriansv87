import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {transformarSegundos} from './Funciones';

// Css
import './App.css';

class Lista extends Component {

  constructor(props) {
    super(props);
  }

  montarLink(id) {
    if (this.props.tipoLista) {
      this.props.history.push({pathname:`/album/${id}`})
    } else {
      if (this.props.albumId != undefined) {
        this.props.history.push({pathname:`/song/${id}/${this.props.albumId}`})
     } else {
        this.props.history.push({pathname:`/song/${id}`})}
    }
  }

  render() {
    return (
      <div>
          <table className="table">
            <thead className="thead-dark">
                <tr>
                  {this.props.tipoLista ? <th scope="col"></th> : ''}
                  <th scope="col">Nombre</th>
                  {this.props.tipoLista ? <th scope="col">Artista</th> : <th scope="col">Duración</th>}
                </tr>
            </thead>
            <tbody>
                {this.props.objects.map(objeto => 
                <tr className='StyloCursor' key={objeto.id} onClick={() => this.montarLink(objeto.id)}>
                    {this.props.tipoLista ? <td> <img src={objeto.cover} alt="cover" height="42" width="42"/></td> : ''}
                    <td>{objeto.name}</td>
                    {this.props.tipoLista ? <td>{objeto.artist}</td> : <td>{transformarSegundos(objeto.seconds)}</td>}
                </tr>)}

                  {!this.props.tipoLista && this.props.tempoTotal != '00:00' ? 
                    <tr className='DuracionAlbum'>
                      <td> Duración Total:</td>
                      <td>{this.props.tempoTotal}</td>
                    </tr> 
                    : <div/> }
                
            </tbody>
            </table>
      </div>
    );
  }
}

export default withRouter(Lista);
