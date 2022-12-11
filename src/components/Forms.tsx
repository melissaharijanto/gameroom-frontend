import styled from 'styled-components';
import * as Colors from '../constants';
import { LeftAlignedFlex } from './Layout';

const StyledLabel = styled.label`
    color: ${Colors.YELLOW100};
    font-family: Metropolis-SemiBold;
    padding-top: 0.25em;
    padding-bottom: 0.25em;
    font-size: 1em;
`

const StyledInput= styled.input`
    width: 20vw;
    padding: 0.6em 1em 0.6em 1em;
    margin-bottom: 0.5em;
    font-size: 1em;
    font-family: Metropolis-RegularItalic;
    border: none 0px transparent;
    border-radius: 10px;

    ::placeholder {
        color: ${Colors.BLACK35};
    }
`

const LoginForm = () => {
    return (
        <form>
            <LeftAlignedFlex direction="column">
                <StyledLabel>Username</StyledLabel>
                <StyledInput required placeholder="Enter your username here."></StyledInput> 
                <StyledLabel>Password</StyledLabel>
                <StyledInput required placeholder="Enter your password here."></StyledInput>
            </LeftAlignedFlex>
        </form>  
        
    )
}

export { LoginForm };