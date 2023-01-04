import Background from '../resources/images/backgrounds/background.png';
import styled from 'styled-components';
import * as Constants from '../constants';
import { DefaultLayout } from './Layout';

const StyledBackgroundBeforeLogin = styled(DefaultLayout)`
    background: url(${Background}) ${Constants.BLACK90};
    background-blend-mode: multiply;
    background-size: cover;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`
const BlackBackground = styled.div`
    background-color: ${Constants.BLACK100};
    width: 100vw;
    padding-bottom: 5vh;
`
export { StyledBackgroundBeforeLogin, BlackBackground };
