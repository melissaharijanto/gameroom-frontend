import { BlackBackground } from "../components/Background";
import NavigationBar from "../components/NavigationBar";
import styled from 'styled-components';
import { BackButton } from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import CommunityPostComponent from "../components/CommunityPostComponent";
import axios from "axios";
import * as Constants from '../constants';
import { useEffect, useState } from "react";
import { Post, PostInitialState } from "../compiler/interface/Post";

const FloatLeftDiv = styled.div`
    float: left;
    width: 62.5%;
`

const WrapperDiv = styled.div`
    display: grid;
    grid-template-columns: 2fr 8fr;
    padding-left: 1vw;
    column-gap: 0;
`

const PostDiv = styled.div`
    margin-top: 3vw;
    margin-right: 1vw;
`

/**
 * Displays a page with a complete post, as well as its comments.
 * 
 * @returns A styled community page.
 */
const CommunityPostPage = () => {
    const navigate = useNavigate();
    const { id, postid } = useParams();
    const [post, setPost] = useState<Post>(PostInitialState);

    /**
     * Gets post data from backend through its ID.
     */
    const getPost = () => {
        axios.get(Constants.API_ENDPOINT + `/posts/${postid}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("gameroom")}`
            }
        }).then(response => setPost(response.data))
        .catch(error => console.log(error));
    }

    const navigateToCommunityPage = () => {
        navigate(`/community/${id}`)
    }

    /**
     * Gets post upon page load.
     */
    useEffect(() => {
        getPost();
    }, [])

    return (
        <BlackBackground>
            <NavigationBar/>
            <WrapperDiv>
                <FloatLeftDiv>
                    <BackButton onClick={navigateToCommunityPage}>&lt; Back</BackButton>
                </FloatLeftDiv>
                <PostDiv>
                    <CommunityPostComponent post={post}/>
                </PostDiv>
            </WrapperDiv>
        </BlackBackground>
    )
}

export default CommunityPostPage;