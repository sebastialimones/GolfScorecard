import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { LiveScore } from '../LiveScore';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.7em;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    '& .MuiSelect-outlined': {
      minWidth: '170px',
    },
  },
  input: {
    '& .MuiOutlinedInput': {
      marginBottom: '10px',
    }
  },
}));

export const Hole = ({ holeNumber, handleHoleResult, selectedCourse, liveScore, currentHole, label, value }) => {  
  const classes = useStyles();

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
      value: 9,
      label: 9,
    },
    {
      value: 10,
      label: 10,
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
    };
    handleHoleResult(holeResultObj);
  };

  return(
    <Container>
      <TextField
        className={ classes.root }
        id="Hoyo nº"
        select
        label={ label ? label : `Hoyo nº: ${ holeNumber }`}
        onChange={ setHoleResult }
        SelectProps={{
          native: true,
        }}
        variant="outlined"
        disabled={ selectedCourse && selectedCourse.length ? false : true }
        value={ value ? value : undefined }
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
        currentHole && currentHole === holeNumber &&
        <LiveScore liveScore={ liveScore }></LiveScore>
      }
    </Container>
  )
}