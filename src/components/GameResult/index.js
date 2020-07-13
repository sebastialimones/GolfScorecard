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

const RedDataItem = styled.div`
  padding: 1px;
  color: red;
`;

const GreenDataItem = styled.div`
  padding: 1px;
  color: green;
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
      { ((result.result.length * 2) - result.totalPoints) !== 0
          ? ((result.result.length * 2) - result.totalPoints) > 0
          ? <RedDataItem>
          {
            `Resultado: +${result.result.length * 2 - result.totalPoints} `
          }
          </RedDataItem>
          : <GreenDataItem>
          {
            `Resultado: ${result.result.length * 2 - result.totalPoints} `
          }
          </GreenDataItem>
        :
        <DataItem>
        {
          `Resultado: ${result.result.length * 2 - result.totalPoints} `
        }
        </DataItem>
      }
    </ResultContainer>
  )
}