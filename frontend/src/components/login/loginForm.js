import React,{useEffect,useState,useContext} from 'react';
import './login.css';
import {Link, useHistory } from "react-router-dom";
import axios from 'axios';
import api from '../../services/api';
import AuthContext from '../../store/authContext';
import UserContext from '../Users/user';

export default function LoginForm(){
    const [email,setEmail] = useState('');
    const [senha,setSenha] = useState('');
    const authCtx = useContext(AuthContext);
    const history = useHistory();
    const userCtx = useContext(UserContext);

    const changeHandlerEmail = (event) => {
        setEmail(event.target.value);
    }

    const changeHandlerSenha = (event) => {
        setSenha(event.target.value);
    }


    async function handleSubmit(event) {
        event.preventDefault();

        const userData = {
            user_name : email,
            password : senha,
        }
        console.log(userData);
        try{
            const response = await api.post('auth/login', userData)
            authCtx.login(response.data)
            userCtx.login(userData.user_name)
            
            history.replace('/home')
            console.log('Response:', response.data);
            console.log(response)
        }catch(error){
            alert("Usuario ou Senha Incorreta")
            console.log(error)
        }
        
        
    }

    return(
        <form className = "email-box" onSubmit= {handleSubmit}>
        <label>
            <p className = "email-label">Nome de Usuario</p>
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