import styled from 'styled-components';
import * as Constants from '../constants';
import CommentIcon from '@mui/icons-material/Comment';
import { VerticallyCenterAlignedFlex } from './Layout';
import { Post } from '../compiler/interface/Post';
import { useNavigate, useParams } from 'react-router-dom';

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

export const PostTitle = styled.span`
    color: ${Constants.WHITE100};
    font-family: Metropolis-Bold;
    font-size: 3em;
`

export const PostedBy = styled.span`
    color: ${props => props.color? props.color: Constants.WHITE100};
    font-family: Metropolis-SemiBold;
    font-size: 1.25em;
`

export const TextDiv = styled.div`
    margin-bottom: 1em;
    margin-top: 1em;
`

export const PostBody = styled.span`
    color: ${Constants.WHITE100};
    font-family: Metropolis-Medium;
    font-size: 1em;
    line-height: 1.5;
    white-space: pre-wrap;
`

const CommentCount = styled(PostBody)`
    margin-left: 0.75em;
`

/**
 * A post component to be displayed on the CommunityPage. Instead of displaying the full body like
 * CommunityPostComponent, this serves as a 'Post Preview' and displays a limited amount of characters 
 * of the comment body.
 * 
 * @param post The post object fetched from the backend.
 * @returns A designed post component.
 */
const PostComponent = ({ post } : { post: Post }) => {
    const { id } = useParams();
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

    const navigateToCommunityPostPage = () => {
        navigate(`/community/${id}/posts/${post.id}`)
    }

    /**
     * Parses the comment body if it is more than 1150 characters. If it is less,
     * it will return the original comment body.
     * 
     * @param body The comment body.
     * @returns The summarized comment body.
     */
    const parseBody = (body: string) => {
        if (body.length > 1150) {
            let substring = body.substring(0, 1150);
            return substring + '...';
        } else {
            return body;
        }
    }

    return (
        <PostDiv onClick={navigateToCommunityPostPage}>
            <PostTitle>{post.title}</PostTitle>
            <TextDiv>
                <span>
                    <PostedBy>Posted by </PostedBy>
                    <PostedBy color={Constants.YELLOW100}>@{post.username} </PostedBy>
                    <PostedBy>on {parseDate(post.created_at)}</PostedBy>
                </span>
            </TextDiv>
            <TextDiv>
                <PostBody>{parseBody(post.body)}</PostBody>
            </TextDiv>
            <VerticallyCenterAlignedFlex>
                <CommentIcon sx={{fill: Constants.WHITE100, fontSize: '1.5em'}}/>
                <CommentCount>{post.comments.length}</CommentCount>
            </VerticallyCenterAlignedFlex>
        </PostDiv>
    )
}

export default PostComponent;