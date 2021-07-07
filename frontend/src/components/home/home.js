import React, {useContext, useState, useEffect} from 'react';
import logo from './../../images/logo/logo.png';
import './home.css'
import StickyHeadTable from './compra';
import AuthContext from '../../store/authContext';
import api from '../../services/api';
import {Link, useHistory } from "react-router-dom";
import TransitionsModal from '../modal/modal';
import ModalPromotion from '../modal/modalAddPromotion';
import ModalPromotionR from '../modal/modalRemovePromotion';
import ModalList from '../modal/modalList';

export default function Home() {
  const austCtx = useContext(AuthContext);
  const isLoggedIn = austCtx.isLoggedIn;
  const history = useHistory();
  const [user_name,setUsername] = useState();
 
  async function userI(){
    const response = await api.post('/token', JSON.parse(localStorage.getItem('token')))
    console.log(response)
    setUsername(response.data.user)
  }

  useEffect(()=> {
    userI();
  },[])

  function logoutHandler(){
    austCtx.logout();
    history.replace('/login')
  };
  
  async function handlerClick(){
    const data ={
      editor: false,
      slid: localStorage.getItem('slid')
    }
    const response = await api.post('/si', data)
    localStorage.setItem('siid', response.data.id)
    console.log(response)
    history.replace('/carrinho')
  }
  
  return(
    <div>
    <h2 className="titulo1">Compras Facil</h2>
    {isLoggedIn && (
    <label className="bVindo">
      <p>bem vindo : {user_name} </p>
    </label>)}
    <button className= "botaoTeste" onClick = {logoutHandler}>
      logout
    </button>
    
    <div>
      
      <button onClick={handlerClick} className= "positionAdd">
        adicionar compra
      </button>
      <ModalList/>
      <ModalPromotionR/>
      <ModalPromotion/>
      <TransitionsModal/>
      
    </div>
    <img src={logo} alt="logo" className="LogoHome" />
      <div className="tableI">
      </div>
      <div className="tableC">
        <StickyHeadTable/>
      </div>
    </div>
    
  );
}