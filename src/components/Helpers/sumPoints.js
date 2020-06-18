export const sumPoints = (result) => {
  let totalPoints = 0;
  if(result){
    result.forEach((hole) => {
      totalPoints = totalPoints + hole.points
    })
    return totalPoints;
  }
}
