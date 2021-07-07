import React,{useState} from 'react';
import StickyHeadTable,{addProduto} from './table';
import './carrinho.css'
import logo from './../../images/logo/logo.png';
export default function Carrinho(){
    
    
    return (
        <div>
            <h2 className="titulo1">Compras Facil</h2>
            <StickyHeadTable/>
            <img src={logo} alt="logo" className="LogoHome" />
        </div>
        
    )
}