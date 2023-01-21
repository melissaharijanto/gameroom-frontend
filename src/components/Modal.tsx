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
    background-color: ${Constants.BLUE100};
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

const WarningMessage = styled.span`
    color: ${props => props.color? props.color : Constants.BLACK100};
    font-family: Metropolis-SemiBold;
    font-size: 1em;
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

const DeleteButton = styled.button`
    background-color: ${Constants.YELLOW100};
    border: none;
    border-radius: 50px;
    cursor: pointer;
    font-family: Metropolis-SemiBold;
    font-size: 1em;
    margin-left: 1vw;
    padding: 1em;
    width: 60%;

    :hover {
        background-color: ${Constants.YELLOW_ACCENT};
    }
`

export interface ModalType {
    delete: () => void;
    cancel: () => void;
}

/**
 * Displays a modal when the user tries to delete a post or comment.
 * 
 * @param functions functions to cancel delete or to delete.
 * @returns A modal.
 */
const Modal = ({functions} : {functions: ModalType}) => {
    return (
        <FixedBlackBackground>
            <FixedDiv>
                <Div margin_top='0em'>
                    <TextPrompt>Are you sure you want to delete this?</TextPrompt>
                </Div>
                <Div>
                    <WarningMessage>&#10043; This action cannot be undone.</WarningMessage>
                </Div>
                <Div>
                    <CancelButton onClick={functions.cancel}>Cancel</CancelButton>
                </Div>
                <Div>
                    <DeleteButton onClick={functions.delete}>Yes, I want to delete this.</DeleteButton>
                </Div>
            </FixedDiv>
        </FixedBlackBackground>
    )
}   

export default Modal;