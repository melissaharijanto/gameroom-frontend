import styled from 'styled-components';
import * as Constants from '../constants';
import CommentIcon from '@mui/icons-material/Comment';
import { VerticallyCenterAlignedFlex } from './Layout';
import { Post } from '../compiler/interface/Post';

const PostDiv = styled.button`
    background: linear-gradient(${Constants.BLUE25}, ${Constants.BLUE75});
    border: none;
    border-radius: 20px;
    cursor: pointer;
    padding: 2em 3em 2em 3em;
    text-align: left;
    transition: all 0.3s ease-in;
    width: 100%;

    :hover {
        background: linear-gradient(${Constants.PURPLE25}, ${Constants.PURPLE75});
    }
`

const PostTitle = styled.span`
    color: ${Constants.WHITE100};
    font-family: Metropolis-Bold;
    font-size: 3em;
`

const PostedBy = styled.span`
    color: ${props => props.color? props.color: Constants.WHITE100};
    font-family: Metropolis-SemiBold;
    font-size: 1.25em;
`

const TextDiv = styled.div`
    margin-bottom: 1em;
    margin-top: 1em;
`

const PostBody = styled.span`
    color: ${Constants.WHITE100};
    font-family: Metropolis-Medium;
    font-size: 1em;
    line-height: 1.5;
`

const CommentCount = styled(PostBody)`
    margin-left: 0.75em;
`

const PostComponent = ({ post } : { post: Post }) => {
    const parseDate = (date: string) => {
        const dateObject = new Date(date);
        const year = dateObject.getFullYear();
        const month = dateObject.getMonth();
        const day = dateObject.getDate();
        const hour = dateObject.getHours();
        const mins = dateObject.getMinutes();
        const parsedDate = day + " " + Constants.MONTHS[month] + " " + year + ", " + hour + ":" + mins;
        return parsedDate;
    }

    return (
        <PostDiv>
            <PostTitle>{post.title}</PostTitle>
            <TextDiv>
                <span>
                    <PostedBy>Posted by </PostedBy>
                    <PostedBy color={Constants.YELLOW100}>@{post.username} </PostedBy>
                    <PostedBy>on {parseDate(post.created_at)}</PostedBy>
                </span>
            </TextDiv>
            <TextDiv>
                <PostBody>{post.body}</PostBody>
            </TextDiv>
            <VerticallyCenterAlignedFlex>
                <CommentIcon sx={{fill: Constants.WHITE100, fontSize: '1.5em'}}/>
                <CommentCount>{post.comments.length}</CommentCount>
            </VerticallyCenterAlignedFlex>
        </PostDiv>
    )
}

export default PostComponent;