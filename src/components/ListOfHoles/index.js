import React from 'react';
import { Hole } from '../Hole';

export const ListOfHoles = ({ handleHoleResult }) => {
  const numberOfHoles = 18;


  var totalHoles = [];
  for (var j = 0; j < numberOfHoles; j++) {
    totalHoles.push(j);
  }

  return(
    totalHoles.map((index) =>     
      <Hole key={ index } holeNumber={ index + 1} handleHoleResult={ handleHoleResult } />
    )
  )
}