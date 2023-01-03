import styled from 'styled-components';
import * as Constants from '../constants';
const GameCommunity = () => {
    const ImageWrapper = styled.button`
        display: inline-block;
        position: relative;
        border: none;
        width: 28vw;
        height: 21vw;
        border-radius: 25px;
        cursor: pointer;
    `

    const StyledImage = styled.img`
        width: 28vw;
        height: auto;
        display: block;
        border-radius: 25px;
        position: absolute;
        top: 0;
        left: 0;
    `

    const ColoredOverlay = styled.div`
        background: linear-gradient(#FFFFFF00, ${Constants.BLUE100});
        opacity: 0.9;
        position: absolute;
        top: 0;
        left: 0;
        height: 21vw;
        width: 28vw;
        border-radius: 25px;
        z-index: 2;
    `

    const BottomLeftText = styled.text`
        position: absolute;
        text-align: left;
        bottom: 1.5vw;
        left: 1.5vw;
        font-size: 2.5em;
        font-family: Metropolis-Bold;
        color: ${Constants.WHITE100};
        filter: drop-shadow(0 0 0.5rem ${Constants.BLACK35});
        z-index: 3;
    `
    return (
    // <StyledCommunityCover>
    //     <BottomLeftText>VALORANT</BottomLeftText>
    // </StyledCommunityCover>
    <ImageWrapper>
        <StyledImage src="https://drive.google.com/uc?export=view&id=1mhp3DOVIjA1RzxMDU5xzQKSU7YbnLnnY"/>
        <ColoredOverlay/>
        <BottomLeftText>Valorant</BottomLeftText>
    </ImageWrapper>
    )
}

export default GameCommunity;