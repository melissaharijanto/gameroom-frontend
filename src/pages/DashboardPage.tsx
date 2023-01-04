import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { BlackBackground } from "../components/Background";
import NavigationBar from "../components/NavigationBar";
import * as Constants from "../constants";
import GameCommunityContainer from "../components/GameCommunityContainer";
import { GameCommunity } from "../compiler/interface/GameCommunity";
import { useAuth } from "../compiler/context/Authentication";

const StyledDiv = styled.div`
    padding-left: 2vw;
    padding-top: 2vw;
`

const StyledGrid = styled(StyledDiv)`
    padding-right: 2vw;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-row-gap: 2vw;
    justify-items: center;
    align-items: center;
`

const StyledText = styled.text`
    color: ${(props) => props.color || Constants.WHITE100};
    font-family: Metropolis-ExtraBold;
    font-size: 2.5em;
`

const DashboardPage = () => {
    const auth = useAuth();

    const [games, setGames] = useState<GameCommunity[]>([]);

    const username = JSON.parse(sessionStorage.getItem("user") || "").username;
    /**
     * Shuffles the array with the Fisher-Yates algorithm.
     * From https://sebhastian.com/fisher-yates-shuffle-javascript/
     * 
     * @param arr The array to shuffle.
     */
    const fisherYatesShuffle = (arr: GameCommunity[]): GameCommunity[] => {
        let i = arr.length;
        while (--i > 0) {
            let randIndex = Math.floor(Math.random() * (i + 1));
                [arr[randIndex], arr[i]] = [arr[i], arr[randIndex]];
            }
            return arr;
    }

    const fetchGames = () => {
        axios.get(Constants.API_ENDPOINT + '/game_communities', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("gameroom")}`
            }
        }).then((response) => {
            var arr = response.data as GameCommunity[];
            var shuffled = fisherYatesShuffle(arr);
            setGames(shuffled.splice(0, 9));
        }).catch((error) => {
            console.log(error.response);
        })
    }

    useEffect(() => {
        fetchGames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
        <BlackBackground>
            <NavigationBar/>
            <StyledDiv>
                <StyledText>Welcome, </StyledText>
                <StyledText color={Constants.YELLOW100}>@{username}</StyledText>
                <StyledText>.</StyledText>
            </StyledDiv>
            <StyledGrid>
                {games.map(game => {
                    return (
                        <div>
                            <GameCommunityContainer game={game} />
                        </div>
                    )
                })}
            </StyledGrid>
        </BlackBackground>
    );
}

export default DashboardPage;