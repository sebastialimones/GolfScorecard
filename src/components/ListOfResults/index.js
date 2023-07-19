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
    const gameRate = result.totalPoints / result.numberOfHoles;
    rating.push(gameRate);
    return undefined;
  });

  const averageRatingCalculator = (ratings) => {
    return ratings.reduce((a,b) => (a + b)) / rating.length; 
  };

  const realHandicapCalculator = () => {
    const resultsWithCalculatedStrokes = [];
    let averageHandicapResult = 0;

    completeResult.map((game) => {
      const handicapResult = [];
      const mosca = 2.5;
      game.completeResult.map((holeResult) => {
        if(holeResult.strokes === 'mosca'){
          handicapResult.push(mosca);
        } else( 
          handicapResult.push(holeResult.strokes - holeResult.par)
          );
        return undefined;
      })
      //calculte the total number of strokes
      let totalStrokesPerGame = 0;
      totalStrokesPerGame = handicapResult.reduce((a,b) => a + b, 0);
      
      //calculate the handicap according to the number of hole and add them to an array
      let stokesAccordingToHolesPlayed = 0;
      const totalHolesPerGame = 18;
      if(game.completeResult.length < 18){
        stokesAccordingToHolesPlayed = ( totalHolesPerGame * totalStrokesPerGame ) / game.completeResult.length; 
        resultsWithCalculatedStrokes.push(stokesAccordingToHolesPlayed);
      }else{
        resultsWithCalculatedStrokes.push(totalStrokesPerGame)
      };
      return undefined;
    });

    //calculate the handicap
    averageHandicapResult = resultsWithCalculatedStrokes.reduce((a,b) => a + b, 0) / (resultsWithCalculatedStrokes.length);
    return averageHandicapResult;
  };
  
  return(
    <Container>
        { 
        completeResult.length 
        ? <TotalGames>
          {`Partidas totales: ${ completeResult.length }`}
          <br></br>
          { rating 
          ? `Rating medio: ${ averageRatingCalculator(rating).toFixed(2) }`
          : undefined 
          }
          <br></br>
          { `Handicap real: ${ realHandicapCalculator().toFixed(2) } golpes` }
        </TotalGames>
        : undefined
        }
      <ResultContainer>
      {
        completeResult &&
          completeResult.map((result) =>     
            <GameResult key={ result.id } result={ result } refreshResults={ refreshResults } playerHandicap={ playerHandicap }/>
          )
      }
      </ResultContainer>
    </Container>
  )
};
