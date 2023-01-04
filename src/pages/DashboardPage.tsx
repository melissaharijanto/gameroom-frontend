import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { BlackBackground } from "../components/Background";
import NavigationBar from "../components/NavigationBar";
import * as Constants from "../constants";
import GameCommunityContainer from "../components/GameCommunityContainer";
import { GameCommunity } from "../compiler/GameCommunity";

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

    const [games, setGames] = useState<GameCommunity[]>([]);

    const fetchCurrentUser = () => {
        axios.get(Constants.API_ENDPOINT + '/current_user', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("gameroom")}`
            }
        }).then((response) => {
                console.log(response);
                setUser(response.data.username);
            }).catch((error) => {
                console.log(error.response);
            })
    }

    const fetchGames = () => {
        axios.get(Constants.API_ENDPOINT + '/game_communities', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("gameroom")}`
            }
        }).then((response) => {
            console.log(response.data);
            console.log(response.data[0].image_url)
            var arr = response.data.slice(0,9);
            setGames(arr);
        }).catch((error) => {
            console.log(error.response);
        })
    }

    useEffect(() => {
        fetchCurrentUser();
        fetchGames();
    }, []);
    
    return (
        <BlackBackground>
            <NavigationBar/>
            <StyledDiv>
                <StyledText>Welcome, </StyledText>
                <StyledText color={Constants.YELLOW100}>@{user}</StyledText>
                <StyledText>.</StyledText>
            </StyledDiv>
            <StyledDiv>
                <StyledText>
                {games.map(game => {
                    return <GameCommunityContainer
                        title={game.title}
                        image_url={game.image_url} />
                })}
                </StyledText>
            </StyledDiv>
        </BlackBackground>
    );
}

export default DashboardPage;