import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './home/home';
import Register from './register/register';
import Login from './login/login';
import Us from './Users/us'
import Carrinho from './carrinho/carrinho';
export default function Routers(){
    return(
            <div>
                <BrowserRouter>
                <Switch>
                    <Route path="/home">
                        <Home />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/us">
                        <Us />
                    </Route>
                    <Route path="/carrinho">
                        <Carrinho />
                    </Route>
                    <Route path="/">
                        <Login />
                    </Route>
                </Switch>
                </BrowserRouter>
    </div>
    )
}