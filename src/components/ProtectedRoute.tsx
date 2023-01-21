import { Navigate } from "react-router-dom";
import { useAuth } from "../compiler/context/Authentication";
import { UserInitialState } from "../compiler/interface/User";

/**
 * A component to wrap some pages that require authentication. If the user is not recorded
 * in the session storage and authentication context, then the application will immediately
 * redirect the user to the landing page.
 * 
 * @param children The pages that requires authentication to access.
 * @returns The pages that requires authentication to access.
 */
const ProtectedRoute = ({ children } : any) => {
    const auth = useAuth();  
    
    if (auth?.user === UserInitialState && !sessionStorage.getItem("gameroom")) {
        return <Navigate to="/"/>
    }
    return children;
}

export default ProtectedRoute;