import './App.css';
import { useState } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './home/home';
import Us from './Users/us'
import Register from './register/register';
import Login from './login/login';
import Routers from './routers';
import {AuthContextProvider} from '../store/authContext';

function App() {
  const [token, setToken] = useState();


  return (
    <AuthContextProvider>
    <div className="App">
      <Routers/>
    </div>
    </AuthContextProvider>
  );
}

export default App;
