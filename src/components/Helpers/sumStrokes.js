export const sumStrokes = (result) => {
  let totalStrokes = 0;
  result.map(hole => (
    typeof(hole.strokes) === 'number'
      ? totalStrokes = totalStrokes + hole.strokes
      : totalStrokes
  )
  );
  return totalStrokes
}
