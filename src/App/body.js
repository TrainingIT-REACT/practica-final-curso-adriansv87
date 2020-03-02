import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import Inicio from './Inicio';
import Search from './Search';
import Albums from './Albums';
import Album from './Album';
import Song from './Song';
import InicioSesion from './InicioSesion';
import User from './User';

export const Body = () => (
    <div className="container">
        <br/>
        <Switch>
            <Route exact path="/" component={Inicio}/>
            <Route exact path="/search/:filtro" component={Search}/>
            <Route exact path="/album/:id" component={Album}/>
            <Route exact path="/song/:id/:album_id" component={Song}/>
            <Route exact path="/song/:id" component={Song}/>

            <Route path="/inicioSesion" component={InicioSesion}/>
            <Route path="/user" component={User}/>
            <Route path="/search" component={Search}/>
            <Route path="/albums" component={Albums}/>
            <Route path="/" component={Inicio}/>
        </Switch>
    </div>
);

export default withRouter(Body);
