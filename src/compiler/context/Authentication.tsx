import { useState, createContext, useContext } from 'react'
import { User } from '../interface/User';
import { AuthContextType } from '../interface/AuthContextType';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children } : any) => {
    const initialState : User = {
        id: undefined,
        username: undefined,
        password_digest: undefined,
        created_at: undefined, 
        updated_at: undefined,
    }

    const [user, setUser] = useState<User>(initialState);

    
    const login = ( token: string, user: User )=> {
        sessionStorage.setItem("gameroom", token);
        sessionStorage.setItem("user", JSON.stringify(user));
        setUser(user);
    }

    const logout = () => {
        setUser(initialState);
        sessionStorage.removeItem("gameroom");
        sessionStorage.removeItem("user");
    }

    return (
        <AuthContext.Provider value={{initialState, user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}