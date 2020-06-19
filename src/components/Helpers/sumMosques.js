export const sumMosques = (result) => {
    let totalMosques = 0;
    result.map(hole => (
      typeof(hole.strokes) === 'string'
        ? totalMosques = totalMosques + 1
        : totalMosques
    )
    );
    return totalMosques
  }
  