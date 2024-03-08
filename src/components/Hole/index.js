import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { LiveScore } from '../LiveScore';
import styled from 'styled-components';
import { RadioButtonsGroup } from '../Elements/radioGroups';

const Container = styled.div`
  display: flex;
  margin-top: 0.7em;
  align-items: center;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      // maxWidth: '15ch',
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

export const Hole = ({ holeNumber, newGame, handleHoleResult, handleHandicapResult, selectedCourse, liveScore, currentHole, label, value, newCourse }) => {  
  const classes = useStyles();

  const possibleScore = [
    { value: 0, label: 0 },
    { value: 1,label: 1 },
    { value: 2, label: 2},
    { value: 3, label: 3},
    { value: 4, label: 4},
    { value: 5, label: 5},
    { value: 6, label: 6},
    { value: 7, label: 7},
    { value: 8, label: 8},
    { value: 9, label: 9},
    { value: 10, label: 10},
    { value: "mosca", label: "🦟",},
  ];

  const possibleHandicap = [
    { value: 0, label: 0 },
    { value: 1,label: 1 },
    { value: 2, label: 2},
    { value: 3, label: 3},
    { value: 4, label: 4},
    { value: 5, label: 5},
    { value: 6, label: 6},
    { value: 7, label: 7},
    { value: 8, label: 8},
    { value: 9, label: 9},
    { value: 10, label: 10},
    { value: 11, label: 11},
    { value: 12, label: 12},
    { value: 13, label: 13},
    { value: 14, label: 14},
    { value: 15, label: 15},
    { value: 16, label: 16},
    { value: 17, label: 17},
    { value: 18, label: 18},
  ];

  const setHoleResult = (strokes) => {
    const holeResultObj = { 
      "holeNumber": holeNumber,
      "result" : strokes.currentTarget.value === "mosca" ? "mosca" : Number(strokes.currentTarget.value)
    };
    handleHoleResult(holeResultObj);
  };

  const strokesPerHole = (strokes) => {
    const holeHandicapObj = { 
      "holeNumber": holeNumber,
      "result" : Number(strokes)
    };
    handleHandicapResult(holeHandicapObj);
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
        { !newCourse ?
          possibleScore.map((option) => (
          <option key={ option.value } value={ option.value }>
            { option.label }
          </option>
          )) 
          : possibleHandicap.map((option) => (
            <option key={ option.value } value={ option.value }>
              { option.label }
            </option>
            )) 
        }
      </TextField>
      { newGame ?
          <RadioButtonsGroup
            strokesPerHole={ strokesPerHole }
            disabled={ selectedCourse && selectedCourse.length ? false : true }
          />
        : undefined
      }
      {
        currentHole && currentHole === holeNumber &&
        <LiveScore liveScore={ liveScore }></LiveScore>
      }
    </Container>
  )
}