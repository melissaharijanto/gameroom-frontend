import CompleteLogo from '../resources/images/logos/complete-logo.png';
import * as Colors from '../constants';
import styled from 'styled-components';
import { StyledBackgroundBeforeLogin } from "../components/Background";
import { WhiteHorizontalLine } from "../components/HorizontalLine";
import { BackToLandingPageText } from "../components/StyledLink";
import { SmallCompleteLogo } from "../components/StyledLogo";
import { SignUpForm } from '../components/Forms';
import { LogIn, SignUp } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { BoldText, HeadingWrapper } from '../components/StyledText';

const SignUpPage = () => {
    const navigation = useNavigate();

    const navigateToLogIn = () => {
        navigation("/login");
    }
    
    return (
        <StyledBackgroundBeforeLogin>
            <SmallCompleteLogo src={CompleteLogo}/>
            <WhiteHorizontalLine/>
            <HeadingWrapper>
                <BoldText>Sign up to start</BoldText> 
                <BoldText color={Colors.YELLOW100}> interacting</BoldText>
                <br/>
                <BoldText> with your fellow gamers!</BoldText>
            </HeadingWrapper>
            <SignUpForm/>
            <br/>
            <SignUp>Sign Up</SignUp>
            <br/>
            <WhiteHorizontalLine/>
            <BoldText>Have an account?</BoldText>
            <br/>
            <LogIn marginRight="0em" onClick={navigateToLogIn}>Log In</LogIn>
            <br/>
            <BackToLandingPageText href="/">&#129040; Landing Page</BackToLandingPageText>
        </StyledBackgroundBeforeLogin>
    )
}

export default SignUpPage;