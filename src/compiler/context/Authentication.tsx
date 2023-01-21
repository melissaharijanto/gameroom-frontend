import { useState, createContext, useContext } from 'react'
import { User, UserInitialState } from '../interface/User';
import { AuthContextType } from '../interface/AuthContextType';

/**
 * Builds a context for authentication to wrap the application in.
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Wrapper to wrap the authentication context around the application.
 * This is mainly used to determine whether a user is logged in to the application.
 * If yes, the application will redirect to the dashboard; otherwise, it will redirect
 * to the landing page.
 * @param children The pages wrapped in the provider.
 * @returns Wrapper to wrap the authentication context.
 */
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

/**
 * Uses the context in application. This function can be called from page components
 * to login, logout and access user object.
 * @returns The context that is made.
 */
export const useAuth = () => {
    return useContext(AuthContext);
}