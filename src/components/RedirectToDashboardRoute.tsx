import { Navigate } from "react-router-dom";

/**
 * This component detects whether a user and authentication token is recorded in the application.
 * If it is recorded, then the application will immediately redirect to the dashboard page.
 * 
 * @param children The landing, login, sign up pages.
 * @returns The landing, login, sign up pages.
 */
const RedirectToDashboardRoute = ({ children } : any) => {
    if (sessionStorage.getItem("gameroom") && sessionStorage.getItem("user")) {
        return <Navigate to="/dashboard"/>
    }
    
    return children;
}

export default RedirectToDashboardRoute;