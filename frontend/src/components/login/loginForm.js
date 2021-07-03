import React,{useEffect,useState,useContext} from 'react';
import './login.css';
import {Link } from "react-router-dom";
import axios from 'axios';
import api from '../../services/api';
import AuthContext from '../../store/authContext';

export default function LoginForm(){
    const [email,setEmail] = useState('');
    const [senha,setSenha] = useState('');
    const authCtx = useContext(AuthContext);


    const changeHandlerEmail = (event) => {
        setEmail(event.target.value);
    }

    const changeHandlerSenha = (event) => {
        setSenha(event.target.value);
    }

    /*const handleSubmit = (event) =>{
        event.preventDefault();

        const userData = {
            email : email,
            senha : senha,
        }
        console.log(userData);
    }*/

    async function handleSubmit(event) {
        event.preventDefault();

        const userData = {
            user_name : email,
            password : senha,
        }
        console.log(userData);
        try{
            const response = await api.post('auth/login', userData)
            authCtx.login(response)
            console.log('Response:', response.userData);
            console.log(response)
        }catch(error){
            console.error(error)
        }
        
        
    }

    return(
        <form className = "email-box" onSubmit= {handleSubmit}>
        <label>
            <p className = "email-label">Email</p>
            <input type="text"  className= "positionEmail" onChange= {changeHandlerEmail}/>
        </label>
        <label>
            <p className = "password-label">Senha</p>
            <input type="password" className= "positionPassword" onChange= {changeHandlerSenha}/>
        </label>
        <div>
            <button  type="submit" className = "positionButtonEnter" >Entrar</button>
            <Link to= "/register">
            <button className = "positionButtonRegister" >Cadastrar</button>
            </Link>
        </div>
        </form>
    )
}