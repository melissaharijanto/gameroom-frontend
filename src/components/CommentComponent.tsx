import styled from 'styled-components';
import * as Constants from '../constants';
import { Button, VerticallyCenter, WhiteText } from './CommunityPostComponent';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Comment, CommentInitialState } from '../compiler/interface/Comment';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import Modal, { ModalType } from './Modal';
import { useParams } from 'react-router-dom';

const CommentWrapper = styled.div`
    background: linear-gradient(${Constants.YELLOW25}, ${Constants.YELLOW75});
    border-radius: 20px;
    padding: 2em;
`

const CommentedByDiv = styled.div`
    padding-bottom: 0.5em;
`
const CommentedBy = styled.span`
    color: ${props => props.color? props.color : Constants.WHITE100};
    font-family: Metropolis-SemiBold;
    font-size: 1.125em;
`

const CommentBody = styled.span`
    color: ${Constants.WHITE100};
    font-family: Metropolis-Medium;
    font-size: 1em;
    line-height: 1.5;
    white-space: pre-wrap;
`

const CommentBodyDiv = styled.div`
    padding-bottom: 0.5em;
    padding-top: 0.5em;
`

const CommentBodyInput = styled.textarea`
    background-color: ${Constants.WHITE25};
    border: none;
    border-radius: 20px;
    color: ${Constants.WHITE100};
    font-family: Metropolis-RegularItalic;
    font-size: 1em;
    min-height: 10vh;
    justify-content: center;
    line-height: 1.5;
    padding: 0.875em;
    position: relative;
    resize: none;
    width: 95%;

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

const CommentComponent = ({ commentId } : { commentId : number }) => {

    const user = JSON.parse(sessionStorage.getItem("user")!);
    const { postid } = useParams();

    const [comment, setComment] = useState<Comment>(CommentInitialState);
    const [liked, setLiked] = useState<Boolean>(false);
    const [likesArray, setLikesArray] = useState<number[]>([]);
    const [showModal, setShowModal] = useState<Boolean>(false);
    const [editMode, setEditMode] = useState<Boolean>(false);
    const [commentBody, setCommentBody] = useState<string>("");

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

    const fetchComment = () => {
        axios.get(Constants.API_ENDPOINT + `/comments/${commentId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("gameroom")}`
            }
        }).then(response => setComment(response.data))
            .catch(error => console.log(error));
    }

    const deleteComment = () => {
        axios.delete(Constants.API_ENDPOINT + `/comments/${commentId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("gameroom")}`
            }
        }).then(response => {
            window.location.reload();
        }).catch(error => console.log(error));
    }

    const cancelShowModal = () => {
        setShowModal(false);
    }

    const modalFunctions : ModalType = {
        delete: deleteComment,
        cancel: cancelShowModal,
    }

    const handleLikes = () => {
        axios.post(Constants.API_ENDPOINT + `/comment_likes`, {
            id: commentId,
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

    const handleCommentChange = (e: any) => {
        setCommentBody(e.target.value);
    } 

    const saveCommentChange = () => {
        if (commentBody.trim() === "") {

        } else {
            axios.put(Constants.API_ENDPOINT + `/comments/${comment.id}`, {
                comment: {
                    body: commentBody,
                    post_id: postid,
                    user_id: user.id,
                    username: user.username,
                }
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
    useEffect(() => {
        fetchComment();
    }, [])

    useEffect(() => {
        setLikesArray(comment.likes);
        if (comment.likes.includes(user.id)) {
            setLiked(true);
        }
        setCommentBody(comment.body);
    }, [comment])

    useEffect(() => {
        if (editMode === false) {
            setCommentBody(comment.body);
        }
    }, [editMode])

    return (
        <CommentWrapper>
            {showModal? <Modal functions={modalFunctions}/> : null}
            { comment.user_id === user.id
                ? (
                <>
                    <Button float="right" onClick={() => setShowModal(true)}>
                        <CancelIcon sx={{fill: Constants.WHITE100, fontSize: '1.5em'}}/>
                    </Button>
                    <Button float="right" onClick={() => setEditMode(!editMode)}>
                        <ModeEditOutlineOutlinedIcon sx={{fill: Constants.WHITE100, fontSize: '1.5em'}}/>
                    </Button>
                </>
                ) : null
            }
            <CommentedByDiv>
                <CommentedBy>Commented by </CommentedBy>
                <CommentedBy color={Constants.YELLOW100}>@{comment.username} </CommentedBy>
                <CommentedBy>on {parseDate(comment.created_at)}</CommentedBy>
            </CommentedByDiv>
            <CommentBodyDiv>
                {editMode 
                    ? <CommentBodyInput
                        value={commentBody}
                        onChange={handleCommentChange}/> 
                    : <CommentBody>{comment.body}</CommentBody>}
            </CommentBodyDiv>
            <Button onClick={handleLikes}>
                <VerticallyCenter>
                    { liked
                        ? <ThumbUpIcon sx={{fill: Constants.WHITE100, fontSize: '1.5em'}}/>
                        : <ThumbUpOutlinedIcon sx={{fill: Constants.WHITE100, fontSize: '1.5em'}}/>
                    }
                    <WhiteText>{likesArray.length}</WhiteText>    
                </VerticallyCenter>
            </Button>
            { editMode ? <SaveChangesButton onClick={saveCommentChange}>Save Changes</SaveChangesButton> : null }
        </CommentWrapper>
    )
}

export default CommentComponent;