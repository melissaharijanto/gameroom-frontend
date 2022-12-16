import { useLocation } from "react-router-dom";

const DashboardPage = () => {
    const location = useLocation();

    let user = location.state.user;

    return (
        <div>
            <text>{user.username}</text>
        </div>
    );
}

export default DashboardPage;