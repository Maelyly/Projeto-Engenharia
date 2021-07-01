import React,{useEffect,useState} from 'react';
import './cadastro.css';
import {Link } from "react-router-dom";
import CadastroForm from './cadastroForm';
//import {Us} from "./Users/us";

export default function Cadastro() {
     
 
 
    return(
    <div>

        <h2 className= "subTitulo-Cadastro">
            Crie sua conta
        </h2>
        <CadastroForm/>
        
        <div className="login-asth">
            <h1 className= "titulo">
                Compras
                Facil
            </h1>
            <p className= "slogan">    
            Seja bem-vindo!
            Ao meu, ao seu, ao nosso gerenciador de compras :)
            </p>
        </div>

    </div>
  );
}