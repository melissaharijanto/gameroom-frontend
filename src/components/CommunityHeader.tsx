import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GameCommunity } from '../compiler/interface/GameCommunity';
import { User } from '../compiler/interface/User';
import * as Constants from '../constants'
import { FlexHorizontalLayout, FlexVerticalLayout } from './Layout';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PersonIcon from '@mui/icons-material/Person';

const Header = styled.div`
    height: 30vh;
    width: 100%;
    background: linear-gradient(${Constants.YELLOW65}, transparent);
    display: flex;
    align-items: flex-end;
`

const GameTitle = styled.span`
    font-family: 'Metropolis-ExtraBold';
    color: ${Constants.WHITE100};
    font-size: 4em;
    margin-left: 1.5vw;
    margin-right: 1.5vw;
`

const GameIcon = styled.img`
    border-radius: 20px;
    width: 10vw;
    height: auto;
    margin-left: 7vw;
`

const CommunityTag = styled.span`
    color: white;
    font-family: Metropolis-Bold;
    font-size: 1.25em;
    margin-left: 1.5vw;
`

const HorizontalLine = styled.hr`
    width: 7.5vw;
    background-color: ${Constants.YELLOW100};
    height: 2px;
    margin-left: 1.5vw;
    border: none;
`

const FollowButton = styled.button`
    background-color: ${Constants.BLUE100};
    border: 2px solid;
    border-color: ${Constants.WHITE100};
    border-radius: 50px;
    color: ${Constants.WHITE100};
    cursor: pointer !important;
    font-family: Metropolis-Bold;
    font-size: 1em;
    margin-top: 0.25vw;
    margin-left: 1.5vw;
    padding: 0.25vw 1.25vw;
    transition: 0.3s all ease-in;

    :hover {
        background-color: ${Constants.BLUE_ACCENT}
    }
`

const FollowedButton = styled.button`
    align-items: center;
    background-color: ${Constants.BLACK100};
    border: 2px solid;
    border-color: ${Constants.WHITE100};
    border-radius: 50px;
    color: ${Constants.WHITE100};
    cursor: pointer;
    display: flex;
    font-family: Metropolis-Bold;
    font-size: 1em;
    margin-top: 0.5vw;
    margin-left: 1.5vw;
    padding: 0.375vw 1.25vw;
    transition: 0.3s all ease-in;

    :hover {
        background-color: ${Constants.BLUE_ACCENT}
    }
`

const FollowerAmount = styled.div`
    align-items: center;
    background-color: ${Constants.PURPLE100};
    border: none;
    border-radius: 50px;
    color: ${Constants.WHITE100};
    display: flex;
    font-family: Metropolis-Bold;
    font-size: 1em;
    margin-top: 0.5vw;
    margin-left: 1vw;
    padding: 0.375vw 1.25vw;
`

const CommunityHeader = ({game}: {game: GameCommunity}) => {

    const user : User = JSON.parse(sessionStorage.getItem("user")!);
    const [followed, setFollowed] = useState<Boolean>();
    const [followers, setFollowers] = useState<Array<Number>>(game.followers);
    const postFollowRequest = JSON.parse(`{ "id": ${game.id} }`);

    const setFollowedStatus = () => {
        axios.post(Constants.API_ENDPOINT + "/follow", postFollowRequest, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("gameroom")}`
            }
        }).then((response) => {
            console.log(response.data);
            setFollowed(!followed);
            setFollowers(response.data);
        })
          .catch((error) => {
                console.log(error);
        })
    }

    useEffect(() => {
        setFollowers(game.followers);
        if (game.followers.includes(user.id)) {
            setFollowed(true);
        }
    }, [game])

    return (
        <Header>
            <GameIcon src={game.icon_url}/>
            <FlexVerticalLayout>
                <CommunityTag>Community</CommunityTag>
                <HorizontalLine/>
                <GameTitle>{game.title}</GameTitle>
                <FlexHorizontalLayout>
                    { 
                    followed
                    ? <FollowedButton onClick={setFollowedStatus}>
                        Followed
                        <CheckCircleOutlineIcon sx={{fontSize: "1em", marginLeft: "0.25em"}}/>
                    </FollowedButton>
                    : <FollowButton onClick={setFollowedStatus}>Follow</FollowButton>
                    }
                    <FollowerAmount>
                        <PersonIcon sx={{fontSize: "1em", marginRight:"0.25vw"}}/>
                        { followers.length === 1? `${followers.length} Follower` : `${followers.length} Followers`}
                    </FollowerAmount>
                </FlexHorizontalLayout>
            </FlexVerticalLayout>
        </Header>
    )
}

export default CommunityHeader;