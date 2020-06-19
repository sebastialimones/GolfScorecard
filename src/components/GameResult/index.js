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
        `Forats:  ${result.result.length} `
      }
      </DataItem>
      <DataItem>
      {
        `Punts totals:  ${result.totalPoints} `
      }
      </DataItem>
      <DataItem>
      {
        `Cops totals:  ${result.totalStrokes} amb ${result.totalMosques} 🦟`
      }
      </DataItem>
      <DataItem>
      {
        `Handicap:  ${result.totalPointsPerHandicap}  cops`
      }
      </DataItem>
    </ResultContainer>
  )
}