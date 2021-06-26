import React from 'react';
import './login.css';
import {Link } from "react-router-dom";

export default function Login() {
  return(
    <div>

        <h2 className= "subTitulo">
            Entre na sua conta
        </h2>

        <form className = "email-box">
        <label>
            <p className = "email-label">Email</p>
            <input type="email"  className= "posicaoEmail" />
        </label>
        <label>
            <p className = "senha-label">Senha</p>
            <input type="password" className= "posicaoSenha" />
        </label>
        <div>
            <Link to= "/home">
            <button  type="submit" className = "posicaoBotaoEntrar" >Entrar</button>
            </Link>
            <Link to= "/cadastro">
            <button type="submit" className = "posicaoBotaoCadastrar" >Cadastrar</button>
            </Link>
        </div>
        </form>

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