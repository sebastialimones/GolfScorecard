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
          {`Hoyo: ${result.holeNumber}`}
        </List>
        <List>
          {`Par: ${result.par}`}
        </List>
        <List>
          {`Golpes: ${result.strokes}`}
        </List>
        <List>
          {`Puntos: ${result.points}`}
        </List>
      </ListContainer>
    </ResultContainer>
  )
}