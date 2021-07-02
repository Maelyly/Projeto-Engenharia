import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './home/home';
import Cadastro from './cadastro/cadastro';
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
                    <Route path="/cadastro">
                        <Cadastro />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/us">
                        <Us />
                    </Route>
                    <Route path="/us">
                        <Carrinho />
                    </Route>
                </Switch>
                </BrowserRouter>
    </div>
    )
}