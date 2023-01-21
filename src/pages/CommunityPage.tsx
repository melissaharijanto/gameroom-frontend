import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GameCommunity, GameCommunityInitialValue } from "../compiler/interface/GameCommunity";
import { BlackBackground } from "../components/Background";
import * as Constants from "../constants";
import NavigationBar from "../components/NavigationBar";
import CommunityHeader from "../components/CommunityHeader";
import { CreatePost } from "../components/Button";
import PostComponent from "../components/PostComponent";
import { Post } from "../compiler/interface/Post";
import { CenterAlignedFlex } from "../components/Layout";

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

const IndividualPostContainer = styled.div`
    margin-top: 2vh;
    margin-bottom: 3vh;
`

const HorizontalLine = styled.hr`
    background-color: ${Constants.MAGENTA100};
    border: none;
    height: 2px;
    margin: 0.5vw 0;
    width: 15vw;
`

const NoPostsText = styled.span<{underline?: string}>`
    color: ${props => props.color? props.color : Constants.WHITE100};
    font-family: Metropolis-SemiBold;
    font-size: 2em;
    line-height: 1.15;
    text-decoration: ${props => props.underline? "underline" : null}
`

const NoPostsLink = styled.a`
    color: ${props => props.color? props.color : Constants.WHITE100};
    cursor: pointer;
    font-family: Metropolis-SemiBold;
    font-size: 2em;
    line-height: 1.15;
    text-decoration: underline;

    :hover {
        color: ${Constants.MAGENTA100};
    }
`

const TextWrapper = styled(CenterAlignedFlex)`
    margin-top: 10vh;
    margin-bottom: 10vh;
    flex-direction: column;
`

/**
 * Displays a page with a header and game icon, as well as post previews.
 * 
 * @returns A styled community page.
 */
const CommunityPage = () => {

    /**
     * Grabs the game ID from the URL.
     */
    let { id } = useParams();
    const navigate = useNavigate();
    const [posts, setPosts] = useState<Post[]>([]);
    const [gameCommunity, setGameCommunity] = useState<GameCommunity>(GameCommunityInitialValue);

    /**
     * Fetches game community data from the backend.
     */
    const fetchGameCommunityData = () => {
        axios.get(Constants.API_ENDPOINT + `/game_communities/${id}`)
            .then(response => setGameCommunity(response.data))
            .catch(error => console.log(error));
    }

    /**
     * Fetches posts from the backend based on the game community ID.
     */
    const fetchPosts = () => {
        axios.post(Constants.API_ENDPOINT + "/community_posts", {game_community_id: id}, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("gameroom")}`
            }
        }).then((response) => {
                setPosts(response.data);
            }).catch((error) => {
                console.log(error);
            })
    }

    const navigateToCreatePost = () => {
        navigate(`/community/${id}/posts/new`)
    }

    /**
     * Fetches game community data upon load.
     */
    useEffect(() => {
        fetchGameCommunityData();
    }, [])

    /**
     * Fetches posts upon initialization of gameCommunity.
     */
    useEffect(() => {
        fetchPosts();
    }, [gameCommunity])

    return (
        <BlackBackground>
            <NavigationBar/>
            <CommunityHeader game={gameCommunity}/>
            <br/>
            <br/>
            <br/>
            <Div>
                <CreatePost onClick={navigateToCreatePost}>+ Create New Post</CreatePost>
                <ForumWall>Forum Wall</ForumWall>
                <HorizontalLine/>
            </Div>
            <br/>
            <PostDiv>
                {posts.length === 0
                ? (
                    <TextWrapper>
                        <NoPostsText>No posts to see here.</NoPostsText>
                        <span>
                            <NoPostsText>Start a discussion by </NoPostsText>
                            <NoPostsLink color={Constants.YELLOW100} onClick={navigateToCreatePost}>creating a post</NoPostsLink>
                            <NoPostsText>.</NoPostsText>
                        </span>
                    </TextWrapper>
                )
                : posts.map(post => {
                    return (
                        <IndividualPostContainer>
                            <PostComponent post={post}/>
                        </IndividualPostContainer>
                    )
                })}
            </PostDiv>
        </BlackBackground>
    )
}

export default CommunityPage;