export const sumPointsPerHandicap = (playerHandicap) => {
  let totalPointsPerHandicap = 0;
  playerHandicap.map((hole) => {
    return totalPointsPerHandicap = totalPointsPerHandicap + hole.result
  })
  return totalPointsPerHandicap;
}
  