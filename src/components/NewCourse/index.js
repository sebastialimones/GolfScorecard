import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '../Elements/button';
import { ListOfHoles } from '../ListOfHoles';
import { createPlayerHandicap } from '../../services';
import { Notification } from '../Notification';
import { useCurrentUser } from '../../hooks/userCurrentUser';

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
const HolesFormContainer = styled.div``;
const CourseHandicap = styled.h1`
  padding: 7px;
`;


export const NewCourse = ({ history }) => {
  const classes = useStyles();
  const [courseName, setCourseName] = useState('');
  const [personalHandicap, setPersonalHandicap] = useState([]);
  const [coursePar, setCoursePar] = useState([]);
  const [errorCode, setErrorCode] = useState();
  const [openAlert, setOpenAlert] = useState(false);
  const [user, isFetchingUser] = useCurrentUser();
  const currentUserId = user && user.id;

  useEffect(() => {
    !currentUserId && !isFetchingUser && history.push('/login');
  }, [isFetchingUser, history, currentUserId, user]);

  useEffect(() => {
    initialStatePersonalHandicap()
  }, []);

  const initialStatePersonalHandicap = () => {
    const initialState = [];
    for (var j = 1; j < 19; j++) {
      initialState.push({ holeNumber: j, result: 0 });
    }
    setPersonalHandicap(initialState)
  }

  const handleCourseChange = (event) => {
    setCourseName(event.currentTarget.value);
  };

  const clearInputs = () => {
    setPersonalHandicap([]);
    setCoursePar([]);
    setCourseName('');
  };

  const send = async (event) => {
    event.preventDefault();
    if(courseName && coursePar.length === 18){
      try {
        await createPlayerHandicap({
          email: user.email,
          uid: currentUserId,
          course: courseName,
          personalHandicap,
          coursePar
        })
        setOpenAlert(true);
      }
      catch (error){
        errorCode.message = error.message ? error.message: errorCode.message;
        setOpenAlert(true);
        setErrorCode(errorCode);
      }
    } else {
      dataIncomplete();
    }
  };

  const dataIncomplete = () => { 
    if(!courseName){
      const errorCode = { 
        message:  "Falta introduir un camp",
        severity: "error" 
    }
      setErrorCode(errorCode); 
    } else if(coursePar.length < 18){
      const errorCode = { 
        message:  "Falta introduir els cops d'algun forat",
        severity: "error" 
       }
      setErrorCode(errorCode);
    }
    setOpenAlert(true)
  };

  const handleCoursePar = (holeResult) => { 
    const newArray = coursePar.slice();
    const holesAlreadyIntroduced = newArray.map(a => a.holeNumber);
      if(newArray.length){
      const index = holesAlreadyIntroduced.indexOf(holeResult.holeNumber);
      index === -1
        ? newArray.push(holeResult)
        : newArray.splice(index,1,holeResult)
      }else{
        newArray.push(holeResult);
      }
    const zeroFilter = newArray.filter(a => a.result !== 0);
    zeroFilter.sort((result1, result2) => result1.holeNumber - result2.holeNumber)
    setCoursePar(zeroFilter);
  };

  const handlePersonalHandicap = (holeResult) => {    
    const newArray = personalHandicap.slice();
    const holesAlreadyIntroduced = newArray.map(a => a.holeNumber);
      if(newArray.length){
      const index = holesAlreadyIntroduced.indexOf(holeResult.holeNumber);
      index === -1
        ? newArray.push(holeResult)
        : newArray.splice(index,1,holeResult)
      }else{
        newArray.push(holeResult);
      }
    setPersonalHandicap(newArray);
  };

  const handleCloseAlertSucces = (event) => {
    setErrorCode();
    setOpenAlert(false);
    clearInputs();
  };

  const handleCloseAlertError = (event) => {
    setErrorCode();
    setOpenAlert(false);
  };

  return (
    <Container>
      <Form className={classes.root} noValidate autoComplete="off"> 
      <TextField
        id="camp"
        label="Nom del camp"
        onChange={ handleCourseChange }
        value={ courseName }
        className={classes.root}
      />      
      <CourseHandicap>Nombre de cops de cada forat del camp</CourseHandicap>
        <HolesFormContainer>
          <ListOfHoles handleHoleResult={ handleCoursePar } selectedCourse={ courseName } />
        </HolesFormContainer>
        <CourseHandicap>Introdueix els forats on tens algun cop</CourseHandicap>
        <HolesFormContainer>
          <ListOfHoles handleHoleResult={ handlePersonalHandicap } selectedCourse={ courseName }/>
        </HolesFormContainer>
        <Button type="submit" primary onClick={ send }>Send</Button>
        <Notification
          onClose={ errorCode ? handleCloseAlertError : handleCloseAlertSucces }
          message={ errorCode ? errorCode.message : "Perfe!" }
          open={ openAlert }
          severity={errorCode ? errorCode.severity : "success" }
          />
        </Form>
    </Container>
  );
}