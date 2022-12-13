import styled from 'styled-components';
import * as Constants from '../constants';
import { LeftAlignedFlex } from './Layout';


/**
 * Wrapper to keep two different text components in one line.
 */
const TextCombiner = styled.text`
    padding-bottom: 0.25em;
`
const StyledLabel = styled.label`
    color: ${(props) => props.color? props.color : Constants.YELLOW100};
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
        color: ${Constants.BLACK35};
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

const SignUpForm = () => {
    return (
        <form>
            <LeftAlignedFlex direction="column">
                <TextCombiner>
                    <StyledLabel color={Constants.WHITE100}>What will your </StyledLabel>
                    <StyledLabel>username </StyledLabel>
                    <StyledLabel color={Constants.WHITE100}>be?</StyledLabel>
                </TextCombiner>
                <StyledInput required placeholder="Enter your username here."></StyledInput> 
                <TextCombiner>
                    <StyledLabel color={Constants.WHITE100}>Create a </StyledLabel>
                    <StyledLabel>password.</StyledLabel>
                </TextCombiner>
                <StyledInput required placeholder="Enter your password here."></StyledInput>
            </LeftAlignedFlex>
        </form>  
        
    )
}

export { LoginForm, SignUpForm };