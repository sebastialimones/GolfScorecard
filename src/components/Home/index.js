import React, { useState } from 'react';
import styled from 'styled-components';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Button } from '../Elements/button';
import { ListOfHoles } from '../ListOfHoles';
import { createGameResult } from '../../services';
import { Notification } from '../Notification';

const PossiblePlayers = [
  {
    value: 'Sebastià',
    label: 'Sebastià'
  },
  {
    value: 'Añaterve',
    label: 'Añaterve'
  }
]

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const Form = styled.form``;
const SelectPlayerContainer = styled.div``;
const HolesFormContainer = styled.div``;

export const Home = () => {
  const classes = useStyles();
  const [player, setPlayer] = useState('');
  const [result, setResult] = useState([]);
  const [errorCode, setErrorCode] = useState();
  const [openAlert, setOpenAlert] = useState(false);

  const handlePlayerChange = (event) => {
    setPlayer(event.target.value);
  };

  const clearInputs = () => {
    setResult([]);
    setPlayer('');
  };

  const  Send = async (event) => {
    event.preventDefault();
    if (player && result[0]) {
      try {
        await createGameResult({
          player: player,
          result
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
        message:  "Falta introduir un jugador.",
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

  const handleHoleResult = ( holeResult) => {    
    const newArray = result.slice();
    newArray.push(holeResult);
    setResult(newArray);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrorCode();
    clearInputs()
    setOpenAlert(false);
  };

  return (
    <React.Fragment>
    <Form className={classes.root} noValidate autoComplete="off"> 
      <SelectPlayerContainer>
        <TextField
          id="select-player"
          select
          label="Players"
          value={ player }
          onChange={ handlePlayerChange }
          helperText="Select your player"
          variant="filled"
        >
          { PossiblePlayers.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          )) }
        </TextField>
      </SelectPlayerContainer>
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
    </React.Fragment>
  );
}