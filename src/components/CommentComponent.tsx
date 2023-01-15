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
`

const CommentBodyDiv = styled.div`
    padding-bottom: 0.5em;
    padding-top: 0.5em;
`

const CommentComponent = ({ commentId } : { commentId : number }) => {

    const user = JSON.parse(sessionStorage.getItem("user")!);
    const [comment, setComment] = useState<Comment>(CommentInitialState);
    const [liked, setLiked] = useState<Boolean>(false);
    const [likesArray, setLikesArray] = useState<number[]>([]);
    const [showModal, setShowModal] = useState<Boolean>(false);

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

    useEffect(() => {
        fetchComment();
    }, [])

    useEffect(() => {
        setLikesArray(comment.likes);
        if (comment.likes.includes(user.id)) {
            setLiked(true);
        }
    }, [comment])

    return (
        <CommentWrapper>
            {showModal? <Modal functions={modalFunctions}/> : null}
            { comment.user_id === user.id
                ? (
                <>
                    <Button float="right" onClick={() => setShowModal(true)}>
                        <CancelIcon sx={{fill: Constants.WHITE100, fontSize: '1.5em'}}/>
                    </Button>
                    <Button float="right">
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
                <CommentBody>{comment.body}</CommentBody>
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
        </CommentWrapper>
    )
}

export default CommentComponent;