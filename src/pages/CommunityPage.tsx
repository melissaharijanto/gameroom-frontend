import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GameCommunity, GameCommunityInitialValue } from "../compiler/interface/GameCommunity";
import { BlackBackground } from "../components/Background";
import { API_ENDPOINT } from "../constants";
import NavigationBar from "../components/NavigationBar";
import CommunityHeader from "../components/CommunityHeader";

const CommunityPage = () => {
    let { id } = useParams();
    const [gameCommunity, setGameCommunity] = useState<GameCommunity>(GameCommunityInitialValue);

    const fetchGameCommunityData = () => {
        axios.get(API_ENDPOINT + `/game_communities/${id}`)
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
        </BlackBackground>
    )
}

export default CommunityPage;