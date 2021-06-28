import './App.css';
import { useState } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './home/home';
import Us from './Users/us'
import Cadastro from './cadastro/cadastro';
import Login from './login/login';

function App() {
  const [token, setToken] = useState();

//if(!token){
  //return <Login setToken = {setToken}/>
//}

  return (
    <div className="App">
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
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
