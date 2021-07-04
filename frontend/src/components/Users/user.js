import React, {useState} from "react";

const UserContext = React.createContext({
    user_name: '',
    login : (data) => {},

});

export function UserContextProvider(props){
    const [user_name,setUser_name] = useState()
    

    function user_nameHandler(data){
        setUser_name(data);   
    };


    const contextValue = {
        user_name: user_name,
        login : user_nameHandler
       
    };

    return ( <UserContext.Provider value = {contextValue}>
            {props.children}
        </UserContext.Provider>
    )
};

export default UserContext;