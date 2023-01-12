import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GameCommunity, GameCommunityInitialValue } from "../compiler/interface/GameCommunity";
import { BlackBackground } from "../components/Background";
import * as Constants from "../constants";
import NavigationBar from "../components/NavigationBar";
import CommunityHeader from "../components/CommunityHeader";
import { CreatePost } from "../components/Button";
import PostComponent from "../components/PostComponent";

const ForumWall = styled.span`
    color: ${Constants.WHITE100};
    font-family: Metropolis-ExtraBold;
    font-size: 2em;
`

const Div = styled.div`
    padding-left: 7vw;
    padding-right: 7vw;
`

const PostDiv = styled.div`
    padding-left: 10vw;
    padding-right: 7vw;
`

const HorizontalLine = styled.hr`
    background-color: ${Constants.MAGENTA100};
    border: none;
    height: 2px;
    margin: 0.5vw 0;
    width: 15vw;
`

const CommunityPage = () => {
    let { id } = useParams();
    const [gameCommunity, setGameCommunity] = useState<GameCommunity>(GameCommunityInitialValue);

    const fetchGameCommunityData = () => {
        axios.get(Constants.API_ENDPOINT + `/game_communities/${id}`)
            .then(response => setGameCommunity(response.data))
            .catch(error => console.log(error));
    }
    useEffect(() => {
        fetchGameCommunityData();
    }, [])

    return (
        <BlackBackground>
            <NavigationBar/>
            <CommunityHeader game={gameCommunity}/>
            <br/>
            <br/>
            <br/>
            <Div>
                <CreatePost>+ Create New Post</CreatePost>
                <ForumWall>Forum Wall</ForumWall>
                <HorizontalLine/>
            </Div>
            <br/>
            <PostDiv>
                <PostComponent/>
            </PostDiv>
        </BlackBackground>
    )
}

export default CommunityPage;