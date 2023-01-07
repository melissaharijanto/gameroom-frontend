import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { BlackBackground } from "../components/Background";
import NavigationBar from "../components/NavigationBar";
import * as Constants from "../constants";
import GameCommunityContainer from "../components/GameCommunityContainer";
import { GameCommunity } from "../compiler/interface/GameCommunity";
// import { CenterAlignedFlex } from "../components/Layout";

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

const StyledHeading = styled.text`
    color: ${(props) => props.color || Constants.WHITE100};
    font-family: Metropolis-ExtraBold;
    font-size: 2.5em;
`

const StyledText = styled.text`
    color: ${(props) => props.color || Constants.WHITE100};
    font-family: Metropolis-SemiBold;
    font-size: 1.25em;
    line-height: 1.15;
`

const CenterAlignedFlex = styled.div<{direction?: string}>`
    display: flex;
    justify-items: center;
    align-items: center;
    flex-direction: ${(props) => props.direction? props.direction : "row"};
`

const StyledHorizontalLine = styled.hr`
    width: 20vw;
    height: 1px;
    background-color: ${Constants.WHITE100};
`

const DashboardPage = () => {

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
                <StyledHeading>Welcome, </StyledHeading>
                <StyledHeading color={Constants.YELLOW100}>@{username}</StyledHeading>
                <StyledHeading>.</StyledHeading>
            </StyledDiv>
            <br/>
            <br/>
            <CenterAlignedFlex direction="column">
                    <StyledText>You have not followed any communities yet.</StyledText>
                    <text>
                        <StyledText>Perhaps you would be </StyledText>
                        <StyledText color={Constants.MAGENTA100}>interested</StyledText>
                        <StyledText> in some of our</StyledText>
                    </text>
                    <text>
                        <StyledText color={Constants.BLUE100}>popular communities</StyledText>
                        <StyledText> :</StyledText>
                    </text>
                    <br/>
                    <StyledHorizontalLine/>
            </CenterAlignedFlex>
            
            <StyledGrid>
                {games.map(game => {
                    return (
                        <div>
                            <GameCommunityContainer game={game}
                            />
                        </div>
                    )
                })}
            </StyledGrid>
        </BlackBackground>
    );
}

export default DashboardPage;