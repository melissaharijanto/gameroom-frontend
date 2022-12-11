import styled from 'styled-components';
import * as Colors from '../constants';

const Button = styled.button`
    font-family: Metropolis-SemiBold;
    font-size: 1.5em;
    padding: 0.75em 3em 0.75em 3em;
    border: 0px solid;
    border-radius: 50px;
    cursor: pointer;
`
const LogIn = styled(Button)<{marginRight: string}>`
    background: linear-gradient(to right, ${Colors.MAGENTA100}, ${Colors.BLUE100});
    color: white;
    margin-right: ${(props) => props.marginRight ? props.marginRight: "0em"};
    transition: opacity 0.3s;

    :hover {
        opacity: 0.65;
    }
`
const SignUp = styled(Button)`
    background-color: ${Colors.YELLOW100};
    color: black;
    transition: all 0.3s ease-in;

    :hover {
        background-color: ${Colors.YELLOW_ACCENT};
    }
`

export { LogIn, SignUp };