export const sumPoints = (result) => {
  let totalPoints = 0;
  result.map((hole) => {
    return totalPoints = totalPoints + hole.points
  })
  return totalPoints;
}
