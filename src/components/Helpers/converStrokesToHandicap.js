import { convertStrokesWHandicapToPoints, sumPoints, sumStrokes, convertMillisToDate } from './index';

export const convertStrokesToHandicap = (result, strokesPerHandicap, strokesPerHole) => {
  if(result){
    const resultWithHandicap = [];
    result.result.forEach((hole) => {
        if([hole.holeNumber - 1]){
          const strokesWithHandicap = hole.result - strokesPerHandicap[hole.holeNumber - 1].result;
          const pointsPerHole = convertStrokesWHandicapToPoints(strokesWithHandicap, strokesPerHole[hole.holeNumber - 1].result);
          const handicappedResult = {
            holeNumber : hole.holeNumber,
            par: strokesPerHole[hole.holeNumber - 1].result,
            strokes : hole.result,
            points : pointsPerHole,
          }
          resultWithHandicap.push(handicappedResult)
        }
      })
      const totalPoints = sumPoints(resultWithHandicap);
      const totalStrokes = sumStrokes(resultWithHandicap);
      const dateConverted = convertMillisToDate(result.timestamp);
      result.completeResult = resultWithHandicap;
      result.totalPoints = totalPoints;
      result.totalStrokes = totalStrokes;
      result.timestamp = dateConverted;
      return result;
    }
}