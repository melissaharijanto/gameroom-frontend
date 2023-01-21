import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { BlackBackground } from "../components/Background";
import NavigationBar from "../components/NavigationBar";
import * as Constants from "../constants";
import GameCommunityContainer from "../components/GameCommunityContainer";
import { GameCommunity } from "../compiler/interface/GameCommunity";

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

const StyledHeading = styled.span`
    color: ${(props) => props.color || Constants.WHITE100};
    font-family: Metropolis-ExtraBold;
    font-size: 2.5em;
`

const StyledText = styled.span`
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

const CommunitiesYouFollow = styled.span`
    font-family: Metropolis-Bold;
    font-size: 2.25em;
    color: ${(props) => props.color? props.color : Constants.WHITE100}
`

const HorizontalLine = styled.hr`
    background-color: ${Constants.YELLOW100};
    border: none;
    height: 4px;
    width: 27.5vw;
    margin-left: 2vw;
    margin-top: 0.75vw;
`

const DashboardPage = () => {

    const [games, setGames] = useState<GameCommunity[]>([]);
    const [userFollowing, setUserFollowing] = useState<GameCommunity[]>([]);
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

    /**
     * Fetches games from the backend. Once the response is received,
     * the data is filtered (so that it only displays communities) that
     * the user has not followed and limits the post to 6 or 9 communities.
     */
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
            console.log(userFollowing.length);
            if (userFollowing.length > 0 && userFollowing.length <= 3) {
                var alreadyFollowedId = 0;
                for (let i = 0; i < userFollowing.length; i++) {
                    alreadyFollowedId = userFollowing[i].id;
                    shuffled = shuffled.filter(game => game.id !== alreadyFollowedId);
                }
                console.log(shuffled);
                setGames(shuffled.splice(0, 6));
            } else {
                setGames(shuffled.splice(0, 9));
            }
        }).catch((error) => {
            console.log(error.response);
        })
    }

    /**
     * Fetches communities followed by the user.
     */
    const fetchUserFollowing = () => {
        axios.get(Constants.API_ENDPOINT + '/follow', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("gameroom")}`
            }
        }).then((response) => {
            setUserFollowing(response.data);
        }).catch(error => console.log(error));
    }

    /**
     * Displays the following component if the user does not follow any communities.
     * @returns Nine recommended game communities, as well as a text encouraging the users
     * to start following communities.
     */
    const NoFollowingTextComponent = () => {
        return (
            <CenterAlignedFlex direction="column">
                    <StyledText>You have not followed any communities yet.</StyledText>
                    <span>
                        <StyledText>Perhaps you would be </StyledText>
                        <StyledText color={Constants.MAGENTA100}>interested</StyledText>
                        <StyledText> in some of our</StyledText>
                    </span>
                    <span>
                        <StyledText color={Constants.BLUE100}>popular communities</StyledText>
                        <StyledText> :</StyledText>
                    </span>
                    <br/>
                    <StyledHorizontalLine/>
                </CenterAlignedFlex> 
        )
    }

    /**
     * Displays the following component if the user follows some communities.
     * 
     * @returns Communities followed by the user.
     */
    const UserFollowingComponent = () => {
        return (
            <div>
                <StyledDiv>
                    <CommunitiesYouFollow>Communities you </CommunitiesYouFollow>
                    <CommunitiesYouFollow color={Constants.MAGENTA100}>follow</CommunitiesYouFollow>
                </StyledDiv>
                <HorizontalLine/>
                <StyledGrid>
                    {userFollowing.map(game => {
                        return (
                            <div key={game.id}>
                                <GameCommunityContainer 
                                    game={game}
                                />
                            </div>
                        )
                    })}
                </StyledGrid>
            </div>
        )
    }

    const RecommendedCommunitiesComponent = () => {
        return (
            <StyledGrid>
                {games.map(game => {
                    return (
                        <div key={game.id}>
                            <GameCommunityContainer 
                                game={game}
                            />
                        </div>
                    )
                })}
            </StyledGrid> 
        )
    }

    useEffect(() => {
        fetchUserFollowing();
    }, []);

    useEffect(() => {
        if (userFollowing.length <= 3) {
            fetchGames();
        }
    }, [userFollowing]);
    
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
            { userFollowing.length === 0
                ? <NoFollowingTextComponent/>
                : null
            }
            
            { userFollowing.length === 0 
                ? <RecommendedCommunitiesComponent/> 
                : <UserFollowingComponent/> }

            { userFollowing.length > 0 && userFollowing.length <= 3 
            ?
            <div>
                <StyledDiv>
                    <CommunitiesYouFollow>Recommended </CommunitiesYouFollow>
                    <CommunitiesYouFollow color={Constants.BLUE100}>for you</CommunitiesYouFollow>
                </StyledDiv>
                <HorizontalLine/> 
                <RecommendedCommunitiesComponent/>
            </div>
            : null
            }
        </BlackBackground>
    );
}

export default DashboardPage;