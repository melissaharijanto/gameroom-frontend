import Logo from '../resources/images/logos/complete-logo.png';
import styled from 'styled-components';
import * as Colors from '../constants';
import { StyledBackgroundBeforeLogin } from '../components/Background';
import { WhiteHorizontalLine } from '../components/HorizontalLine';
import { BackToLandingPageText } from '../components/StyledLink';
import { LoginForm } from '../components/Forms';
import { LogIn, SignUp } from '../components/Button';
import { SmallCompleteLogo } from '../components/StyledLogo';
import { useNavigate } from 'react-router-dom';

const StyledText = styled.text`
    font-family: Metropolis-Bold;
    font-size: 1.5em;
    color: ${(props) => props.color? props.color : Colors.WHITE100};
`

const Heading = styled.text`
    padding-bottom: 1em;
`

const LoginPage = () => {
    const navigation = useNavigate();

    const navigateToSignUp = () => {
        navigation("/signup");
    }

    return (
        <StyledBackgroundBeforeLogin>
            <SmallCompleteLogo src={Logo}/>
            <WhiteHorizontalLine/>
            <Heading>
                <StyledText>Log in to</StyledText> &nbsp;
                <StyledText color={Colors.YELLOW100}>continue.</StyledText>
            </Heading>
            <LoginForm/>
            <br/>
            <LogIn marginRight="0em">Log In</LogIn>
            <br/>
            <WhiteHorizontalLine/>
            <StyledText>Don't have an account?</StyledText>
            <br/>
            <SignUp onClick={navigateToSignUp}>Sign Up</SignUp>
            <br/>
            <BackToLandingPageText href="/">&#129040; Landing Page</BackToLandingPageText>
        </StyledBackgroundBeforeLogin>
    )
}

export default LoginPage;