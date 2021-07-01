import React from 'react';
import './login.css';
import {Link } from "react-router-dom";
import LoginForm from './loginForm';
export default function Login() {
  return(
    <div>

        <h2 className= "subTitulo">
            Entre na sua conta
        </h2>

        <LoginForm/>

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

  )
}