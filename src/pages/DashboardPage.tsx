import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { BlackBackground } from "../components/Background";
import NavigationBar from "../components/NavigationBar";
import * as Constants from "../constants";

const DashboardPage = () => {
    const location = useLocation();

    let user = location.state.user;

    useEffect(() => {
        axios.get('https://gameroom-api.onrender.com/authentication', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
            .then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error.response);
            })
    }, [])

    const StyledText = styled.text`
        color: ${Constants.WHITE100};
        font-family: Metropolis-Bold;
    `

    return (
        <BlackBackground>
            <NavigationBar/>
            <StyledText>hello, @{user.username}.</StyledText>
        </BlackBackground>
    );
}

export default DashboardPage;