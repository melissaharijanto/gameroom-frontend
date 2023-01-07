import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { GameCommunity } from '../compiler/interface/GameCommunity';
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
    width: 30vw;
    height: 22.5vw;
    border-radius: 25px;
    cursor: pointer;
`

const StyledImage = styled.img`        
    width: 30vw;
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
    height: 22.5vw;
    width: 30vw;
    border-radius: 25px;
    z-index: 2;
    transition: background 2s ease-in;
    :hover {
        background: linear-gradient(#FFFFFF00, ${Constants.BLACK100})
    }
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

const GameCommunityContainer = ({ game } : { game: GameCommunity }) => {
    const navigate = useNavigate();
    const navigateToCommunityPage = () => {
        navigate(`/community/${game.id}`)
    }

    return (
    <ImageWrapper onClick = {() => navigateToCommunityPage()}>
        <StyledImage src={game.image_url}/>
        <ColoredOverlay/>
        <BottomLeftText>{game.title}</BottomLeftText>
    </ImageWrapper>
    )
}

export default GameCommunityContainer;