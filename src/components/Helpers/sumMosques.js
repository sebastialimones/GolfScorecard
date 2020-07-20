export const sumMosques = (result) => {
    let totalMosques = 0;
    result.map(hole => (
      typeof(hole.strokes) === 'string' || hole.points === 0
        ? totalMosques = totalMosques + 1
        : totalMosques
    )
    );
    return totalMosques
  }
  