import React, { useEffect, useState } from 'react';
import './cadastro.css';
import {Link } from "react-router-dom";
import axios from "axios";

export default function Cadastro() {
 const [user] = useState(null);
 useEffect(async()=>{
    await axios.post(("http://localhost:8000/users/"+user));
    })
  return(
    <div>

        <h2 className= "subTitulo-Cadastro">
            Crie sua conta
        </h2>

        <form className = "box">
        <label>
            <p className = "nome-cadastro">Digite seu nome</p>
            <input type="text"  className= "posicaoNomeCadastro" />
        </label>
        <label>
            <p className = "email-cadastro">Digite seu email</p>
            <input type="email" className= "posicaoEmailCadastro" />
        </label>
        <label>
            <p className = "senha-cadastro">Crie sua senha</p>
            <input type="password" className= "posicaoSenhaCadastro" />
        </label>
        <label>
            <p className = "senha-cadastro2">Confirme sua senha</p>
            <input type="password" className= "posicaoSenhaCadastro2" />
        </label>
        <div>
            <Link to= "/login">
            <button  type="submit" className = "posicaoBotaoCancelar" >Cancelar</button>
            </Link>
            <Link to= "/home">
            <button type="submit" className = "posicaoBotaoCriar" >Criar</button>
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
  );
}