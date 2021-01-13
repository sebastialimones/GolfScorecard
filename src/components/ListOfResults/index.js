import React from 'react';
import styled from 'styled-components';

import { GameResult } from '../GameResult';
import { convertStrokesToHandicap } from '../Helpers';

const Container = styled.div``;

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TotalGames = styled.div``;

export const ListOfResults = ({ results, playerHandicap, refreshResults }) => {
  const completeResult = [];
  results.length && playerHandicap.length &&
  results.map((result) => {
    const completeResultPerGame = convertStrokesToHandicap(result, playerHandicap[0]);
    completeResult.push(completeResultPerGame);
    return undefined;
  });
  if(completeResult.length){
    completeResult.sort((result1, result2) => result2.timestamp - result1.timestamp)
  };
  const rating = [];
  completeResult.map((result) => {
    const gameRate = (result.totalPoints / result.numberOfHoles);
    rating.push(gameRate);
    return undefined;
  });

  const averageRatingCalculator = (ratings) => {
    return ratings.reduce((a,b) => (a + b)) / rating.length; 
  };
  
  return(
    <Container>
      <ResultContainer>
      {
        completeResult &&
          completeResult.map((result) =>     
            <GameResult key={ result.id } result={ result } refreshResults={ refreshResults }/>
          )
      }
      </ResultContainer>
      { completeResult.length ?
      <TotalGames>
        ---------------- <br></br><br></br>
        {`Partidas totales: ${ completeResult.length }`}
        <br></br>
        { rating 
        ? `Rating medio: ${ averageRatingCalculator(rating).toFixed(2) }`
        : undefined 
        }
      </TotalGames>
      : undefined
      }
    </Container>
  )
};
