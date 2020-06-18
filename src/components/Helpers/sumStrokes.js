export const sumStrokes = (result) => {
  let totalStrokes = 0;
  if(result){
    result.forEach((hole) => {
      totalStrokes = totalStrokes + hole.strokes
    })
    return totalStrokes;
  }
}
