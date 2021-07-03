import React, {useState} from 'react';

const AuthContext = React.createContext({
    token: '',
    isLoggedIn : false,
    login : (token) => {},
    logout : () => {},

});

export function AuthContextProvider(props){
    const [token,setToken] = useState(null)
    
    const userIsLoggedIn = !!token;

    function loginHandler(token){
        setToken(token);
    };

    function logoutHandle(){
        setToken(null);
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