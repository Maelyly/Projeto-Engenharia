import React,{useEffect,useState} from 'react';
import './login.css';
import {Link } from "react-router-dom";
import axios from 'axios';

export default function LoginForm(){
    const [email,setEmail] = useState('');
    const [senha,setSenha] = useState('');
    const apiUrl = ("http://localhost:8000/users");


    const changeHandlerEmail = (event) => {
        setEmail(event.target.value);
    }

    const changeHandlerSenha = (event) => {
        setSenha(event.target.value);
    }

    const handleSubmit = (event) =>{
        event.preventDefault();

        const userData = {
            email : email,
            senha : senha,
        }
        console.log(userData);
    }

    return(
        <form className = "email-box" onSubmit= {handleSubmit}>
        <label>
            <p className = "email-label">Email</p>
            <input type="email"  className= "posicaoEmail" onChange= {changeHandlerEmail}/>
        </label>
        <label>
            <p className = "senha-label">Senha</p>
            <input type="password" className= "posicaoSenha" onChange= {changeHandlerSenha}/>
        </label>
        <div>
            <Link to= "/home">
            <button  type="submit" className = "posicaoBotaoEntrar" >Entrar</button>
            </Link>
            <Link to= "/cadastro">
            <button className = "posicaoBotaoCadastrar" >Cadastrar</button>
            </Link>
        </div>
        </form>
    )
}