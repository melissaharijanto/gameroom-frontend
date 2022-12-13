import styled from 'styled-components';
import * as Constants from '../constants';
export const BackToLandingPageText = styled.a`
    color: ${Constants.WHITE100};
    text-decoration-line: underline;
    font-family: Metropolis-Medium;
    font-size: 1em;
    transition: 0.5s ease;

    :hover {
        color: ${Constants.BLUE100};
    }
`

