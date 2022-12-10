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

export {
    DefaultLayout, 
    LeftAlignedLayout, 
    RightAlignedLayout, 
    HorizontalGrid, 
    FlexVerticalLayout, 
    FlexHorizontalLayout
};