import { useState, createContext, useContext } from 'react'
import { User, UserInitialState } from '../interface/User';
import { AuthContextType } from '../interface/AuthContextType';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children } : any) => {

    const [user, setUser] = useState<User>(UserInitialState);

    
    const login = ( token: string, user: User )=> {
        sessionStorage.setItem("gameroom", token);
        sessionStorage.setItem("user", JSON.stringify(user));
        setUser(user);
    }

    const logout = () => {
        setUser(UserInitialState);
        sessionStorage.removeItem("gameroom");
        sessionStorage.removeItem("user");
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}