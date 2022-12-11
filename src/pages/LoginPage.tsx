import Logo from '../resources/images/logos/complete-logo.png';
import styled from 'styled-components';
import * as Colors from '../constants';
import { StyledBackgroundBeforeLogin } from '../components/Background';

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
    font-family: Metropolis-SemiBold;
    font-size: 1.5em;
    color: ${(props) => props.color? props.color : Colors.WHITE100}
`
const LoginPage = () => {
    return (
        <StyledBackgroundBeforeLogin>
            <StyledLogo src={Logo}/>
            <StyledHorizontalLine/>
            <text>
                <StyledText>Log in to</StyledText> &nbsp;
                <StyledText color={Colors.YELLOW100}>continue.</StyledText>
            </text>
        </StyledBackgroundBeforeLogin>
    )
}

export default LoginPage;