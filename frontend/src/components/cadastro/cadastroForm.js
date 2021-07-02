import React,{useEffect,useState} from 'react';
import './cadastro.css';
import {Link } from "react-router-dom";
import axios from 'axios';

export default function CadastroForm(){
    const [nome,setNome] = useState('');
    const [email,setEmail] = useState('');
    const [senha,setSenha] = useState('');
    const [senha2,setSenha2] = useState('');
    const apiUrl = ("http://localhost:8000/users");

    const changeHandlerNome = (event) => {
        setNome(event.target.value);
    }

    const changeHandlerEmail = (event) => {
        setEmail(event.target.value);
    }

    const changeHandlerSenha = (event) => {
        setSenha(event.target.value);
    }

    const changeHandlerSenha2 = (event) => {
        setSenha2(event.target.value);
    }

    const handleSubmit = (event) =>{
        event.preventDefault();

        const userData = {
            nome : nome,
            email : email,
            senha : senha,
        }
        console.log(userData);
        if(senha !== senha2){
            alert('senhas diferentes');
        }
        else{    
            axios.post(apiUrl,userData);
        }
    }

    return(
        <form className = "box" onSubmit= {handleSubmit}>
        <label>
            <p className = "nome-cadastro">Digite seu nome</p>
            <input type="text"  className= "posicaoNomeCadastro" onChange = {changeHandlerNome} />
        </label>
        <label>
            <p className = "email-cadastro">Digite seu email</p>
            <input type="email" className= "posicaoEmailCadastro" onChange= {changeHandlerEmail} />
        </label>
        <label>
            <p className = "senha-cadastro">Crie sua senha</p>
            <input type="password" className= "posicaoSenhaCadastro" onChange= {changeHandlerSenha}/>
        </label>
        <label>
            <p className = "senha-cadastro2">Confirme sua senha</p>
            <input type="password" className= "posicaoSenhaCadastro2" onChange= {changeHandlerSenha2}/>
        </label>
        
        <div>
            <Link to= "/login">
            <button className = "posicaoBotaoCancelar" >Cancelar</button>
            </Link>
            
            <button type="submit" className = "posicaoBotaoCriar" >Criar</button>
           
        </div>

        </form>
    )
}