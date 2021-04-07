import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiSelect-selectMenu': {
      minWidth: '145px',
    },
  },
}));

const SelectCourseContainer = styled.div``;

export const RankingMenu = ({ handleRankingChange, value, rankings }) => {
  const classes = useStyles();
  const selectRanking = (event) => {
    handleRankingChange(event.target.value)
  };

  return(
    <SelectCourseContainer>
      <TextField
        disabled={ rankings && rankings.length ? false : true }
        className={classes.root}
        id="select-ranking"
        select
        label="Rankings"
        value={ value }
        onChange={ selectRanking }
        variant="filled"
        SelectProps={{
            multiple: false,
            value: value
          }}
        >
        { rankings && rankings.map((option) => (
          <MenuItem key={ option } value={ option }>
          { option }
          </MenuItem>
        )) }
      </TextField>
    </SelectCourseContainer>
  )
};