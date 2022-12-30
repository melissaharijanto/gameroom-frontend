import styled from 'styled-components';
import * as Constants from '../constants';
import Console from '../resources/images/logos/console-only.png';
import WhiteTextLogo from '../resources/images/logos/white-text.png';
import { SignUp } from './Button';

const StyledNavBar = styled.div`
    overflow: hidden;
    background: linear-gradient(to right, ${Constants.MAGENTA100}, ${Constants.BLUE100});
    width: 100%;
`

const StyledConsole = styled.img`
    float: left;
    display: block;
    margin-top: auto;
    margin-bottom: auto;
    padding: 5px 5px 5px 20px;
    width: auto;
    height: 3vw;
`
const StyledWhiteText = styled.img`
    float: left;
    display: block;
    margin-top: auto;
    margin-bottom: auto;
    padding: 10px 1px;
    width: auto;
    height: 2.5vw;
`

const StyledHomeIcon = styled.a`
    float: right;
    margin-top: auto;
    margin-bottom: auto;
    padding: 10px 1px;
    width: auto;
    height: 1.5vw;
`

const StyledSearchBar = styled.input`
    display: block;
    float: right;
    margin-top: auto;
    margin-bottom: auto;
`

const NavigationBar = () => {
    return (
        <StyledNavBar>
            <StyledConsole src={Console}/>
            <StyledWhiteText src={WhiteTextLogo}/>
            <StyledSearchBar type="text" placeholder="Search.."/>
            <StyledHomeIcon>test</StyledHomeIcon>
            <SignUp>Log Out</SignUp>
        </StyledNavBar>
    )
}

export default NavigationBar;