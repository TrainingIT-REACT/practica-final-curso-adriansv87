import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// Css
import './App.css';

class Lista extends Component {

  constructor(props) {
    super(props);
  }

  transformarSegundos(time){
    var hours = Math.floor( time / 3600 );  
    var minutes = Math.floor( (time % 3600) / 60 );
    var seconds = time % 60;
    
    //Anteponiendo un 0 a los minutos si son menos de 10 
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    //Anteponiendo un 0 a los segundos si son menos de 10 
    seconds = seconds < 10 ? '0' + seconds : seconds;
    
    return minutes + ":" + seconds;  // 2:41:30
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
                <tr className='StyloCursor' key={objeto.id} onClick={() => this.props.tipoLista ? this.props.history.push({pathname:`/album/${objeto.id}`}) : this.props.history.push({pathname:`/song/${objeto.id}`})}>
                    {this.props.tipoLista ? <td> <img src={objeto.cover} alt="cover" height="42" width="42"/></td> : ''}
                    <td>{objeto.name}</td>
                    {this.props.tipoLista ? <td>{objeto.artist}</td> : <td>{this.transformarSegundos(objeto.seconds)}</td>}
                </tr>)}
            </tbody>
            </table>
      </div>
    );
  }
}

export default withRouter(Lista);
