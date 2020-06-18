import React, { useState } from 'react';
import styled from 'styled-components';

import { makeStyles } from '@material-ui/core/styles';
import { Button } from '../Elements/button';
import { ListOfHoles } from '../ListOfHoles';
import { createPlayerHandicap } from '../../services';
import { Notification } from '../Notification';
import { Players } from '../Players';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const Form = styled.form``;
const HolesFormContainer = styled.div``;
const CourseHandicap = styled.h1``;


export const Handicap = () => {
  const classes = useStyles();
  const [player, setPlayer] = useState('');
  const [result, setResult] = useState([]);
  const [holeHandicap, setHoleHandicap] = useState([]);
  const [errorCode, setErrorCode] = useState();
  const [openAlert, setOpenAlert] = useState(false);

  const handlePlayerChange = (playerName) => {
    setPlayer(playerName);
  };

  const clearInputs = () => {
    setResult([]);
    setHoleHandicap([]);
    setPlayer('');
  };

  const  Send = async (event) => {
    event.preventDefault();
    if (player) {
      try {
        await createPlayerHandicap({
          player: player,
          result,
          holeHandicap
        })
        setOpenAlert(true)
      }
      catch (error){
        errorCode.message = error.message ? error.message: errorCode.message;
        setOpenAlert(true)
        setErrorCode(errorCode);
      }
    } else {
      dataIncomplete();
    }
  };

  const dataIncomplete = () => { 
    if(!player){
      const errorCode = { 
        message:  "Falta introduir un jugador",
        severity: "error" 
    }
      setErrorCode(errorCode); 
    } else if(result){
      const errorCode = { 
        message:  "Falta introduir algun resultat",
        severity: "error" 
       }
      setErrorCode(errorCode);
    }
    setOpenAlert(true)
  };

  const handleHoleResult = (holeResult) => {    
    const newArray = result.slice();
    newArray.push(holeResult);
    setResult(newArray);
  };

  const handleHoleHandicap = (holeResult) => {    
    const newArray = holeHandicap.slice();
    newArray.push(holeResult);
    setHoleHandicap(newArray);
  };

  const handleCloseAlert = (event) => {
    setErrorCode();
    clearInputs()
    setOpenAlert(false);
  };

  return (
    <React.Fragment>
      <Form className={classes.root} noValidate autoComplete="off"> 
        <Players handlePlayerChange={ handlePlayerChange } value={ player }/>
        <HolesFormContainer>
          <ListOfHoles handleHoleResult={ handleHoleResult }/>
        </HolesFormContainer>
      </Form>
      <CourseHandicap>Course Handicap</CourseHandicap>
      <Form className={classes.root} noValidate autoComplete="off"> 
        <HolesFormContainer>
          <ListOfHoles handleHoleResult={ handleHoleHandicap }/>
        </HolesFormContainer>
      </Form>
        <Button type="submit" primary onClick={ Send }>Send</Button>
        <Notification
          onClose={ handleCloseAlert }
          message={ errorCode ? errorCode.message : "Perfe!" }
          open={ openAlert }
          severity={errorCode ? errorCode.severity : "success" }
        />
    </React.Fragment>
  );
}