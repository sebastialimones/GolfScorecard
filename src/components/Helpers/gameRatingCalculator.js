import { convertStrokesToHandicap } from './converStrokesToHandicap';

export const gameRatingCalculator = (gameResult, playerHandicap) => {
  const completeResult = convertStrokesToHandicap(gameResult, playerHandicap[0]);
  const gameRate = completeResult.totalPoints / completeResult.numberOfHoles;
  return gameRate;
};
