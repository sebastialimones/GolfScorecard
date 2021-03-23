import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '../Elements/button';
import { ListOfHoles } from '../ListOfHoles';
import { createNewCourse } from '../../services';
import { Notification } from '../Notification';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const Container = styled.div`
  margin-left: 1em;
`;
const Form = styled.form``;
const HolesFormContainer = styled.div`
  display: flex;
`;
const HoleFormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const HoleTitle = styled.div``;
const HandicapTitle = styled.div``;


export const CourseGenerator = () => {
  const classes = useStyles();
  const [courseName, setCourseName] = useState('');
  const [coursePuntuation, setCoursePuntuation] = useState([]);
  const [errorCode, setErrorCode] = useState();
  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    initialStateCourseHoles()
  }, []);

  const initialStateCourseHoles = () => {
    const initialState = [];
    for (var j = 1; j < 19; j++) {
      initialState.push({ holeNumber: j, strokes: 0, handicap:0 });
    }
    setCoursePuntuation(initialState)
  };

  const handleCourseChange = (event) => {
    setCourseName(event.currentTarget.value);
  };

  const clearInputs = () => {
    setCoursePuntuation([]);
    setCourseName('');
  };

  const send = async (event) => {
    event.preventDefault();
    if(courseName && coursePuntuation.length === 18){
      try {
        await createNewCourse({
          name: courseName,
          coursePuntuation,
        })
        setOpenAlert(true);
      }
      catch (error){
        errorCode.message = error.message ? error.message: errorCode.message;
        setOpenAlert(true);
        setErrorCode(errorCode);
      }
    }else {
      dataIncomplete();
    }
  };

  const dataIncomplete = () => { 
    if(!courseName){
      const errorCode = { 
        message:  "Falta introduir un camp",
        severity: "error" 
      }        
      setOpenAlert(true);
      setErrorCode(errorCode); 
    }else if(coursePuntuation.length < 18){
      const errorCode = { 
        message:  "Falta introduir els cops d'algun forat",
        severity: "error" 
       }
      setOpenAlert(true);
      setErrorCode(errorCode);
    }
  };

  const handleHoleStrokes = (holeResult) => { 
    const newArray = coursePuntuation.slice();
    newArray[holeResult.holeNumber-1].strokes = holeResult.result
  };

  const handleHoleHandicap = (holeResult) => { 
    const newArray = coursePuntuation.slice();
    newArray[holeResult.holeNumber-1].handicap = holeResult.result
  };

  const handleCloseAlertSucces = () => {
    setErrorCode();
    setOpenAlert(false);
    clearInputs();
  };

  const handleCloseAlertError = () => {
    setErrorCode();
    setOpenAlert(false);
  };

  return (
    <Container>
      <Form className={classes.root} noValidate autoComplete="off"> 
        <TextField
          id="campo"
          label="Nombre del campo"
          onChange={ handleCourseChange }
          value={ courseName }
          className={classes.root}
        /> 
        <HolesFormContainer>
          <HoleFormContainer>
            <HoleTitle>Strokes</HoleTitle>
            <ListOfHoles 
              handleHoleResult={ handleHoleStrokes } 
              selectedCourse={ courseName } 
            />
          </HoleFormContainer>
          <HoleFormContainer>
            <HandicapTitle>Handicap</HandicapTitle>
            <ListOfHoles 
              handleHoleResult={ handleHoleHandicap } 
              selectedCourse={ courseName } 
              newCourse={ true } 
            />
          </HoleFormContainer>
        </HolesFormContainer>
        <Button type="submit" primary onClick={ send }>Enviar</Button>
        <Notification
          onClose={ errorCode ? handleCloseAlertError : handleCloseAlertSucces }
          message={ errorCode ? errorCode.message : "Perfe!" }
          open={ openAlert }
          severity={errorCode ? errorCode.severity : "success" }
          />
        </Form>
    </Container>
  );
};
