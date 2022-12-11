import Logo from '../resources/images/logos/complete-logo.png';
import styled from 'styled-components';
import * as Colors from '../constants';
import { StyledBackgroundBeforeLogin } from '../components/Background';
import { LoginForm } from '../components/Forms';
import { LogIn, SignUp } from '../components/Button';

const StyledLogo = styled.img`
    width: 10%;
    height: auto
`

const StyledHorizontalLine = styled.hr`
    color: white;
    width: 15%;
    margin-bottom: 1.5em;
`

const StyledText = styled.text`
    font-family: Metropolis-Bold;
    font-size: 1.5em;
    color: ${(props) => props.color? props.color : Colors.WHITE100};
`

const Heading = styled.text`
    padding-bottom: 1em;
`

const BackToLandingPageText = styled.a`
    color: ${Colors.WHITE100};
    text-decoration-line: underline;
    font-family: Metropolis-Medium;
    font-size: 1em;
    transition: 0.5s ease;

    :hover {
        color: ${Colors.BLUE100};
    }
`

const LoginPage = () => {
    return (
        <StyledBackgroundBeforeLogin>
            <StyledLogo src={Logo}/>
            <StyledHorizontalLine/>
            <Heading>
                <StyledText>Log in to</StyledText> &nbsp;
                <StyledText color={Colors.YELLOW100}>continue.</StyledText>
            </Heading>
            <LoginForm/>
            <br/>
            <LogIn marginRight="0em">Log In</LogIn>
            <br/>
            <StyledHorizontalLine/>
            <StyledText>Don't have an account?</StyledText>
            <br/>
            <SignUp>Sign Up</SignUp>
            <br/>
            <BackToLandingPageText href="/">&#129040; Back</BackToLandingPageText>
        </StyledBackgroundBeforeLogin>
    )
}

export default LoginPage;