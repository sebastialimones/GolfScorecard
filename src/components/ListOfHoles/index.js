import React from 'react';

import { Hole } from '../Hole';

export const ListOfHoles = ({ handleHoleResult, selectedCourse, liveScore, currentHole, value, handleHandicapResult, newGame }) => {
  const numberOfHoles = 18;
  var totalHoles = [];

  for (var j = 0; j < numberOfHoles; j++) {
    totalHoles.push(j);
  }

  return(
    totalHoles.map((index) =>   
      <Hole 
        key={ index } 
        holeNumber={ index + 1} 
        handleHoleResult={ handleHoleResult } 
        handleHandicapResult={ handleHandicapResult }
        selectedCourse={ selectedCourse } 
        liveScore={ liveScore }
        currentHole={ currentHole }
        value={ value }
        newGame={ newGame }
      />
    )
  );
};
