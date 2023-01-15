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

const CommunityPostComponent = ({post} : {post : Post}) => {

    const { id } = useParams();
    const user = JSON.parse(sessionStorage.getItem("user")!);
    const [liked, setLiked] = useState<Boolean>(false);
    const [likesArray, setLikesArray] = useState<number[]>(post.likes);
    const [showModal, setShowModal] = useState<Boolean>(false);
    const [newComment, setNewComment] = useState<string>("");
    const [editMode, setEditMode] = useState<Boolean>(false);

    const navigate = useNavigate();
    
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

    const handleNewCommentChange = (e : any) => {
        setNewComment(e.target.value);
    }

    const submitNewComment = () => {
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

    useEffect(() => {
        setLikesArray(post.likes);
        if (likesArray.includes(user.id)) {
            setLiked(true);
        }
    }, [post])

    return (
        <CommunityPostWrapper>
            { post.user_id === user.id
                ? (
                <>
                    <Button float="right" onClick={() => {setShowModal(true)}}>
                        <CancelIcon sx={{fill: Constants.WHITE100, fontSize: '1.625em'}}/>
                    </Button>
                    <Button float="right">
                        <ModeEditOutlineOutlinedIcon sx={{fill: Constants.WHITE100}}/>
                    </Button>
                </>
                ) : null
            }
            <PostTitle>{post.title}</PostTitle>
            <TextDiv>
                <span>
                    <PostedBy>Posted by </PostedBy>
                    <PostedBy color={Constants.YELLOW100}>@{post.username} </PostedBy>
                    <PostedBy>on {parseDate(post.created_at)}</PostedBy>
                </span>
            </TextDiv>
            { showModal? <Modal functions={modalFunctions}/> : null }
            <TextDiv>
                <PostBody>{post.body}</PostBody>
            </TextDiv>
            <Button onClick={handleLikes}>
                <VerticallyCenter>
                    { likesArray.includes(user.id)
                        ? <ThumbUpIcon sx={{fill: Constants.WHITE100, fontSize: '1.5em'}}/>
                        : <ThumbUpOutlinedIcon sx={{fill: Constants.WHITE100, fontSize: '1.5em'}}/>
                    }
                    <WhiteText>{likesArray.length}</WhiteText>    
                </VerticallyCenter>
            </Button>
            <InputDiv>
                <CommentInput 
                    placeholder="Reply to this post here..."
                    onChange={handleNewCommentChange}
                />
                <SubmitButton onClick={submitNewComment}>Submit</SubmitButton>
            </InputDiv>
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