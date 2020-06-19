import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { makeStyles } from '@material-ui/core/styles';
import { Button } from '../Elements/button';
import { ListOfHoles } from '../ListOfHoles';
import { createGameResult, fetchPlayer } from '../../services';
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

const Container = styled.div`
  margin-left: 1em;
`;
const Form = styled.form``;
const HolesFormContainer = styled.div``;

export const Home = () => {
  const classes = useStyles();
  const [player, setPlayer] = useState('');
  const [result, setResult] = useState([]);
  const [errorCode, setErrorCode] = useState();
  const [openAlert, setOpenAlert] = useState(false);
  const [playerHandicap, setplayerHandicap] = useState();

  useEffect(() => {
    const getPlayerHandicap = async () => {
      const data = await fetchPlayer(player);
      setplayerHandicap(data);
    }
    player && getPlayerHandicap() 
  },[player])

  const handlePlayerChange = (playerName) => {
    setPlayer(playerName);
  };

  const clearInputs = () => {
    setResult([]);
    setPlayer('');
  };

  const  Send = async (event) => {
    event.preventDefault();
    if (playerHandicap[0] && result[0]) {
      try {
        const gameResult = await createGameResult({
          playerHandicap,
          result
        })
        gameResult === 'success'
        ? setOpenAlert(true)
        : console.log('error')
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
    } else if(!result[0]){
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
    const holesAlreadyIntroduced = newArray.map(a => a.holeNumber);
    if(newArray.length){
    const index = holesAlreadyIntroduced.indexOf(holeResult.holeNumber);
    index === -1
      ? newArray.push(holeResult)
      : newArray.splice(index,1,holeResult)
    }else{
      newArray.push(holeResult);
    }
    setResult(newArray);
  };

  const handleCloseAlert = (event) => {
    setErrorCode();
    clearInputs()
    setOpenAlert(false);
  };

  return (
    <Container>
      <Form className={classes.root} noValidate autoComplete="off"> 
        <Players handlePlayerChange={ handlePlayerChange } value={ player }/>
        <HolesFormContainer>
          <ListOfHoles handleHoleResult={ handleHoleResult } />
        </HolesFormContainer>
      </Form>
        <Button type="submit" primary onClick={ Send }>Send</Button>
        <Notification
          onClose={ handleCloseAlert }
          message={ errorCode ? errorCode.message : "Perfe!" }
          open={ openAlert }
          severity={errorCode ? errorCode.severity : "success" }
        />
    </Container>
  );
}

