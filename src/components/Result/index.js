import React, { useEffect } from 'react';
import styled from 'styled-components';
import { HandicapCalculator } from '../HandicapCalculator';

export const Result = ({ playerDetails, gamesResults }) => {
  // const HolesFormContainer = styled.div``;

  useEffect(() => {
    const handicap = () => {
      console.log('hola', playerDetails)
      console.log(gamesResults)
    }
    handicap();
  }, []);
  

  return(
    <text>Hola</text>
  )
}