import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const DashboardPage = () => {
    const location = useLocation();

    let user = location.state.user;

    useEffect(() => {
        axios.get('https://gameroom-api.onrender.com/authentication', {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error.response);
            })
    }, [])

    return (
        <div>
            <text>{user.username}</text>
        </div>
    );
}

export default DashboardPage;