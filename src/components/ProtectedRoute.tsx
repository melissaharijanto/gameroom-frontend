import { Navigate } from "react-router-dom";
import { useAuth } from "../compiler/context/Authentication";

const ProtectedRoute = ({ children } : any) => {
    const auth = useAuth();  
    
    if (auth?.user === auth?.initialState && !sessionStorage.getItem("gameroom")) {
        return <Navigate to="/"/>
    }
    return children;
}

export default ProtectedRoute;