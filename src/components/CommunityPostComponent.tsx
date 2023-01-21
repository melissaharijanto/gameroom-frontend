import styled from 'styled-components';
import { Post } from '../compiler/interface/Post';
import * as Constants from '../constants';
import { PostBody, PostedBy, PostTitle, TextDiv } from './PostComponent';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import CommentComponent from './CommentComponent';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Modal, { ModalType } from './Modal';
import { CenterAlignedFlex} from './Layout';


const CommunityPostWrapper = styled.div`
    background: linear-gradient(${Constants.PURPLE25}, ${Constants.PURPLE75});
    border: none;
    border-radius: 20px;
    padding: 2em;
    width: 90%;
`

export const Button = styled.button<{float?: string}>`
    border: none;
    cursor: pointer;
    float: ${props => props.float? props.float : null};
    background-color: transparent;
    transition: all 0.3s ease-in;
    :hover {
        opacity: 0.5;
    }
`

export const WhiteText = styled.span`
    color: ${Constants.WHITE100};
    font-family: Metropolis-SemiBold;
    font-size: 1.15em;
    margin-left: 0.5em;
`

export const VerticallyCenter = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`

const CommentInput = styled.input`
    background-color: ${Constants.WHITE25};
    border: none;
    border-radius: 20px;
    border-bottom-right-radius: 0px;
    border-top-right-radius: 0px;
    color: ${Constants.WHITE100};
    flex-grow: 2;
    font-family: Metropolis-RegularItalic;
    font-size: 1em;
    padding: 0.875em;
    position: relative;

    :focus {
        outline: none;
    }
`

const CommentDiv = styled.div`
    margin-top: 1vw;
    margin-bottom: 1vw;
`

const InputDiv = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 1em;
    margin-bottom: 1em;
`

const SubmitButton = styled.button`
    background-color: ${Constants.YELLOW100};
    border: none;
    border-radius: 20px;
    border-bottom-left-radius: 0px;
    border-top-left-radius: 0px;
    cursor: pointer;
    font-family: Metropolis-SemiBold;
    font-size: 1em;
    padding: 1em;
    transition: all 0.3s ease-in;

    :hover {
        background-color: ${Constants.YELLOW_ACCENT};
    }
`

const TitleEditInput = styled.input`
    background-color: ${Constants.WHITE50};
    border: none;
    border-radius: 20px;
    color: ${Constants.WHITE100};
    font-family: Metropolis-Bold;
    font-size: 2em;
    padding: 0.5em;
    width: 90%;

    :focus {
        outline: none;
    }
`

const BodyEditInput = styled.textarea`
    background-color: ${Constants.WHITE50};
    border: none;
    border-radius: 20px;
    color: ${Constants.WHITE100};
    font-family: Metropolis-Medium;
    font-size: 1em;
    height: 30vh;
    line-height: 1.5;
    padding: 0.875em;
    resize: none;
    width: 90%;

    :focus {
        outline: none;
    }
`

const SaveChangesButton = styled.button`
    background-color: ${Constants.BLUE100};
    border: solid 1px ${Constants.WHITE100};
    border-radius: 20px;
    color: ${Constants.WHITE100};
    cursor: pointer;
    float: right;
    font-family: Metropolis-SemiBold;
    font-size: 1em;
    padding: 0.75em;
    padding-left: 1.25em;
    padding-right: 1.25em;
    transition: all 0.3s ease-in;

    :hover {
        background-color: ${Constants.BLUE_ACCENT};
    }
`

const EmptyWarning = styled.span`
    color: ${Constants.YELLOW100};
    font-family: Metropolis-SemiBoldItalic;
    font-size: 1em;
`

/**
 * The main post component showed once the User clicks on a PostComponent (aka Post Preview)
 * in the CommunityPage.
 * 
 * @param post The post data fetched from the backend.
 * @returns The designed community post component.
 */
