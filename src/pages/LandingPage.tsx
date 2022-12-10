import styled from 'styled-components';
import * as Colors from '../constants';
import Console from '../resources/images/logos/console-only.png';
import Logo from '../resources/images/logos/colored-text.png';
import { SignUp, LogIn } from '../components/Button';
import * as Layout from '../components/Layout';
import { StyledBackgroundBeforeLogin } from '../components/Background';
import { Link } from 'react-router-dom';

const StyledConsole = styled.img`
    width: 55%;
    height: auto;
`

const StyledLogo = styled.img`
    width: 70%;
    height: auto;
    padding-bottom: 1em;
`

const StyledText = styled.text`
    font-family: Metropolis-SemiBold;
    font-size: 3.5em;
    color: ${Colors.WHITE100}
`

const LandingPage = () => {
    return (
        <StyledBackgroundBeforeLogin>
            <Layout.HorizontalGrid>
                <Layout.RightAlignedLayout>
                    <StyledConsole src={Console}/>
                </Layout.RightAlignedLayout>
                <Layout.LeftAlignedLayout>
                    <Layout.FlexVerticalLayout>
                        <StyledText>welcome to</StyledText>
                        <StyledLogo src={Logo}/>
                        <Layout.FlexHorizontalLayout>
                            <Link to="/login">
                                <LogIn>Log In</LogIn>
                            </Link>
                            <Link to="/signup">
                                <SignUp>Sign Up</SignUp>
                            </Link>
                        </Layout.FlexHorizontalLayout>
                    </Layout.FlexVerticalLayout>
                </Layout.LeftAlignedLayout>
            </Layout.HorizontalGrid>
        </StyledBackgroundBeforeLogin>
    );
}

export default LandingPage;