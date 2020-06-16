import React from 'react';
import TextField from '@material-ui/core/TextField';

export const Hole = ({ holeNumber, handleHoleResult }) => {

  const PossibleScore = [
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
  ];

  const setHoleResult = (event) => {
    const holeResultObj = { 
      "holeNumber": holeNumber,
      "result" : Number(event.currentTarget.value)
    }
    handleHoleResult(holeResultObj)
  }

  return(
    <TextField
      id="hole-number"
      select
      label={`Hole number: ${holeNumber}`}
      onChange= { setHoleResult }
      SelectProps={{
        native: true,
      }}
      variant="outlined"
    >
      { PossibleScore.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      )) }
    </TextField>
  )
}