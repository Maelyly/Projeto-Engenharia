import React, { useEffect, useState } from 'react';
import axios from "axios";

export default function Us() {
  const [users,setUsers] = useState(null);
  useEffect(async()=>{
    const data = await axios.get("http://localhost:8000/users");
    setUsers(data.data);
  })

  return(
    <div>

        <ul>
            {users?users.map(element => {
              return (<li>
                {element.name}
              </li>)
            }):"Loading..."}
        </ul>

    </div>

  )
}