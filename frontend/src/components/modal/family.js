import React,{useState} from 'react';
export default function List(props) {
  const [nome,setNome] = useState(props.nome)
  const [user_name,setUser_name] = useState(props.user_name)
  
    return(
    <div>
        <div>nome : {nome}</div>
        <div>nome de usuario : {user_name}</div>
    </div>

  )
}