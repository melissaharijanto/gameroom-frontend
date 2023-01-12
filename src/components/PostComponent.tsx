import styled from 'styled-components';
import * as Constants from '../constants';

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

const PostComponent = () => {
    return (
        <PostDiv>
            <PostTitle>HELLOOOO</PostTitle>
            <TextDiv>
                <span>
                    <PostedBy>Posted by </PostedBy>
                    <PostedBy color={Constants.YELLOW100}>@johndoe </PostedBy>
                    <PostedBy>on 31 December 2022, 20:00</PostedBy>
                </span>
            </TextDiv>
            <TextDiv>
                <PostBody>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </PostBody>
            </TextDiv>
        </PostDiv>
    )
}

export default PostComponent;