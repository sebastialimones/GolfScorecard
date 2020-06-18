import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const PossiblePlayers = [
  {
    value: 'Sebastià',
    label: 'Sebastià'
  },
  {
    value: 'Añaterve',
    label: 'Añaterve'
  }
]

const SelectPlayerContainer = styled.div``;

export const Players = ({ handlePlayerChange, value }) => {
  const selectPlayer = (event) => {
    handlePlayerChange(event.target.value)
  }

  return(
    <SelectPlayerContainer>
      <TextField
      id="select-player"
      select
      label="Players"
      value={ value }
      onChange={ selectPlayer }
      helperText="Select your player"
      variant="filled"
      >
      { PossiblePlayers.map((option) => (
          <MenuItem key={option.value} value={option.value}>
          {option.label}
          </MenuItem>
      )) }
      </TextField>
    </SelectPlayerContainer>
  )
};
