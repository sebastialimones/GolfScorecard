import React from 'react';
import styled from 'styled-components';

import { GameResult } from '../GameResult';
import { convertStrokesToHandicap } from '../Helpers';

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 18px;
`;

export const ListOfResults = ({ results, playerHandicap }) => {
  const completeResult = [];
  results.length && playerHandicap.length &&
  results.map((result) => {
    const completeResultPerGame = convertStrokesToHandicap(result, playerHandicap[0]);
    completeResult.push(completeResultPerGame);
    return undefined;
  })
  if( completeResult.length){
    completeResult.sort((result1, result2) => result2.timestamp - result1.timestamp)
  }
  
  return(
    <ResultContainer>
    {
      completeResult &&
        completeResult.map((result) =>     
          <GameResult key={ result.id } result={ result }/>
        )
    }
    </ResultContainer>
  )
};
