import Logo from '../resources/images/logos/complete-logo.png';
import * as Constants from '../constants';
import { StyledBackgroundBeforeLogin } from '../components/Background';
import { WhiteHorizontalLine } from '../components/HorizontalLine';
import { BackToLandingPageText } from '../components/StyledLink';
import { LoginForm } from '../components/Forms';
import { SignUp } from '../components/Button';
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
                <BoldText color={Constants.YELLOW100}>continue.</BoldText>
            </HeadingWrapper>
            <LoginForm/>
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