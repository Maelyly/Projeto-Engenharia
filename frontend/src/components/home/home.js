import React, {useContext} from 'react';
import logo from './../../images/logo/logo.png';
import './home.css'
import StickyHeadTable from './compra';
import AuthContext from '../../store/authContext';

export default function Home() {
  const austCtx = useContext(AuthContext);
  const isLoggedIn = austCtx.isLoggedIn;

  function logoutHandler(){
    austCtx.logout();
  };
  
  return(
    <div>
    <h2 className="titulo1">Compras Facil</h2>
    {isLoggedIn && (<label className="teste">
    <p>vc esta logado </p>
    </label>)}
    <button className= "botaoTeste" onClick = {logoutHandler}>
      logout
    </button>
    
    <img src={logo} alt="logo" className="LogoHome" />

      <StickyHeadTable/>
    </div>
    
  );
}