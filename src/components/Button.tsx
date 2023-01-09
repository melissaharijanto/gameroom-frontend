import styled from 'styled-components';
import * as Constants from '../constants';

const Button = styled.button`
    font-family: Metropolis-SemiBold;
    font-size: 1.5em;
    padding: 0.75em 3em 0.75em 3em;
    border: 0px solid;
    border-radius: 50px;
    cursor: pointer;
`
const LogIn = styled(Button)<{marginRight: string}>`
    background: linear-gradient(to right, ${Constants.MAGENTA100}, ${Constants.BLUE100});
    color: white;
    margin-right: ${(props) => props.marginRight ? props.marginRight: "0em"};
    transition: opacity 0.3s;

    :hover {
        opacity: 0.65;
    }
`
const SignUp = styled(Button)`
    background-color: ${Constants.YELLOW100};
    color: black;
    transition: all 0.3s ease-in;
    :hover {
        background-color: ${Constants.YELLOW_ACCENT};
    }
`

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

const CreatePost = styled.button`
    background-color: ${Constants.MAGENTA100};
    border: 2px solid;
    border-color: ${Constants.WHITE100};
    border-radius: 50px;
    color: ${Constants.WHITE100};
    font-family: Metropolis-Bold;
    float: right;
    padding: 0.5em 1.5em;
    transition: all 0.3s ease-in;

    :hover {
        background-color: ${Constants.MAGENTA_ACCENT};
    }
`

export { LogIn, SignUp, LogOut, CreatePost };