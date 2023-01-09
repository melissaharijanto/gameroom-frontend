import { Navigate } from "react-router-dom";
import { useAuth } from "../compiler/context/Authentication";
import { UserInitialState } from "../compiler/interface/User";

const ProtectedRoute = ({ children } : any) => {
    const auth = useAuth();  
    
    if (auth?.user === UserInitialState && !sessionStorage.getItem("gameroom")) {
        return <Navigate to="/"/>
    }
    return children;
}

export default ProtectedRoute;