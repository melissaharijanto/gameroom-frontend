import CompleteLogo from '../resources/images/logos/complete-logo.png';
import * as Constants from '../constants';
import { StyledBackgroundBeforeLogin } from "../components/Background";
import { WhiteHorizontalLine } from "../components/HorizontalLine";
import { BackToLandingPageText } from "../components/StyledLink";
import { SmallCompleteLogo } from "../components/StyledLogo";
import { SignUpForm } from '../components/Forms';
import { LogIn } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { BoldText, HeadingWrapper } from '../components/StyledText';
import RedirectToDashboardRoute from '../components/RedirectToDashboardRoute';

/**
 * Displays a page with a sign up form.
 * 
 * @returns A styled sign up page.
 */
const SignUpPage = () => {
    const navigation = useNavigate();

    const navigateToLogIn = () => {
        navigation("/login");
    }
    
    return (
        <RedirectToDashboardRoute>
            <StyledBackgroundBeforeLogin>
                <SmallCompleteLogo src={CompleteLogo}/>
                <WhiteHorizontalLine/>
                <HeadingWrapper>
                    <BoldText>Sign up to start</BoldText> 
                    <BoldText color={Constants.YELLOW100}> interacting</BoldText>
                    <br/>
                    <BoldText> with your fellow gamers!</BoldText>
                </HeadingWrapper>
                <SignUpForm/>
                <br/>
                <WhiteHorizontalLine/>
                <BoldText>Have an account?</BoldText>
                <br/>
                <LogIn marginRight="0em" onClick={navigateToLogIn}>Log In</LogIn>
                <br/>
                <BackToLandingPageText href="/">&#129040; Landing Page</BackToLandingPageText>
            </StyledBackgroundBeforeLogin>
        </RedirectToDashboardRoute>
    )
}

export default SignUpPage;