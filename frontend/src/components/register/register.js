import React from 'react';
import "./register.css"
import logo from './../../images/logo/logo.png';

import RegisterForm from './registerForm';
//import {Us} from "./Users/us";

export default function Register() {
     
 
 
    return(
    <div>

        <h2 className= "subTitle-Register">
            Crie sua conta
        </h2>
        <img src={logo} alt="logo" className="Logo" />

        <RegisterForm/>
        
        <div className="login-asth">
            <h1 className= "title">
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