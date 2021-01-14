import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiSelect-selectMenu': {
      minWidth: '145px',
    },
  },
}));

const SelectYearContainer = styled.div``;

export const Years = ({ handleYearChange, value, years }) => {
  const classes = useStyles();
  const selectedYear = (event) => {
    handleYearChange(event.target.value);
  };

  return(
    <SelectYearContainer>
      <TextField
        className={ classes.root }
        id="Año"
        select
        // label={ `Año`}
        onChange={ selectedYear }
        SelectProps={{
          native: true,
        }}
        variant="outlined"
        value={ value }
        disabled={ years.length ? false : true }
        >
        { 
          years.map((option) => (
          <option key={ option.value } value={ option.value }>
            { option.value }
          </option>
        )) 
        }
      </TextField>
    </SelectYearContainer>
  );
};