import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import Inicio from './Inicio';

export const Body = () => (

    <div className="container">
        <br/>
        <Switch>
            <Route exact path="/" component={Inicio}/>
            <Route path="/" component={Inicio}/>
        </Switch>
    </div>

);

export default withRouter(Body);