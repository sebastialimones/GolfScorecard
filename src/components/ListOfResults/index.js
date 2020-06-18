import React from 'react';
import styled from 'styled-components';

import { GameResult } from '../GameResult';
import { convertStrokesToHandicap } from '../Helpers';

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ListOfResults = ({ results, playerHandicap }) => {
  const completeResult = [];

  results.forEach((result) => {
    const completeResultPerGame = convertStrokesToHandicap(result, playerHandicap[0].result, playerHandicap[0].holeHandicap);
    completeResult.push(completeResultPerGame);
  })
  
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
