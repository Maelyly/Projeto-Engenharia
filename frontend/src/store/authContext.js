import React, {useState} from 'react';

const AuthContext = React.createContext({
    token: '',
    isLoggedIn : false,
    login : (token) => {},
    logout : () => {},

});

export function AuthContextProvider(props){
    const initialToken = localStorage.getItem('token')
    const [token,setToken] = useState(initialToken)
    
    const userIsLoggedIn = !!token;

    function loginHandler(token){
        setToken(token);
        localStorage.setItem('token',token);
    };

    function logoutHandle(){
        setToken(null);
        localStorage.removeItem('token');
    };

    const contextValue = {
        token: token,
        isLoggedIn : userIsLoggedIn,
        login : loginHandler,
        logout : logoutHandle,
    };

    return ( <AuthContext.Provider value = {contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
};

export default AuthContext;