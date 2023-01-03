import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { BlackBackground } from "../components/Background";
import NavigationBar from "../components/NavigationBar";
import * as Constants from "../constants";

const StyledDiv = styled.div`
    padding-left: 2vw;
    padding-top: 2vw;
`
const StyledText = styled.text`
    color: ${(props) => props.color || Constants.WHITE100};
    font-family: Metropolis-ExtraBold;
    font-size: 2.5em;
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
            <StyledDiv>
                <StyledText>Welcome, </StyledText>
                <StyledText color={Constants.YELLOW100}>@{user}</StyledText>
                <StyledText>.</StyledText>
            </StyledDiv>
        </BlackBackground>
    );
}

export default DashboardPage;