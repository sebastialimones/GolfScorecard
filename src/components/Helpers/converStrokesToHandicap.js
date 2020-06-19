import { convertStrokesWHandicapToPoints, sumPointsPerGame, sumPointsPerHandicap, sumStrokes, convertMillisToDate, sumMosques } from './index';

export const convertStrokesToHandicap = (result, playerHandicap) => {
  if(result){
    const resultWithHandicap = [];
    result.result.map((hole) => {
        if([hole.holeNumber - 1]){
          const strokesWithHandicap = hole.result - playerHandicap.result[hole.holeNumber - 1].result;
          const pointsPerHole = convertStrokesWHandicapToPoints(strokesWithHandicap, playerHandicap.holeHandicap[hole.holeNumber - 1].result);
          const handicappedResult = {
            holeNumber : hole.holeNumber,
            par: playerHandicap.holeHandicap[hole.holeNumber - 1].result,
            strokes : hole.result,
            points : pointsPerHole,
          }
          resultWithHandicap.push(handicappedResult)
        }
        return undefined;
      })
      const totalPointsPerGame = sumPointsPerGame(resultWithHandicap);
      const totalStrokes = sumStrokes(resultWithHandicap);
      const totalMosques = sumMosques(resultWithHandicap);
      const totalPointsPerHandicap = sumPointsPerHandicap(playerHandicap);
      const dateConverted = convertMillisToDate(result.timestamp);
      result.completeResult = resultWithHandicap;
      result.totalPoints = totalPointsPerGame;
      result.totalPointsPerHandicap = totalPointsPerHandicap;
      result.totalStrokes = totalStrokes;
      result.totalMosques = totalMosques;
      result.timestamp = dateConverted;
      return result;
    }
}