import './App.css';
import { useState } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './home/home';
import Us from './Users/us'
import Cadastro from './cadastro/cadastro';
import Login from './login/login';
import Routers from './routers';
import {AuthContextProvider} from '../store/authContext';
import {UserContextProvider} from '../components/Users/user'

function App() {
  const [token, setToken] = useState();


  return (
    <AuthContextProvider>
    <UserContextProvider>
    <div className="App">
      <Routers/>
    </div>
    </UserContextProvider>
    </AuthContextProvider>
  );
}

export default App;
