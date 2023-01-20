import { BlackBackground } from "../components/Background";
import styled from 'styled-components';
import * as Constants from '../constants';
import NavigationBar from "../components/NavigationBar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { BackButton, CreatePost } from "../components/Button";

const CurrentlyWritingForText = styled.span`
    color: ${props => props.color? props.color : Constants.WHITE100};
    font-family: Metropolis-SemiBold;
    font-size: 1.2em;
    line-height: 1.15;
`

const Grid = styled.div`
    display: grid;
    grid-template-columns: 2fr 8fr;
    align-items: center;
    justify-items: center;
    position: absolute;
    width: 100vw;
`

const TableDiv30 = styled.div`
    position: relative;
    padding-left: 5em;
`

const TableDiv70 = styled.div`
    padding-top: 3vw;
    position: relative;
    width: 70%;
`

const PostContainer = styled.div`
    background: linear-gradient(${Constants.BLUE25}, ${Constants.BLUE85});
    border: none;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center; 
    padding: 3em 3em 1.5em 3em;
    position: relative;
    width: 100%;
`

const TitleInput = styled.input`
    background-color: ${Constants.WHITE25};
    border: none;
    border-radius: 20px;
    color: ${Constants.WHITE100};
    font-family: Metropolis-RegularItalic;
    font-size: 1em;
    margin-bottom: 1em;
    padding: 0.875em;
    position: relative;
    width: 100%;

    :focus {
        outline: none;
    }
`

const BodyInput = styled.textarea`
    background-color: ${Constants.WHITE25};
    border: none;
    border-radius: 20px;
    color: ${Constants.WHITE100};
    font-family: Metropolis-RegularItalic;
    font-size: 1em;
    min-height: 60vh;
    justify-content: center;
    line-height: 1.5;
    padding: 0.875em;
    position: relative;
    resize: none;
    width: 100%;

    :focus {
        outline: none;
    }
`

const Div = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin-top: 1em;
`

const ErrorMessage = styled.span`
    color: ${Constants.YELLOW100};
    font-family: Metropolis-SemiBoldItalic;
    font-size: 1em;
`

const CreatePostPage = () => {
    const [gameName, setGameName] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [postBody, setPostBody] = useState<string>("");
    const [showErrorMessage, setShowErrorMessage] = useState<Boolean>(false);

    const navigate = useNavigate();
    const { id } = useParams();

    const fetchGameCommunity = () => {
        axios.get(Constants.API_ENDPOINT + `/game_communities/${id}`)
            .then(response => setGameName(response.data.title))
            .catch(error => console.log(error));
    }

    const handleTitleChange = (e : any) => {
        setTitle(e.target.value);
    }

    const handlePostBodyChange = (e: any) => {
        setPostBody(e.target.value);
    }

    const publish = () => {
        if (title.trim() === "" || postBody.trim() === "") {
            setShowErrorMessage(true);
        } else {
            axios.post(Constants.API_ENDPOINT + "/posts", {
                post: {
                    title: title,
                    body: postBody,
                    username: JSON.parse(sessionStorage.getItem('user')!).username,
                    user_id: JSON.parse(sessionStorage.getItem('user')!).id,
                    game_community_id: id
                }
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem("gameroom")}`
                }
            }).then(response => navigate(`/community/${id}/posts/${response.data.id}`))
            .catch(error => console.log(error));
        }
    }

    const displayCurrentlyWritingForMessage = () => {
        return (
            <TableDiv30>
                <span>
                    <CurrentlyWritingForText>You are currently writing for the </CurrentlyWritingForText>
                    <CurrentlyWritingForText color={Constants.YELLOW100}>{gameName} </CurrentlyWritingForText>
                    <CurrentlyWritingForText>community.</CurrentlyWritingForText>
                </span>
                <br/>
                <br/>
                <span>
                    <CurrentlyWritingForText>Not in the right </CurrentlyWritingForText>
                    <CurrentlyWritingForText color={Constants.MAGENTA100}>community</CurrentlyWritingForText>
                    <CurrentlyWritingForText>? Click the </CurrentlyWritingForText>
                    <CurrentlyWritingForText color={Constants.BLUE100}>back button </CurrentlyWritingForText> 
                    <CurrentlyWritingForText>and navigate to your community to create a post there!</CurrentlyWritingForText>
                </span>
                <BackButton onClick={navigateToCommunityPage}>&lt; Back</BackButton>
            </TableDiv30>
        )
    }
    
    const navigateToCommunityPage = () => {
        navigate(`/community/${id}`);
    }

    useEffect(() => {
        fetchGameCommunity();
    }, [])

    useEffect(() => {
        setShowErrorMessage(false);
    }, [title, postBody])

    return (
        <BlackBackground>
            <NavigationBar/>
            <Grid>
                {displayCurrentlyWritingForMessage()}
                <TableDiv70>
                    <PostContainer>
                        <TitleInput 
                            placeholder="Enter the title of your post here."
                            onChange={handleTitleChange}
                        />
                        <BodyInput 
                            placeholder="What do you want to talk about?"
                            onChange={handlePostBodyChange}
                        />
                        <Div>
                            {showErrorMessage? <ErrorMessage>A post's title and body cannot be empty!</ErrorMessage> : null }
                        </Div>
                        <Div>
                            <CreatePost onClick={publish}>Publish</CreatePost>
                        </Div>
                    </PostContainer>
                </TableDiv70>
            </Grid>
            
        </BlackBackground>
    )
}

export default CreatePostPage;