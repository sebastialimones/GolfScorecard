import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const ResultContainer = styled.div`
  margin-bottom: 1em;
  margin-top: 1em;
`;
const Date = styled.div`
  font-weight: bold; 
  margin: 2px;
`;

const DataItem = styled.div`
  padding: 1px;
`;


export const GameResult = ({ result }) => {
  return(
    <ResultContainer>
      <Date>
      {
        moment(result.timestamp).format("D MMM YYYY")
      }
      </Date>
      <DataItem>
      {
        `Hoyos:  ${result.result.length} `
      }
      </DataItem>
      <DataItem>
      {
        `Puntos totales:  ${result.totalPoints} `
      }
      </DataItem>
      <DataItem>
      {
        `Golpes totales:  ${result.totalStrokes} con ${result.totalMosques} 🦟`
      }
      </DataItem>
      <DataItem>
      {
        `Handicap:  ${result.totalPointsPerHandicap} golpes`
      }
      </DataItem>
    </ResultContainer>
  )
}