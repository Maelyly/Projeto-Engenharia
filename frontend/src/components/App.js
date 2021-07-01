import './App.css';
import { useState } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './home/home';
import Us from './Users/us'
import Cadastro from './cadastro/cadastro';
import Login from './login/login';
import Routers from './routers';

function App() {
  const [token, setToken] = useState();

//if(!token){
  //return <Login setToken = {setToken}/>
//}

  return (
    <div className="App">
      <Routers/>
    </div>
  );
}

export default App;
