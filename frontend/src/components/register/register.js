import React, { useEffect, useState } from 'react';
import "./register.css";
import {Link } from "react-router-dom";
import axios from "axios";

export default function Cadastro() {
 const [user] = useState(null);
 useEffect(async()=>{
    await axios.post(("http://localhost:8000/users/"+user));
    })
  return(
    <div>

        <h2 className= "subTitle-Register">
            Crie sua conta
        </h2>

        <form className = "box">
        <label>
            <p className = "name-register">Digite seu nome</p>
            <input type="text"  className= "positionEmailRegister" />
        </label>
        <label>
            <p className = "email-register">Digite seu email</p>
            <input type="email" className= "positionNameRegister" />
        </label>
        <label>
            <p className = "password-register">Crie sua senha</p>
            <input type="password" className= "positionPasswordRegister" />
        </label>
        <label>
            <p className = "password-register2">Confirme sua senha</p>
            <input type="password" className= "positionPasswordRegister2" />
        </label>
        <div>
            <Link to= "/login">
            <button  type="submit" className = "positionButtonCancel" >Cancelar</button>
            </Link>
            <Link to= "/home">
            <button type="submit" className = "positionButtonCreate" >Criar</button>
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
  );
}