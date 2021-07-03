import React from 'react';
import './login.css';
import {Link } from "react-router-dom";

export default function Login() {
  return(
    <div>

        <h2 className= "subTitle">
            Entre na sua conta
        </h2>

        <form className = "email-box">
        <label>
            <p className = "email-label">Email</p>
            <input type="email"  className= "positionEmail" />
        </label>
        <label>
            <p className = "password-label">Senha</p>
            <input type="password" className= "positionPassword" />
        </label>
        <div>
            <Link to= "/home">
            <button  type="submit" className = "positionButtonEnter" >Entrar</button>
            </Link>
            <Link to= "/register">
            <button type="submit" className = "positionButtonRegister" >Cadastrar</button>
            </Link>
        </div>
        </form>

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