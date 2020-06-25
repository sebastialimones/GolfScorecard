import React from 'react';
import TextField from '@material-ui/core/TextField';
import { LiveScore } from '../LiveScore';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const Hole = ({ holeNumber, handleHoleResult, player, liveScore, currentHole }) => {  
  const PossibleScore = [
    {
      value: 0,
      label: 0,
    },
    {
      value: 1,
      label: 1,
    },
    {
      value: 2,
      label: 2,
    },
    {
      value: 3,
      label: 3,
    },
    {
      value: 4,
      label: 4,
    },
    {
      value: 5,
      label: 5,
    },
    {
      value: 6,
      label: 6,
    },
    {
      value: 7,
      label: 7,
    },
    {
      value: 8,
      label: 8,
    },
    {
      value: "mosca",
      label: "🦟",
    },
  ];

  const setHoleResult = (event) => {
    const holeResultObj = { 
      "holeNumber": holeNumber,
      "result" : event.currentTarget.value === "mosca" ? "mosca" : Number(event.currentTarget.value)
    }
    handleHoleResult(holeResultObj)
  }

  return(
    <Container>
      <TextField
        id="hole-number"
        select
        label={`Hole number: ${holeNumber}`}
        onChange={ setHoleResult }
        SelectProps={{
          native: true,
        }}
        variant="outlined"
        disabled={ player ? false : true }
      >
        { 
          PossibleScore.map((option) => (
          <option key={ option.value } value={ option.value }>
            { option.label }
          </option>
        )) 
        }
      </TextField>
      {
        currentHole === holeNumber &&
        <LiveScore liveScore={ liveScore }></LiveScore>
      }
    </Container>
  )
}