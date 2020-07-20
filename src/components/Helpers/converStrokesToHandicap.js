import { convertStrokesWHandicapToPoints, sumPointsPerGame, sumPointsPerHandicap, sumStrokes, convertMillisToDate, sumMosques } from './index';

export const convertStrokesToHandicap = (result, playerHandicap) => {
  if(result){
    const resultWithHandicap = [];
    let numberOfHoles = 0;
    result.result.map((hole) => {
      if(hole.result !== 0){
        const strokesWithHandicap = hole.result - result.playerHandicap[hole.holeNumber - 1].result;
        const pointsPerHole = convertStrokesWHandicapToPoints(strokesWithHandicap, playerHandicap.holeHandicap[hole.holeNumber - 1].result);
        const handicappedResult = {
          holeNumber : hole.holeNumber,
          par: playerHandicap.holeHandicap[hole.holeNumber - 1].result,
          strokes : hole.result,
          points : pointsPerHole,
        }
        resultWithHandicap.push(handicappedResult)
      };
      if(hole.result !== 0){
        numberOfHoles = numberOfHoles + 1;
      }
      return undefined;
    });
      
    const totalPointsPerGame = sumPointsPerGame(resultWithHandicap);
    const totalStrokes = sumStrokes(resultWithHandicap);
    const totalMosques = sumMosques(resultWithHandicap);
    const totalPointsPerHandicap = sumPointsPerHandicap(result.playerHandicap);
    const dateConverted = convertMillisToDate(result.timestamp);
    result.numberOfHoles = numberOfHoles;
    result.completeResult = resultWithHandicap;
    result.totalPoints = totalPointsPerGame;
    result.totalPointsPerHandicap = totalPointsPerHandicap;
    result.totalStrokes = totalStrokes;
    result.totalMosques = totalMosques;
    result.timestamp = dateConverted;
    return result;
    }
}