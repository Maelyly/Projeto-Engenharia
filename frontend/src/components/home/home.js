import React, {useContext} from 'react';
import logo from './../../images/logo/logo.png';
import './home.css'
import StickyHeadTable from './compra';
import AuthContext from '../../store/authContext';
import api from '../../services/api';
import {Link, useHistory } from "react-router-dom";
import UserContext from '../Users/user';


export default function Home() {
  const austCtx = useContext(AuthContext);
  const isLoggedIn = austCtx.isLoggedIn;
  const history = useHistory();
  const userCtx = useContext(UserContext)
 

  function logoutHandler(){
    austCtx.logout();
    history.replace('/login')
  };
  
  async function testeToken(){
    const response = await api.post('token', austCtx.token);
    console.log(austCtx.token)
    console.log(response.data)
  }
  
  return(
    <div>
    <h2 className="titulo1">Compras Facil</h2>
    {isLoggedIn && (<label className="teste">
    <p>bem vindo : {userCtx.user_name} </p>
    </label>)}
    <button className= "botaoTeste" onClick = {logoutHandler}>
      logout
    </button>
    
    <img src={logo} alt="logo" className="LogoHome" />

      <StickyHeadTable/>
    </div>
    
  );
}