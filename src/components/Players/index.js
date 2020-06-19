import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

const PossiblePlayers = [
  {
    value: 'Sebastià',
    label: 'Sebastià'
  },
  {
    value: 'Añaterve',
    label: 'Añaterve'
  },
  {
    value: 'Sebastià (pare)',
    label: 'Sebastià (pare)'
  }
]

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiSelect-selectMenu': {
      minWidth: '75px',
    },
  },
}));

const SelectPlayerContainer = styled.div``;

export const Players = ({ handlePlayerChange, value }) => {
  const classes = useStyles();
  const selectPlayer = (event) => {
    handlePlayerChange(event.target.value)
  }

  return(
    <SelectPlayerContainer>
      <TextField
        className={classes.root}
        id="select-player"
        select
        label="Players"
        value={ value }
        onChange={ selectPlayer }
        // helperText="Select your player"
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
