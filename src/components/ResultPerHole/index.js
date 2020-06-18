import React from 'react';
import styled from 'styled-components';

const ResultContainer = styled.div``;
const ListContainer = styled.ul``;
const List = styled.li``;


export const ResultPerHole = ({ result }) => {
  return(
    <ResultContainer>
      <ListContainer>
        <List>
          {`Forat: ${result.holeNumber}`}
        </List>
        <List>
          {`Par: ${result.par}`}
        </List>
        <List>
          {`Cops: ${result.strokes}`}
        </List>
        <List>
          {`Punts: ${result.points}`}
        </List>
      </ListContainer>
    </ResultContainer>
  )
}