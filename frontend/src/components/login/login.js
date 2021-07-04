import React from 'react';
import './login.css';
import LoginForm from './loginForm';
import logo from './../../images/logo/logo.png';
export default function Login() {
  return(
    <div>

        <h2 className= "subTitle">
            Entre na sua conta
        </h2>
        <img src={logo} alt="logo" className="Logo" />

        <LoginForm/>

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

  )
}