const CommunityPostComponent = ({post} : {post : Post}) => {

    /**
     * Fetches the ID displayed in the URL. The specified id is the game community ID.
     */
    const { id } = useParams();

    /**
     * Fetches user data and username from session storage.
     */
    const user = JSON.parse(sessionStorage.getItem("user")!);

    const [liked, setLiked] = useState<Boolean>(false);
    const [likesArray, setLikesArray] = useState<number[]>(post.likes);
    const [showModal, setShowModal] = useState<Boolean>(false);
    const [newComment, setNewComment] = useState<string>("");
    const [editMode, setEditMode] = useState<Boolean>(false);
    const [postTitle, setPostTitle] = useState<string>("");
    const [postBody, setPostBody] = useState<string>("");
    const [showEmptyCommentWarning, setShowEmptyCommentWarning] = useState<Boolean>(false);
    const [showEmptyPostWarning, setShowEmptyPostWarning] = useState<Boolean>(false);

    const navigate = useNavigate();

    /**
     * Parses date into DD MMMMMMM YYYY format, e.g. 31 January 2022.
     * 
     * @param date Timestamp from Rails backend.
     * @returns Parsed date.
     */
    const parseDate = (date: string) => {
        const dateObject = new Date(date);
        const year = dateObject.getFullYear();
        const month = dateObject.getMonth();
        const day = dateObject.getDate();
        const hour = dateObject.getHours();
        let hourInString = "";
        if (hour < 10) {
            hourInString = "0" + hour.toString();
        }  else {
            hourInString = hour.toString();
        }
        const mins = dateObject.getMinutes();
        let minsInString = "";
        if (mins < 10) {
            minsInString = "0" + mins.toString();
        } else {
            minsInString = mins.toString();
        }
        const parsedDate = day + " " + Constants.MONTHS[month] + " " + year + ", " + hourInString + ":" + minsInString;
        return parsedDate;
    }

    /**
     * Deletes post upon user input. If successful, the page will navigate to the
     * game community page.
     */
    const deletePost = () => {
        axios.delete(Constants.API_ENDPOINT + `/posts/${post.id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("gameroom")}`
            }
        })
            .then(response => {
                console.log(response);
                navigate(`/community/${id}`);
            })
            .catch(error => console.log(error));
    }

    const cancelShowModal = () => {
        setShowModal(false);
    }

    const modalFunctions : ModalType = {
        delete: deletePost,
        cancel: cancelShowModal,
    }

    /**
     * Sends the new comment back to the database. If the comment body
     * is empty, it will display a warning message.
     */
    const submitNewComment = () => {
        if (newComment.trim() === "") {
            setShowEmptyCommentWarning(true);
        } else {
            axios.post(Constants.API_ENDPOINT + `/comments`, {
                comment: {
                    body: newComment,
                    username: user.username,
                    user_id: user.id,
                    post_id: post.id,
                }
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem("gameroom")}`
                }
            }).then(response => {
                setNewComment("");
                window.location.reload();
            }).catch(error => console.log(error));
        }
    }

    /**
     * Handles likes of the post based on the user input and sends the data back to the database,
     */
    const handleLikes = () => {
        axios.post(Constants.API_ENDPOINT + `/post_likes`, {
            id: post.id,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("gameroom")}`
            }
        }).then(response => {
            setLiked(!liked)
            setLikesArray(response.data)
            console.log(response.data)
        }).catch(error => console.log(error.response.data));
    }

    /**
     * handle[*]Change methods for the input elements to detect changes of its values
     * and record them to the states. The recorded states aid in sending the data back 
     * to the backend.
     * 
     * @param e The event in which the user input is recorded.
     */
    const handleTitleChange = (e: any) => {
        setPostTitle(e.target.value);
    }

    const handleBodyChange = (e: any) => {
        setPostBody(e.target.value)
    }

    const handleNewCommentChange = (e : any) => {
        setNewComment(e.target.value);
    }

    /**
     * Saves changes made when the user edits a post and sends the updated data back to the backend.
     * If the user leaves the post title OR body empty, an error message will be shown. Otherwise,
     * if the data is successfully sent to the backend, the page will reload to reflect the changes.
     */
    const saveEditChanges = () => {
        if (postBody.trim() === "" || postTitle.trim() === "") {
            setShowEmptyPostWarning(true);
        } else {
            axios.put(Constants.API_ENDPOINT + `/posts/${post.id}`, {
                title: postTitle,
                body: postBody,
                username: user.username,
                user_id: user.id,
                game_community_id: id
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem("gameroom")}`
                }
            }).then(response => window.location.reload())
            .catch(error => console.log(error));
        }
    }

    /**
     * Fires upon the initialization of the post parameter. If the user has liked a post, 
     * then it will display a filled thumb; otherwise, it will display a thumb outline.
     */
    useEffect(() => {
        setLikesArray(post.likes);
        if (likesArray.includes(user.id)) {
            setLiked(true);
        }
        setPostTitle(post.title);
        setPostBody(post.body);
    }, [post])

    /**
     * If user cancels editing, the values of the input and textarea associated with the editing
     * mode will be reverted to its original state.
     */
    useEffect(() => {
        if (editMode === false) {
            setPostTitle(post.title);
            setPostBody(post.body);
        }
    }, [editMode])

    useEffect(() => {
        setShowEmptyCommentWarning(false);
    }, [newComment])

    useEffect(() => {
        setShowEmptyPostWarning(false);
    }, [postTitle, postBody])

    return (
        <CommunityPostWrapper>
            { post.user_id === user.id
                ? (
                <>
                    <Button float="right" onClick={() => {setShowModal(true)}}>
                        <CancelIcon sx={{fill: Constants.WHITE100, fontSize: '1.625em'}}/>
                    </Button>
                    <Button float="right" onClick={() => setEditMode(!editMode)}>
                        <ModeEditOutlineOutlinedIcon sx={{fill: Constants.WHITE100}}/>
                    </Button>
                </>
                ) : null
            }
            { editMode 
                ? <TitleEditInput 
                    required
                    value={postTitle}
                    onChange={handleTitleChange}/>
                : <PostTitle>{post.title}</PostTitle>
            }
            <TextDiv>
                <span>
                    <PostedBy>Posted by </PostedBy>
                    <PostedBy color={Constants.YELLOW100}>@{post.username} </PostedBy>
                    <PostedBy>on {parseDate(post.created_at)}</PostedBy>
                </span>
            </TextDiv>
            { showModal? <Modal functions={modalFunctions}/> : null }
            <TextDiv>
                {editMode
                    ? <BodyEditInput 
                        required 
                        value={postBody}
                        onChange={handleBodyChange}/>
                    : <PostBody>{post.body}</PostBody>}
                
            </TextDiv>
            <Button onClick={handleLikes}>
                <VerticallyCenter>
                    { likesArray.includes(user.id)
                        ? <ThumbUpIcon sx={{fill: Constants.WHITE100, fontSize: '2em'}}/>
                        : <ThumbUpOutlinedIcon sx={{fill: Constants.WHITE100, fontSize: '2em'}}/>
                    }
                    <WhiteText>{likesArray.length}</WhiteText>  
                </VerticallyCenter>
            </Button>
            { editMode 
                ? <SaveChangesButton onClick={saveEditChanges}>Save Changes</SaveChangesButton> 
                : <InputDiv>
                <CommentInput 
                    placeholder="Reply to this post here..."
                    onChange={handleNewCommentChange}
                    required
                />
                <SubmitButton onClick={submitNewComment}>Submit</SubmitButton>
            </InputDiv> }
            {showEmptyPostWarning
            ? <>
                <CenterAlignedFlex direction="column">
                    <EmptyWarning>Post title and body cannot be empty!</EmptyWarning> 
                </CenterAlignedFlex>
              </>
            : null}
            {showEmptyCommentWarning? <EmptyWarning>Comments cannot be empty.</EmptyWarning> : null}
            {post.comments.map(comment => {
                return (
                <CommentDiv>
                    <CommentComponent commentId={comment}/>
                </CommentDiv>
            )})}
        </CommunityPostWrapper>
    )
}

export default CommunityPostComponent;