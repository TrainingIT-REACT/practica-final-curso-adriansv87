import React, {Suspense} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';

const Inicio = React.lazy(() => import('./Inicio'));
const Search = React.lazy(() => import('./Search'));
const Albums = React.lazy(() => import('./Albums'));
const Album = React.lazy(() => import('./Album'));
const Song = React.lazy(() => import('./Song'));
const User = React.lazy(() => import('./User'));
const InicioSesion = React.lazy(() => import('./InicioSesion'));

export const Body = () => (
    <div className="container">
        <br/>
        <Suspense fallback={<div>Loading...</div>}>
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
        </Suspense>
    </div>
);

export default withRouter(Body);
