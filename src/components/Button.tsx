import styled from 'styled-components';
import * as Constants from '../constants';

/**
 * Reused button styles.
 */
const Button = styled.button`
    font-family: Metropolis-SemiBold;
    font-size: 1.5em;
    padding: 0.75em 3em 0.75em 3em;
    border: 0px solid;
    border-radius: 50px;
    cursor: pointer;
`

/**
 * Login button.
 */
const LogIn = styled(Button)<{marginRight: string}>`
    background: linear-gradient(to right, ${Constants.MAGENTA100}, ${Constants.BLUE100});
    color: white;
    margin-right: ${(props) => props.marginRight ? props.marginRight: "0em"};
    transition: opacity 0.3s;

    :hover {
        opacity: 0.65;
    }
`

/**
 * Sign Up button.
 */
const SignUp = styled(Button)`
    background-color: ${Constants.YELLOW100};
    color: black;
    transition: all 0.3s ease-in;
    :hover {
        background-color: ${Constants.YELLOW_ACCENT};
    }
`

/**
 * Log out button for the navigation bar.
 */
const LogOut = styled(Button)`
    padding: 0.75em 3em 0.75em 3em !important;
    font-size: 1em !important;
    background-color: ${Constants.YELLOW100};
    color: black;
    transition: all 0.3s ease-in;
    float: right;
    margin-right: 1vw;
    margin-top: 0.75vw;

    :hover {
        background-color: ${Constants.YELLOW_ACCENT};
    }
`

/**
 * Create post button for the community pages.
 */
const CreatePost = styled.button`
    background-color: ${Constants.MAGENTA100};
    border: 2px solid;
    border-color: ${Constants.WHITE100};
    border-radius: 50px;
    color: ${Constants.WHITE100};
    font-family: Metropolis-Bold;
    font-size: 1.125em;
    float: right;
    padding: 0.5em 1.5em;
    transition: all 0.3s ease-in;

    :hover {
        background-color: ${Constants.MAGENTA_ACCENT};
    }
`

/**
 * Back button shown in the CreatePostPage.
 */
const BackButton = styled.button`
    background: linear-gradient(${Constants.BLUE100}, ${Constants.PURPLE100});
    border: none;
    border-radius: 50px;
    color: ${Constants.WHITE100};
    cursor: pointer;
    font-family: Metropolis-Bold;
    font-size: 1.125em;
    margin-top: 1em;
    padding: 0.75em 0.75em;
    transition: all 0.3s ease-in;
    width: 85%;

    :hover {
        opacity: 0.5;
    }
`

export { LogIn, SignUp, LogOut, CreatePost, BackButton };