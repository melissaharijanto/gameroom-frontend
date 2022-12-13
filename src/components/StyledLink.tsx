import styled from 'styled-components';
import * as Colors from '../constants';
export const BackToLandingPageText = styled.a`
    color: ${Colors.WHITE100};
    text-decoration-line: underline;
    font-family: Metropolis-Medium;
    font-size: 1em;
    transition: 0.5s ease;

    :hover {
        color: ${Colors.BLUE100};
    }
`

