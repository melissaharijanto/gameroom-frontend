import styled from 'styled-components';
import * as Constants from '../constants';

export const BoldText = styled.span`
    font-family: Metropolis-Bold;
    font-size: 1.5em;
    color: ${(props) => props.color? props.color : Constants.WHITE100};
`

export const HeadingWrapper = styled.span`
    text-align: center;
    padding-bottom: 1em;
`