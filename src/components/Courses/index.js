import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiSelect-selectMenu': {
      minWidth: '145px',
    },
  },
}));

const SelectCourseContainer = styled.div``;

export const Courses = ({ handleCourseChange, value, courses }) => {
  const classes = useStyles();
  const selectCourse = (event) => {
    handleCourseChange(event.target.value)
  };

  return(
    <SelectCourseContainer>
      <TextField
        disabled={ courses && courses.length ? false : true }
        className={classes.root}
        id="select-course"
        select
        label="Campos"
        value={ value }
        onChange={ selectCourse }
        variant="filled"
        SelectProps={{
            multiple: false,
            value: value
          }}
        >
        { courses && courses.map((option) => (
          <MenuItem key={ option.value } value={ option.value }>
          { option.label }
          </MenuItem>
        )) }
      </TextField>
    </SelectCourseContainer>
  )
};