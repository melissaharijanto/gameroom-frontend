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
import { BoldText, HeadingWrapper } from '../components/StyledText';

const LoginPage = () => {
    const navigation = useNavigate();

    const navigateToSignUp = () => {
        navigation("/signup");
    }

    return (
        <StyledBackgroundBeforeLogin>
            <SmallCompleteLogo src={Logo}/>
            <WhiteHorizontalLine/>
            <HeadingWrapper>
                <BoldText>Log in to</BoldText> &nbsp;
                <BoldText color={Colors.YELLOW100}>continue.</BoldText>
            </HeadingWrapper>
            <LoginForm/>
            <br/>
            <LogIn marginRight="0em">Log In</LogIn>
            <br/>
            <WhiteHorizontalLine/>
            <BoldText>Don't have an account?</BoldText>
            <br/>
            <SignUp onClick={navigateToSignUp}>Sign Up</SignUp>
            <br/>
            <BackToLandingPageText href="/">&#129040; Landing Page</BackToLandingPageText>
        </StyledBackgroundBeforeLogin>
    )
}

export default LoginPage;