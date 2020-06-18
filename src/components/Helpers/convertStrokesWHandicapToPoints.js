export const convertStrokesWHandicapToPoints = (strokesMinusHandicap, parPerHole) => {
  if(typeof(strokesMinusHandicap) === String){
    const points = 0;
    return points;
  }else if(strokesMinusHandicap - 1 === parPerHole){
    const points = 1;
    return points;
  }else if(strokesMinusHandicap === parPerHole){
    const points = 2;
    return points;
  } else if(strokesMinusHandicap + 1 === parPerHole){
    const points = 3;
    return points;
  } else if(strokesMinusHandicap + 2 === parPerHole){
    const points = 4;
    return points;
  } else if(strokesMinusHandicap + 3 === parPerHole){
    const points = 5;
    return points;
  } else {
    return 0;
  }
}