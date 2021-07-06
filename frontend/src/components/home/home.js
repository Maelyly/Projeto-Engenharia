import React, {useContext, useState} from 'react';
import logo from './../../images/logo/logo.png';
import './home.css'
import StickyHeadTable from './compra';
import AuthContext from '../../store/authContext';
import api from '../../services/api';
import {Link, useHistory } from "react-router-dom";
import UserContext from '../Users/user';
import TransitionsModal from '../modal/modal';
import TableItem from './tableI';


export default function Home() {
  const austCtx = useContext(AuthContext);
  const isLoggedIn = austCtx.isLoggedIn;
  const history = useHistory();
  const userCtx = useContext(UserContext)
 
 

  function logoutHandler(){
    austCtx.logout();
    history.replace('/login')
  };
  
  /*async function testeToken(){
    const response = await api.post('token', austCtx.token);
    console.log(austCtx.token)
    console.log(response.data)
  }*/
  
  return(
    <div>
    <h2 className="titulo1">Compras Facil</h2>
    {isLoggedIn && (<label className="teste">
    <p>bem vindo : {userCtx.user_name} </p>
    </label>)}
    <button className= "botaoTeste" onClick = {logoutHandler}>
      logout
    </button>
    
    <div>
      <Link to= '/carrinho'>
      <button className= "positionAdd">
        adicionar compra
      </button>
      </Link>

      <TransitionsModal/>
      
    </div>
    <img src={logo} alt="logo" className="LogoHome" />
      <div className="tableI">
        <TableItem/>
      </div>
      <div className="tableC">
        <StickyHeadTable/>
      </div>
    </div>
    
  );
}