import styled from 'styled-components';
import * as Constants from '../constants';

const pickRandomColor = () => {
    var colorArray = [Constants.BLUE100, Constants.MAGENTA100, Constants.PURPLE100];
    var random_number = Math.random();
    var finalNumber = Math.round(random_number * 3);
    return colorArray[finalNumber];
}
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
    background: linear-gradient(#FFFFFF00, ${pickRandomColor()});
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
    padding-right: 1em;
    z-index: 3;
`

const GameCommunityContainer = ({title}: any, image_url: string) => {
    return (
    <ImageWrapper>
        <StyledImage src={image_url}/>
        <ColoredOverlay/>
        <BottomLeftText>{title}</BottomLeftText>
    </ImageWrapper>
    )
}

export default GameCommunityContainer;