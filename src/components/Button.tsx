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
const LogIn = styled(Button)`
    background-image: linear-gradient(to right, ${Colors.MAGENTA100}, ${Colors.BLUE100});
    color: white;
    margin-right: 0.75em;
`

const SignUp = styled(Button)`
    background-color: ${Colors.YELLOW100};
    color: black;
`

export { LogIn, SignUp };