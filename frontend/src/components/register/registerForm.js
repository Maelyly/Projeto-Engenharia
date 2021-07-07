import React,{useEffect,useState} from 'react';
import './register.css';
import {Link, useHistory } from "react-router-dom";
import api from '../../services/api';

export default function RegisterForm(){
    const [nome,setNome] = useState('');
    const [user_name,setUser_name] = useState('');
    const [email,setEmail] = useState('');
    const [senha,setSenha] = useState('');
    const [senha2,setSenha2] = useState('');
    const history = useHistory();
    

    const changeHandlerNome = (event) => {
        setNome(event.target.value);
    }

    const changeHandlerUser_Name = (event) => {
        setUser_name(event.target.value);
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

    async function handleSubmit(event){
        event.preventDefault();

        const userData = {
            name : nome,
            user_name : user_name,
            email : email,
            password : senha,
        }

        console.log(userData);
        if(senha !== senha2){
            alert('senhas diferentes');
        }
        else{
            try {
                const response = await api.post('create/user', userData);
                console.log(response);
                history.replace('/login');
            } catch (error) {
                alert("usuario ja existe")
            }
            
            
            
        }
    }

    return(
        <form className = "box" onSubmit= {handleSubmit}>
            <div>    
                <label>
                    <p className = "name-register">Digite seu nome</p>
                    <input type="text"  className= "positionNameRegister" onChange = {changeHandlerNome} />
                </label>
                <label>
                    <p className = "user_name-register">Digite seu nome de usuario</p>
                    <input type="text"  className= "positionUser_name" onChange = {changeHandlerUser_Name} />
                </label>
                <label>
                    <p className = "email-register">Digite seu email</p>
                    <input type="email" className= "positionEmailRegister" onChange= {changeHandlerEmail} />
                </label>
                <label>
                    <p className = "password-register">Crie sua senha</p>
                    <input type="password" className= "positionPasswordRegister" onChange= {changeHandlerSenha}/>
                </label>
                <label>
                    <p className = "password-register2">Confirme sua senha</p>
                    <input type="password" className= "positionPasswordRegister2" onChange= {changeHandlerSenha2}/>
                </label>
            </div>
        <div>
            <Link to= "/login">
            <button className = "positionButtonCancel" >Cancelar</button>
            </Link>
            
            <button type="submit" className = "positionButtonCreate" >
                criar
            </button>
           
        </div>

        </form>
    )
}