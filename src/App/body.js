import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import Inicio from './Inicio';
import Search from './Search';
import Albums from './Albums';

export const Body = () => (

    <div className="container">
        <br/>
        <Switch>
            <Route exact path="/" component={Inicio}/>
            <Route exact path="/search/:filtro" component={Search}/>
            
            <Route path="/search" component={Search}/>
            <Route path="/albums" component={Albums}/>
            <Route path="/" component={Inicio}/>
        </Switch>
    </div>

);

export default withRouter(Body);