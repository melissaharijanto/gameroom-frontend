import styled from 'styled-components';
import * as Constants from '../constants';
import Logo from '../resources/images/logos/console-only.png';

const FixedBlackBackground = styled.div`
    background-color: ${Constants.BLACK90};
    bottom: 0px;
    left: 0px;
    width: 100vw;
    height: 100%;
    position: fixed;
    top: 0px;
    right: 0px;
    z-index: 99;
`
const FixedDiv = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 15vw;
    justify-content: center;
    left: 50%;
    padding: 2em;
    position: fixed;
    width: 15vw;
    text-align: center;
    top: 50%;
    transform: translate(-50%, -50%);
`

const StyledLogo = styled.img`
    @keyframes spin { 
        0% {
            transform: rotate(0);
        }
        40% { 
            transform: rotate(360deg); 
        }
        100% {
            transform: rotate(360deg); 
        }
    }  
    animation: spin 1.5s linear infinite;
    animation-delay: 1s;
    height: auto;
    width: 10vw;
    transition: transform 0.9s ease 0.3s;
`

const LoadingText = styled.span`
    background-color: ${Constants.YELLOW100};
    border-radius: 50px;
    color: ${Constants.BLACK100};
    margin-top: 0.5em;
    font-family: Metropolis-Bold;
    font-size: 1.5em;
    padding-bottom: 0.5em;
    padding-left: 1.25em;
    padding-right: 1.25em;
    padding-top: 0.5em;
`

/**
 * Displays when a user is waiting for log in/sign up processes.
 * @returns A loading modal.
 */
const LoadingModal = () => {

    return (
        <FixedBlackBackground>
            <FixedDiv>
                <StyledLogo src={Logo}/>
                <LoadingText id="loading">Loading</LoadingText>
            </FixedDiv>
        </FixedBlackBackground>
    )
}

export default LoadingModal;