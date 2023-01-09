import styled from 'styled-components';
import * as Constants from '../constants';
import Console from '../resources/images/logos/console-only.png';
import WhiteTextLogo from '../resources/images/logos/white-text.png';
import { LogOut } from './Button';
import { Home } from '@mui/icons-material';
import { useAuth } from '../compiler/context/Authentication';
import { useNavigate } from 'react-router-dom';

const StyledNavBar = styled.div`
    overflow: hidden;
    background: linear-gradient(to right, ${Constants.MAGENTA100}, ${Constants.BLUE100});
    width: 100%;
    vertical-align: middle;
    height: 4vw;
`

const StyledConsole = styled.img`
    float: left;
    display: block;
    margin-top: auto;
    margin-bottom: auto;
    padding: 5px 5px 5px 20px;
    width: auto;
    height: 3.5vw;
`
const StyledWhiteText = styled.img`
    float: left;
    display: block;
    margin-top: auto;
    margin-bottom: auto;
    padding: 10px 1px;
    width: auto;
    height: 3vw;
`

const StyledHomeIcon = styled.a`
    float: right;
    padding: 10px 1px;
    width: auto;
    height: 1.5vw;
    color: ${Constants.WHITE100};
    margin-top: 0.1vw;
    margin-right: 0.75vw;
    margin-left: 0.75vw;
    cursor: pointer;
    transition: all 0.3s ease-in;

    :hover {
        color: ${Constants.WHITE50};
    }
`

const StyledSearchBar = styled.input`
    display: block;
    float: right;
    height: 1.75vw;
    margin-top: 0.875vw;
    font-family: Metropolis-RegularItalic;
    font-size: 1em;
    padding-left: 10px;
    width: 20vw;
    border-radius: 5px;
    border: none;
`
const NavigationBar = () => {
    const auth = useAuth();

    const navigate = useNavigate();

    const logOut = () => {
        auth?.logout();
        navigate("/");
    }
    return (
        <StyledNavBar>
            <StyledConsole src={Console}/>
            <StyledWhiteText src={WhiteTextLogo}/>
            <LogOut onClick={logOut}>Log Out</LogOut>
            <StyledHomeIcon href="/dashboard"><Home sx={{fontSize: "2.5em"}}/></StyledHomeIcon>
            <StyledSearchBar type="text" placeholder="Search.."/>
        </StyledNavBar>
    )
}

export default NavigationBar;