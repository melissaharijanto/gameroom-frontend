import styled from 'styled-components';
import * as Constants from '../constants';

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
    background-color: ${Constants.YELLOW100};
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    left: 50%;
    padding: 2em;
    position: fixed;
    width: 25vw;
    text-align: center;
    top: 50%;
    transform: translate(-50%, -50%);
`

const TextPrompt = styled.span`
    font-family: Metropolis-Bold;
    font-size: 1.5em;
    line-height: 1.25;
`

const Div = styled.div<{margin_top? : string}>`
    margin-top: ${props => props.margin_top? props.margin_top : '0.5em'};
    margin-bottom: 0.5em;
`

const CancelButton = styled.button`
    background-color: ${Constants.WHITE100};
    border: none;
    border-radius: 50px;
    cursor: pointer;
    font-family: Metropolis-SemiBold;
    font-size: 1em;
    margin-left: 1vw;
    padding: 1em;
    width: 60%;

    :hover {
        background-color: ${Constants.WHITE_ACCENT};
    }
`

const LogOutButton = styled.button`
    background-color: ${Constants.BLUE100};
    border: none;
    border-radius: 50px;
    color: ${Constants.WHITE100};
    cursor: pointer;
    font-family: Metropolis-SemiBold;
    font-size: 1em;
    margin-left: 1vw;
    padding: 1em;
    width: 60%;

    :hover {
        background-color: ${Constants.BLUE_ACCENT};
    }
`

export interface LogOutModalType {
    cancel: () => void;
    logout: () => void;
}

/**
 * Displays a modal when the user clicks on the log out button on the navigation bar.
 * 
 * @param functions functions to cancel log out or to proceed with log out.
 * @returns A log out modal.
 */
const LogOutModal = ({functions} : {functions: LogOutModalType}) => {
    return (
        <FixedBlackBackground>
            <FixedDiv>
                <Div margin_top='0em'>
                    <TextPrompt>Are you sure you want to log out?</TextPrompt>
                </Div>
                <Div>
                    <CancelButton onClick={functions.cancel}>Cancel</CancelButton>
                </Div>
                <Div>
                    <LogOutButton onClick={functions.logout}>Yes, I want to log out.</LogOutButton>
                </Div>
            </FixedDiv>
        </FixedBlackBackground>
    )
}

export default LogOutModal;