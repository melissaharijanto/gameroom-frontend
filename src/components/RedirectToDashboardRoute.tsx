import { Navigate } from "react-router-dom";

const RedirectToDashboardRoute = ({ children } : any) => {
    if (sessionStorage.getItem("gameroom") && sessionStorage.getItem("user")) {
        return <Navigate to="/dashboard"/>
    }
    
    return children;
}

export default RedirectToDashboardRoute;