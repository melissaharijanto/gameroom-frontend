import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { BlackBackground } from "../components/Background";
import NavigationBar from "../components/NavigationBar";
import * as Constants from "../constants";

const StyledText = styled.text`
    color: ${Constants.WHITE100};
    font-family: Metropolis-Bold;
`
const DashboardPage = () => {
    const [user, setUser] = useState("");

    useEffect(() => {
        axios.get(Constants.API_ENDPOINT + '/current_user', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("gameroom")}`
            }
        })
            .then((response) => {
                console.log(response);
                setUser(response.data.username);
            }).catch((error) => {
                console.log(error.response);
            })
    }, []);

    return (
        <BlackBackground>
            <NavigationBar/>
            <StyledText>hello, @{user}.</StyledText>
        </BlackBackground>
    );
}

export default DashboardPage;