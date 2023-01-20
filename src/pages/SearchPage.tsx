import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GameCommunity } from "../compiler/interface/GameCommunity";
import { BlackBackground } from "../components/Background"
import GameCommunityContainer from "../components/GameCommunityContainer";
import NavigationBar from "../components/NavigationBar";
import * as Constants from "../constants";

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

const HeadingDiv = styled.div`
    padding-left: 2vw;
    padding-top: 2vw;
`

const HorizontalLine = styled.hr`
    background-color: ${Constants.MAGENTA100};
    border: none;
    height: 4px;
    width: 40vw;
    margin-left: 2vw;
    margin-top: 0.75vw;
`

const SearchPage = () => {

    const { keyword } = useParams();

    const [searchResults, setSearchResults] = useState<GameCommunity[]>([]);

    const fetchSearchResults = () => {
        axios.post(Constants.API_ENDPOINT + `/search`, {
            title: keyword,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("gameroom")}`
            }
        }).then(response => setSearchResults(response.data))
        .catch(error => console.log(error));
    }

    useEffect(() => {
        fetchSearchResults();
        console.log(searchResults)
    }, [])

    return (
        <BlackBackground>
            <NavigationBar/>
            <HeadingDiv>
                <StyledHeading>Showing {searchResults.length} search results for </StyledHeading>
                <StyledHeading>'</StyledHeading>
                <StyledHeading color={Constants.YELLOW100}>{keyword}</StyledHeading>
                <StyledHeading>'.</StyledHeading>
            </HeadingDiv>
            <HorizontalLine/>
            <StyledGrid>
                {searchResults.map(game => {
                    return (
                    <div key={game.id}>
                        <GameCommunityContainer
                            game={game}/>
                    </div>
                    )
                })}
            </StyledGrid>
        </BlackBackground>
    )
}

export default SearchPage;