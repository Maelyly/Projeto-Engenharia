import React from 'react';
import logo from './../../images/logo/logo.png';
import './home.css'
import StickyHeadTable from './compra';

export default function Home() {
  return(
    <div>
    <h2 className="titulo1">Compras Facil</h2>
    <img src={logo} alt="logo" className="LogoHome" />

    <StickyHeadTable/>
    </div>
    
  );
}