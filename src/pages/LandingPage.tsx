import styled from 'styled-components';
import * as Colors from '../constants';
import Console from '../resources/images/logos/console-only.png';
import Logo from '../resources/images/logos/colored-text.png';
import { SignUp, LogIn } from '../components/Button';
import * as Layout from '../components/Layout';
import { LargeColoredTextLogo, LargeConsoleLogo } from '../components/StyledLogo';
import { StyledBackgroundBeforeLogin } from '../components/Background';
import { useNavigate } from 'react-router-dom';

const StyledText = styled.text`
    font-family: Metropolis-SemiBold;
    font-size: 3.5em;
    color: ${Colors.WHITE100}
`

const LandingPage = () => {

    const navigation = useNavigate();

    const navigateToLogIn = () => {
        navigation("/login");
    }

    const navigateToSignUp= () => {
        navigation("/signup");
    }

    return (
        <StyledBackgroundBeforeLogin>
            <Layout.HorizontalGrid>
                <Layout.RightAlignedLayout>
                    <LargeConsoleLogo src={Console}/>
                </Layout.RightAlignedLayout>
                <Layout.LeftAlignedLayout>
                    <Layout.FlexVerticalLayout>
                        <StyledText>welcome to</StyledText>
                        <LargeColoredTextLogo src={Logo}/>
                        <Layout.FlexHorizontalLayout>
                            <LogIn marginRight="0.75em" onClick={navigateToLogIn}>Log In</LogIn>
                            <SignUp onClick={navigateToSignUp}>Sign Up</SignUp>
                        </Layout.FlexHorizontalLayout>
                    </Layout.FlexVerticalLayout>
                </Layout.LeftAlignedLayout>
            </Layout.HorizontalGrid>
        </StyledBackgroundBeforeLogin>
    );
}

export default LandingPage;