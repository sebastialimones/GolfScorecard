import { convertStrokesWHandicapToPoints, sumPoints, sumStrokes, convertMillisToDate, sumMosques } from './index';

export const convertStrokesToHandicap = (result, strokesPerHandicap, strokesPerHole) => {
  if(result){
    const resultWithHandicap = [];
    result.result.map((hole) => {
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
        return undefined;
      })
      const totalPoints = sumPoints(resultWithHandicap);
      const totalStrokes = sumStrokes(resultWithHandicap);
      const totalMosques = sumMosques(resultWithHandicap);
      const dateConverted = convertMillisToDate(result.timestamp);
      result.completeResult = resultWithHandicap;
      result.totalPoints = totalPoints;
      result.totalStrokes = totalStrokes;
      result.totalMosques = totalMosques;
      result.timestamp = dateConverted;
      return result;
    }
}