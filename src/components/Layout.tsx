import styled from 'styled-components';

const DefaultLayout = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
`

const LeftAlignedLayout = styled.div`
    display: grid;
    justify-items: start;
    align-items: center;
`

const RightAlignedLayout = styled.div`
    display: grid;
    justify-items: end;
    align-items: center;
`

const HorizontalGrid = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
column-gap: 3em;
`

const FlexVerticalLayout = styled.div`
    display: flex;
    flex-direction: column;
`

const FlexHorizontalLayout = styled.div`
    display: flex;
    flex-direction: row;
`

const LeftAlignedFlex = styled.div<{direction: string}>`
    display: flex;
    justify-items: center;
    align-items: flex-start;
    flex-direction: ${(props) => props.direction? props.direction : "row"}
`

const RightAlignedFlex = styled.div`
    display: flex;
    justify-items: flex-end;
    align-items: center;
`

const CenterAlignedFlex = styled.div<{direction: string}>`
    display: flex;
    justify-items: center;
    align-items: center;
    flex-direction: ${(props) => props.direction? props.direction : "row"};
`

export {
    DefaultLayout, 
    LeftAlignedLayout, 
    RightAlignedLayout, 
    HorizontalGrid, 
    FlexVerticalLayout, 
    FlexHorizontalLayout,
    LeftAlignedFlex,
    RightAlignedFlex,
    CenterAlignedFlex
};