import React, { useState } from 'react';
import styled from 'styled-components';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Button } from '../Elements/button';
import { ListOfHoles } from '../ListOfHoles';
import { createGameResult } from '../../services';

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
const SelectPlayerContainer = styled.div`
`;
const HolesFormContainer = styled.div`
`;
export const Home = () => {
  const classes = useStyles();
  const [player, setPlayer] = useState('');
  const [result, setResult] = useState([]);

  const handlePlayerChange = (event) => {
    setPlayer(event.target.value);
  };

  const  Send = async (event) => {
    event.preventDefault();
    console.log(player, result);
    try {
      await createGameResult({
        player: player,
        result
      })
    }
    catch (error){
      console.log('Error creating game');
      console.log(error);
    }
    setResult([]);
    setPlayer('');
  };

  const handleHoleResult = ( holeResult) => {    
    const newArray = result.slice();
    newArray.push(holeResult);
    setResult(newArray);
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
    </React.Fragment>
  );
}